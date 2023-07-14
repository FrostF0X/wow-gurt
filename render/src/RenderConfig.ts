export default class RenderConfig {
    static for2048() {
        return new RenderConfig(2048, 58, 2048 + 200, 50);
    }

    constructor(public readonly size: number,
                public readonly offset: number,
                public readonly browserSize: number,
                public readonly fps: number) {
    }
}
