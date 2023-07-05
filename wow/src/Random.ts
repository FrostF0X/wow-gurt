export default class Random {
    private seed: number;
    private constantA: number = 1664525;
    private constantC: number = 1013904223;
    private constantM: number = Math.pow(2, 32);
    private static instance: Random;

    public static init(seed: number): void {
        Random.instance = new Random(seed);
    }

    public static get(): Random {
        return this.instance;
    }

    constructor(seed: number) {
        this.seed = seed;
    }

    public number(bottom: number, top: number): number {
        this.seed = (this.constantA * this.seed + this.constantC) % this.constantM;
        const normalizedValue = this.seed / this.constantM; // Between 0 and 1

        // Scale and translate to the [bottom, top] range
        return bottom + normalizedValue * (top - bottom);
    }

    public bool(): boolean {
        return !!Number.random(0, 1);
    }

    public image() {
        return `/0${this.number(4, 9)}-trans.png`;
    }

    public randomItems<T>(array: T[], count: number): T[] {
        const shuffled = [...array].sort(() => 0.5 - this.number(0, 1));

        return shuffled.slice(0, count);
    }
}

