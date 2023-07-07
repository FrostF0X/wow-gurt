import * as express from 'express';
import puppeteer, {Page} from 'puppeteer';
import {PuppeteerScreenRecorder} from 'puppeteer-screen-recorder';
import * as tmp from 'tmp-promise';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as ipfsClient from 'ipfs-http-client';
import * as cors from 'cors';

function throwExpression(errorMessage: string): never {
    throw new Error(errorMessage);
}

const INFURA_IPFS_API_KEY = process.env.INFURA_IPFS_API_KEY ?? throwExpression('Please define INFURA_IPFS_API_KEY');
const INFURA_IPFS_API_SECRET = process.env.INFURA_IPFS_API_SECRET ?? throwExpression('Please define INFURA_IPFS_API_SECRET');
const IPFS_PUBLIC_URL: string = process.env.INFURA_IPFS_PUBLIC_URL ?? throwExpression("Please define INFURA_IPFS_PUBLIC_URL");
const BASE_URL: string = process.env.URL ?? throwExpression("Please define URL");
const PORT = process.env.PORT ?? throwExpression("Please define PORT");
const app: express.Express = express();
const WIDTH: number = 1024;
const HEIGHT: number = 1024;
const FPS = 25;

const ipfs = ipfsClient.create({
    host: 'ipfs.infura.io', port: 5001, protocol: 'https',
    headers: {
        authorization: 'Basic ' + Buffer.from(INFURA_IPFS_API_KEY + ':' + INFURA_IPFS_API_SECRET).toString('base64')
    }
});

app.use(express.json()); // for parsing application/json
app.use(cors({
    origin: (origin, callback) => callback(null,true)
}));

const Config = {
    followNewTab: true,
    fps: FPS,
    ffmpeg_Path: '/usr/local/bin/ffmpeg' || null,
    videoFrame: {
        width: WIDTH,
        height: HEIGHT,
    },
    videoCrf: 0,
    videoCodec: 'libx264',
    videoPreset: 'ultrafast',
    videoBitsPerSecond: 256000,
    quality: 100
};
let page: Page;

app.post('/', async (req, res) => {
    try {
        const seed = req.body.seed;
        const URL = `${BASE_URL}?seed=${seed}`;

        const screenRecorder = new PuppeteerScreenRecorder(page, Config);
        await page.goto(URL);
        await page.waitForSelector('.just');

        const tmpVideoFile = await tmp.file({postfix: '.mp4'});

        await screenRecorder.start(tmpVideoFile.path);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        await screenRecorder.stop();

        const tmpGifFile = await tmp.file({postfix: '.gif'});

        ffmpeg(tmpVideoFile.path)
            .output(tmpGifFile.path)
            .on('end', async () => {
                const gifBuffer = fs.readFileSync(tmpGifFile.path);
                const gifResult = await ipfs.add(gifBuffer);
                const gifUrl = `${IPFS_PUBLIC_URL}/${gifResult.path}`;
                const gifMetadata = {
                    "name": `Wow ${seed}`,
                    "description": `Wow ${seed}`,
                    "image": gifUrl,
                    "seed": seed,
                };
                const metadataResult = await ipfs.add(Buffer.from(JSON.stringify(gifMetadata)));
                const metadataUrl = `${IPFS_PUBLIC_URL}/${metadataResult.path}`
                res.json({url: metadataUrl});

                tmpVideoFile.cleanup();
                tmpGifFile.cleanup();
            })
            .run();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while recording the video: ' + error);
    }
});

new Promise(async (resolve) => {
    console.log("Staring browser");
    const browser = await puppeteer.launch({
        "headless": true, args: [`--window-size=${WIDTH},${HEIGHT}`], defaultViewport: {
            width: WIDTH,
            height: HEIGHT
        }
    });
    page = await browser.newPage();
    await page.setViewport({width: WIDTH, height: HEIGHT});
    resolve(true);
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
})
