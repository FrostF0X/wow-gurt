import {Page} from 'puppeteer';

class PuppeteerMassScreenshots {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async start(options: StartScreencastOptions = {}): Promise<string[]> {
        const startOptions: StartScreencastOptionsWithDefaults = {
            format: 'png',
            quality: 10,
            everyNthFrame: 1,
            duration: 10,
            ...options,
        };

        if (startOptions.format !== 'jpeg' && startOptions.format !== 'png') {
            throw new Error(`Invalid format: ${startOptions.format}`);
        }
        const client = await this.page.target().createCDPSession();
        const screenshots: string[] = [];
        client.on("Page.screencastFrame", async (frameObject: { sessionId: number; data: string; }) => {
            console.log("Captured new screenshot");
            const screenshotData = frameObject.data;
            screenshots.push(screenshotData);

            try {
                await client?.send("Page.screencastFrameAck", {
                    sessionId: frameObject.sessionId,
                });
            } catch (e) {
                throw new Error("Cannot capture screenshots");
            }
        });

        try {
            await client?.send("Page.startScreencast", startOptions);
        } catch (err) {
            console.log(err);
        }

        return new Promise<string[]>(resolve => {
            setTimeout(async () => {
                try {
                    await client?.send("Page.stopScreencast");
                } catch (err) {
                    console.log(err);
                }
                resolve(screenshots);
            }, startOptions.duration * 1000);
        });
    }
}

interface StartScreencastOptions {
    format?: 'jpeg' | 'png';
    quality?: number;
    everyNthFrame?: number;
    duration?: number;
}

interface StartScreencastOptionsWithDefaults {
    format: 'jpeg' | 'png';
    quality: number;
    everyNthFrame: number;
    duration: number;
}

export default PuppeteerMassScreenshots;

