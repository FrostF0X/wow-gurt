import * as express from 'express';
import {launch, getStream} from "puppeteer-stream";

import * as tmp from 'tmp-promise';
import * as ffmpeg from 'fluent-ffmpeg';
import * as cors from 'cors';
import chromeSettings from "./ChromeSettings";
import {Page} from "puppeteer-core";
import * as fs from "fs";

function throwExpression(errorMessage: string): never {
    throw new Error(errorMessage);
}

const BASE_URL: string = process.env.URL ?? throwExpression("Please define URL");
const PORT = process.env.PORT ?? throwExpression("Please define PORT");
const app: express.Express = express();
const SIZE: number = 2048;
const FPS = 10;

app.use(express.json()); // for parsing application/json
app.use(cors({
    origin: '*'
}));

let page: Page;

app.get('/', async (req, res) => {
    try {
        const URL = `${BASE_URL}?size=${SIZE}`;

        await page.goto(URL);
        await page.waitForSelector('.just');

        const tmpVideoFile = await tmp.file({postfix: '.webm'});
        const cutTmpVideoFile = await tmp.file({postfix: '.webm'});


        const stream = await getStream(page, {video: true, audio: false, videoBitsPerSecond: 200000000});
        stream.pipe(fs.createWriteStream(tmpVideoFile.path));
        await new Promise((resolve) => setTimeout(resolve, 21000));
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
        console.log("Video: " + tmpVideoFile.path);
        const tmpGifFile = await tmp.file({postfix: '.gif'});
        ffmpeg(cutTmpVideoFile.path)
            .outputOptions(['-vf', `setpts=0.1*PTS,fps=${FPS * 5},scale=1024:1024:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`])
            .output(tmpGifFile.path)
            .on('end', async () => {
                    res.sendFile(tmpGifFile.path, function (err) {
                        if (err) {
                            console.error(err);
                            res.status(500).end();
                        } else {
                            console.log("Gif: " + tmpGifFile.path);
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
    const browser = await launch({
        "executablePath": 'chromium',
        args: [
            `--ozone-platform=wayland`,
            `--content-shell-host-window-size=${SIZE},${SIZE}`,
            `--app-shell-host-window-size=${SIZE},${SIZE}`,
            `--window-size=${SIZE},${SIZE}`,
            `--ozone-override-screen-size=${SIZE},${SIZE}`,
            ...chromeSettings],
    });
    page = await browser.newPage();
    await page.setViewport({width: SIZE, height: SIZE, deviceScaleFactor: 1});
    resolve(true);
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
})
