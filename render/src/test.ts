import * as express from 'express';
import puppeteer, {Page} from 'puppeteer';
import {PuppeteerScreenRecorder} from 'puppeteer-screen-recorder';
import * as tmp from 'tmp-promise';
import * as ffmpeg from 'fluent-ffmpeg';
import * as cors from 'cors';
import chromeSettings from "./ChromeSettings";

function throwExpression(errorMessage: string): never {
    throw new Error(errorMessage);
}

const BASE_URL: string = process.env.URL ?? throwExpression("Please define URL");
const PORT = process.env.PORT ?? throwExpression("Please define PORT");
const app: express.Express = express();
const WIDTH: number = 1024;
const HEIGHT: number = 1024;

app.use(express.json()); // for parsing application/json
app.use(cors({
    origin: '*'
}));

const FPS = 25;

const Config = {
    followNewTab: false,
    fps: FPS,
    ffmpeg_Path: '/usr/local/bin/ffmpeg' || null,
    videoFrame: {
        width: WIDTH,
        height: HEIGHT,
    },
    videoCrf: 0,
    videoPreset: 'ultrafast',
    videoBitsPerSecond: 256000,
    quality: 100
};
let page: Page;

app.get('/', async (req, res) => {
    try {
        const URL = `${BASE_URL}`;

        const screenRecorder = new PuppeteerScreenRecorder(page, Config);
        await page.goto(URL);
        await page.waitForSelector('.just');

        const tmpVideoFile = await tmp.file({postfix: '.mp4'});

        await screenRecorder.start(tmpVideoFile.path);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        console.log("Stopping recording");
        await screenRecorder.stop();
        console.log("Stopped");

        const tmpGifFile = await tmp.file({postfix: '.gif'});

        console.log("Video: " + tmpVideoFile.path);
        ffmpeg(tmpVideoFile.path)
            .outputOptions(['-vf', `fps=${FPS},scale=1024:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`])
            .output(tmpGifFile.path)
            .on('end', async () => {
                    res.sendFile(tmpGifFile.path, function (err) {
                        if (err) {
                            console.error(err);
                            res.status(500).end();
                        } else {
                            console.log("Gif: " + tmpGifFile.path);
                            // tmpVideoFile.cleanup();
                            // tmpGifFile.cleanup();
                        }
                    })
                }
            ).run();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while recording the video: ' + error);
    }
});

new Promise(async (resolve) => {
    console.log("Staring browser");
    const browser = await puppeteer.launch({
        "headless": true, args: [`--window-size=${WIDTH},${HEIGHT}`, ...chromeSettings], defaultViewport: {
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
