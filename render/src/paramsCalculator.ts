export function calculateParams(duration: number, fps: number): GifParameters {
    const width = 800; // adjust these values as per your needs
    const height = 600; // adjust these values as per your needs
    const delay = 1000 / fps;

    return {width, height, delay};
}

interface GifParameters {
    width: number;
    height: number;
    delay: number; // frame delay in ms
}
