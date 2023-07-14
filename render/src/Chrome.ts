import {launch} from "puppeteer-stream";
import chromeSettings from "./ChromeSettings";
import {Browser} from "puppeteer-core";
import {clog} from "./utils";

export default class Chrome {
    public static async init(size: number) {
        return new Chrome(await launch({
            "executablePath": 'chromium-browser',
            args: [
                `--content-shell-host-window-size=${size},${size}`,
                `--app-shell-host-window-size=${size},${size}`,
                `--window-size=${size},${size}`,
                `--ozone-override-screen-size=${size},${size}`,
                ...chromeSettings],
        }), size);
    }

    private constructor(private readonly browser: Browser, private readonly size: number) {
    }

    public async stop() {
        if (!this.browser) {
            throw new Error("Browser is not started");
        }
        clog(`Closing browser`);
        await this.browser.close();
    }

    public async newPage() {
        if (!this.browser) {
            throw new Error("Browser is not started");
        }
        const page = await this.browser.newPage();
        await page.setViewport({width: this.size, height: this.size, deviceScaleFactor: 1});
        const session = await page.target().createCDPSession();
        const {windowId} = await session.send('Browser.getWindowForTarget');
        await session.send('Browser.setWindowBounds', {windowId, bounds: {width: this.size, height: this.size}});
        await session.detach();
        return page;
    }

}
