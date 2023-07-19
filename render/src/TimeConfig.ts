export default class TimeConfig {
    static animationDuration: number = 2;

    static for1024() {
        return this.create(10, 4000);
    }

    static for768() {
        return this.create(5, 2000);
    }

    static for512() {
        return this.create(5, 2000);
    }

    private static create(targetTime: number, wait1: number) {
        return new TimeConfig(targetTime / TimeConfig.animationDuration, wait1, targetTime * 1000, targetTime, TimeConfig.animationDuration / targetTime);
    }

    static GIF_DURATION = 2;

    constructor(public readonly slow: number,
                public readonly wait: number,
                public readonly record: number,
                public readonly cut: number,
                public readonly speedUp: number) {
    }

}
