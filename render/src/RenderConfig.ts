export default class RenderConfig {
    static for2048() {
        return new RenderConfig(2048, 58, 2048 + 200, 50);
    }

    static for1024() {
        return new RenderConfig(1024, 58, 1024 + 200, 50);
    }

    static for768() {
        return new RenderConfig(768, 58, 768 + 150, 50);
    }

    static for512() {
        return new RenderConfig(512, 58, 512 + 200, 50);
    }

    static apeLuckyCoin() {
        return new RenderConfig(1024, 57, 1024 + 200, 15);
    }

    constructor(public readonly size: number,
                public readonly offset: number,
                public readonly browserSize: number,
                public readonly fps: number) {
    }
}
