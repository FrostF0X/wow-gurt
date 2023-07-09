import seedrandom from "seedrandom";

export default class Random {
    private static instance: Random;
    private rng: () => number;

    public static init(seed: number): void {
        console.log(seed);
        Random.instance = new Random(seed);
    }

    public static get(): Random {
        return this.instance;
    }

    constructor(seed: string | number) {
        this.rng = seedrandom(seed.toString());
    }

    public number(bottom: number, top: number): number {
        const normalizedValue = this.rng();
        return Math.round(bottom + normalizedValue * (top - bottom));
    }

    public bool(): boolean {
        return !!this.number(0, 1);
    }

    public image() {
        return `/0${this.number(4, 9)}-trans.png`;
    }

    public randomItems<T>(array: T[], count: number): T[] {
        const shuffled = [...array].sort(() => 0.5 - this.number(0, 1));

        return shuffled.slice(0, count);
    }

    public randomItem<T>(array: T[]): T {
        return this.randomItems(array, 1)[0];
    }
}

