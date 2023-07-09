// noinspection ES6MissingAwait

import * as express from 'express';
import {launch, getStream} from "puppeteer-stream";
import * as tmp from 'tmp-promise';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ipfsClient from 'ipfs-http-client';
import * as cors from 'cors';
import chromeSettings from "./ChromeSettings";
import {Page, Browser} from "puppeteer-core";
import * as fs from "fs";

function throwExpression(errorMessage: string): never {
    throw new Error(errorMessage);
}

const INFURA_IPFS_API_KEY = process.env.INFURA_IPFS_API_KEY ?? throwExpression('Please define INFURA_IPFS_API_KEY');
const INFURA_IPFS_API_SECRET = process.env.INFURA_IPFS_API_SECRET ?? throwExpression('Please define INFURA_IPFS_API_SECRET');
const IPFS_PUBLIC_URL: string = process.env.INFURA_IPFS_PUBLIC_URL ?? throwExpression("Please define INFURA_IPFS_PUBLIC_URL");
const BASE_URL: string = process.env.URL ?? throwExpression("Please define URL");
const PORT = process.env.PORT ?? throwExpression("Please define PORT");
const app: express.Express = express();
const SIZE: number = 2048;
const FPS = 10;
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

let page: Page;
let browser: Browser;
app.post('/', async (req, res) => {
    try {
        const seed = req.body.seed;
        const URL = `${BASE_URL}?size=${SIZE}&seed=${seed}`;


        const tmpVideoFile = await tmp.file({postfix: '.webm'});
        const cutTmpVideoFile = await tmp.file({postfix: '.webm'});
        console.log("Video: " + tmpVideoFile.path);
        const stream = await getStream(page, {video: true, audio: false, videoBitsPerSecond: 200000000});
        stream.pipe(fs.createWriteStream(tmpVideoFile.path));
        page.goto(URL);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        console.log("Stopping recording");
        await stream.destroy();
        console.log("Stopped");

        await new Promise(resolve =>
            ffmpeg(tmpVideoFile.path)
                .outputOptions(['-t', '20'])
                .output(cutTmpVideoFile.path)
                .on('end', resolve)
                .run()
        );
        const tmpGifFile = await tmp.file({postfix: '.gif'});
        ffmpeg(cutTmpVideoFile.path)
            .outputOptions(['-vf', `setpts=0.1*PTS,fps=${FPS * 5},scale=1024:1024:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`])
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

async function startBrowser() {
    console.log("Staring browser");
    browser = await launch({
        "executablePath": 'chromium-browser',
        args: [
            `--headless=new`,
            `--ozone-platform=wayland`,
            `--content-shell-host-window-size=${SIZE},${SIZE}`,
            `--app-shell-host-window-size=${SIZE},${SIZE}`,
            `--window-size=${SIZE},${SIZE}`,
            `--ozone-override-screen-size=${SIZE},${SIZE}`,
            ...chromeSettings],
    });
}

async function startPage() {
    page = await browser.newPage();
    await page.setViewport({width: SIZE, height: SIZE, deviceScaleFactor: 1});
}

new Promise(async (resolve) => {
    await startBrowser();
    await startPage();
    page.on('close', startPage);
    resolve(true);
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
})
