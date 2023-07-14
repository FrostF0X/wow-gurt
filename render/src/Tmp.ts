import {file, FileResult} from "tmp-promise";

export default class Tmp {
    static async init() {
        const video = await file({postfix: '.webm'});
        const cutVideo = await file({postfix: '.webm'});
        const gif = await file({postfix: '.gif'});
        return new Tmp(video, cutVideo, gif);
    }

    constructor(public readonly video: FileResult, public readonly cutVideo: FileResult, public readonly gif: FileResult) {
    }

    public async clear() {
        await this.video.cleanup();
        await this.cutVideo.cleanup();
        await this.gif.cleanup();
    }
}
