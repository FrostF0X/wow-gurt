import Chrome from "./Chrome";
import {getStream} from "puppeteer-stream";
import * as fs from "fs";
import * as ffmpeg from "fluent-ffmpeg";
import TimeConfig from "./TimeConfig";
import RenderConfig from "./RenderConfig";
import Tmp from "./Tmp";
import {clog} from "./utils";

export default class Render {

    constructor(private readonly baseUrl: string) {
    }

    async do(seed: number, time: TimeConfig, render: RenderConfig, tmp: Tmp) {
        let chrome = null;
        try {
            clog(`Processing request for seed: ${seed}`);
            clog(`Time config: ${JSON.stringify(time)}`);
            clog(`Rendering config: ${JSON.stringify(render)}`);
            clog(`Starting browser`);
            chrome = await Chrome.init(render.browserSize);
            clog(`Creating page`);
            const page = await chrome.newPage();
            const URL = `${this.baseUrl}?size=${render.size}&slow=${time.slow}&seed=${seed}`;
            clog(`Go to url: ${URL}`);
            await page.goto(URL);
            await page.waitForSelector('.just');
            clog(`Waiting for animation to load`);
            await new Promise((resolve) => setTimeout(resolve, time.wait));
            const stream = await getStream(page, {
                video: true, audio: false, videoBitsPerSecond: 2000000000
            });
            stream.pipe(fs.createWriteStream(tmp.video.path));
            clog(`Recording animation`);
            await new Promise((resolve) => setTimeout(resolve, time.record));
            await stream.destroy();

            clog(`Cutting video`);
            await new Promise((resolve, reject) =>
                ffmpeg(tmp.video.path)
                    .outputOptions(['-t', `${time.cut}`, '-filter:v', `crop=${render.size}:${render.size}:0:${render.offset}`])
                    .output(tmp.cutVideo.path)
                    .on('end', resolve)
                    .on('error', reject)
                    .run()
            );
            clog(`Creating gif`);
            await new Promise((resolve, reject) =>
                ffmpeg(tmp.cutVideo.path)
                    .outputOptions(['-vf', `setpts=${TimeConfig.GIF_DURATION / time.cut}*PTS,fps=${render.fps},split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`])
                    .output(tmp.gif.path)
                    .on('end', resolve)
                    .on('error', reject)
                    .run()
            );
            clog(`Done.`);
        } catch (e) {
            throw e;
        } finally {
            chrome?.stop();
        }
    }
}
