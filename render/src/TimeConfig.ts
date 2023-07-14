export default class TimeConfig {
    static for2048() {
        return new TimeConfig(20, 20000, 40000 + 2000, 40);
    }

    static GIF_DURATION = 2;

    constructor(public readonly slow: number,
                public readonly wait: number,
                public readonly record: number,
                public readonly cut: number) {
    }
}
