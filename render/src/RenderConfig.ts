export default class RenderConfig {
    static for2048() {
        return new RenderConfig(2048, 58, 2048 + 200, 50);
    }
    static for1024() {
        return new RenderConfig(1024, 58, 1024 + 200, 50);
    }
    static for512() {
        return new RenderConfig(512, 58, 512 + 200, 50);
    }

    constructor(public readonly size: number,
                public readonly offset: number,
                public readonly browserSize: number,
                public readonly fps: number) {
    }
}
