import Chrome from "./Chrome";
import {getStream} from "puppeteer-stream";
import * as ffmpeg from "fluent-ffmpeg";
import TimeConfig from "./TimeConfig";
import RenderConfig from "./RenderConfig";
import Tmp from "./Tmp";
import {clog, throwExpression} from "./utils";

export default class Render {

    constructor(private readonly baseUrl: string) {
    }

    async do(config: string, cools: string | null, overlay: number, time: TimeConfig, render: RenderConfig, tmp: Tmp) {
        let chrome = null;
        try {
            clog(`Processing request for config: ${config}`);
            clog(`Time config: ${JSON.stringify(time)}`);
            clog(`Rendering config: ${JSON.stringify(render)}`);
            clog(`Starting browser`);
            chrome = await Chrome.init(render.browserSize);
            clog(`Creating page`);
            const page = await chrome.newPage();
            const URL = `${this.baseUrl}/render?size=${render.size}&slow=${time.slow}&config=${config}&cools=${cools}&overlay=${overlay}`;
            clog(`Go to url: ${URL}`);
            await page.goto(URL, {timeout: 120000});
            await page.waitForSelector('.wow', {timeout: 120000});
            clog(`Waiting for animation to load`);
            await new Promise((resolve) => setTimeout(resolve, time.wait));
            const stream = await getStream(page, {
                video: true, audio: false, videoBitsPerSecond: 10000000
            });
            clog(`Recording animation`);
            const [_1, _2, metadata] = await Promise.all([
                new Promise((resolve, reject) =>
                    ffmpeg(stream as any)
                        .outputOptions(['-t', `${time.cut}`, '-filter:v', `crop=${render.size}:${render.size}:0:${render.offset}`])
                        .output(tmp.cutVideo.path)
                        .on('end', resolve)
                        .on('error', reject)
                        .run()
                ),
                new Promise((resolve) => setTimeout(resolve, time.record)),
                (await page.$eval('#just-attributes', (element: Element) => element.attributes.getNamedItem('data-json')?.value)) ?? throwExpression('Cannot evaluate function'),
            ]);
            await chrome?.stop();

            clog(`Creating gif`);
            await new Promise((resolve, reject) =>
                ffmpeg(tmp.cutVideo.path)
                    .outputOptions(['-vf', `setpts=${time.speedUp}*PTS,fps=${render.fps}`])
                    .output(tmp.gif.path)
                    .on('end', resolve)
                    .on('error', reject)
                    .run()
            );
            clog(`Done.`);
            return JSON.parse(metadata);
        } catch (e) {
            chrome?.stop();
            throw e;
        }
    }
}
