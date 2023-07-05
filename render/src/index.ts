import * as express from 'express';
import puppeteer, {Page} from 'puppeteer';
import {PuppeteerScreenRecorder} from 'puppeteer-screen-recorder';
import * as tmp from 'tmp-promise';
import * as ffmpeg from 'fluent-ffmpeg';

const app: express.Express = express();
const URL: string = process.env.URL || 'http://localhost:3000';

const WIDTH: number = 1200;
// noinspection JSSuspiciousNameCombination
const HEIGHT: number = WIDTH;


const Config = {
    followNewTab: true,
    fps: 25,
    ffmpeg_Path: '/usr/local/bin/ffmpeg' || null,
    videoFrame: {
        width: WIDTH,
        height: HEIGHT,
    },
    videoCrf: 18,
    videoCodec: 'libx264',
    videoPreset: 'ultrafast',
    videoBitrate: 1000,
    autopad: {
        color: '#35A5FF',
    },
    aspectRatio: '1:1',
};
let page: Page;

app.get('/', async (req, res) => {
    try {
        const screenRecorder = new PuppeteerScreenRecorder(page, Config);
        console.log("Navigating to url")
        await page.goto(URL);
        await page.waitForSelector('.just');

        const tmpVideoFile = await tmp.file({postfix: '.mp4'});

        console.log("Start stream");
        await screenRecorder.start(tmpVideoFile.path);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        await screenRecorder.stop();

        console.log("Returning response");
        const tmpGifFile = await tmp.file({postfix: '.gif'});

        ffmpeg(tmpVideoFile.path)
            .output(tmpGifFile.path)
            .on('end', () => {
                // Send the GIF file back to the client
                res.sendFile(tmpGifFile.path, function (err) {
                    if (err) {
                        console.error(err);
                        res.status(500).end();
                    } else {
                        console.log('Sent:', tmpGifFile.path);
                        // Clean up the temporary files
                        tmpVideoFile.cleanup();
                        tmpGifFile.cleanup();
                    }
                });
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
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
})
