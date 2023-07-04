import * as express from 'express';
import puppeteer from 'puppeteer';
import * as GIFEncoder from 'gifencoder';
import {createCanvas, Image, loadImage} from 'canvas';

const app: express.Express = express();
const URL: string = process.env.URL || 'http://localhost:3000';

const WIDTH: number = 500;
const HEIGHT: number = 500;

interface GifParameters {
    frameDelay: number;
    totalFrames: number;
}

function calculateGifParameters(durationMs: number, fps: number): GifParameters {
    const frameDelay: number = 1000 / fps;
    const totalFrames: number = Math.floor(durationMs / frameDelay);
    return {frameDelay, totalFrames};
}

app.get('/generate_gif', async (req: express.Request, res: express.Response) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({width: WIDTH, height: HEIGHT});
    await page.goto(URL);

    const gifParameters: GifParameters = calculateGifParameters(5000, 25);

    // Image processing and canvas drawing phase
    const images: Image[] = [];
    for (let i = 0; i < gifParameters.totalFrames; i++) {
        await page.waitForTimeout(gifParameters.frameDelay);
        const screenshot = await page.screenshot();
        const image = await loadImage(screenshot);
        images.push(image);
        console.log(`frame ${i} of ${gifParameters.totalFrames}`);
    }
    console.log("Frame generation is finished");
    await browser.close();

    // GIF generation phase
    const encoder: GIFEncoder = new GIFEncoder(WIDTH, HEIGHT);
    res.setHeader('Content-Type', 'image/gif');
    const stream = encoder.createReadStream();
    stream.pipe(res);

    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(gifParameters.frameDelay);
    encoder.setQuality(100);

    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext('2d');

    for (const image of images) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);  // Clear the canvas before drawing the next frame
        ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
        encoder.addFrame(ctx as any);
    }
    encoder.finish();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
