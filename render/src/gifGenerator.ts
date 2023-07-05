import {createCanvas} from 'canvas';
import * as GIFEncoder from 'gifencoder';
import {PNG} from 'pngjs';

export const createGif = async (buffers: Buffer[], {width, height, delay}: GifParameters) => {
    const encoder = new GIFEncoder(width, height);

    encoder.start();
    encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
    encoder.setDelay(delay);  // frame delay in ms
    encoder.setQuality(10); // image quality. 20 is default.

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    for (const buffer of buffers) {
        const png = PNG.sync.read(buffer);
        const {data} = png;

        // Create a new image data object
        const imageData = ctx.createImageData(width, height);

        // Copy the png data to the image data
        for (let i = 0; i < data.length; i += 4) {
            imageData.data[i] = data[i];     // red
            imageData.data[i + 1] = data[i + 1]; // green
            imageData.data[i + 2] = data[i + 2]; // blue
            imageData.data[i + 3] = data[i + 3]; // alpha
        }

        // Draw the image data onto the canvas
        ctx.putImageData(imageData, 0, 0);

        encoder.addFrame(ctx as any);
    }

    encoder.finish();

    return encoder.out.getData();
};

interface GifParameters {
    width: number;
    height: number;
    delay: number; // frame delay in ms
}
