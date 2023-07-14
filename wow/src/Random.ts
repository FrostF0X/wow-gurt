import seedrandom from "seedrandom";
import {GlitchImagePreset} from "./GlitchImage";

export default class Random {
    private readonly rng: () => number;
    private readonly image: Img;

    constructor(seed: string | number) {
        this.rng = seedrandom(seed.toString());
        this.image = new Img(this);
    }

    public static fresh(seed: number): Random {
        return new Random(seed);
    }

    public img() {
        return this.image;
    }

    public number(bottom: number, top: number): number {
        const normalizedValue = this.rng();
        return Math.round(bottom + normalizedValue * (top - bottom));
    }

    public bool(): boolean {
        return !!this.number(0, 1);
    }

    public randomItems<T>(array: T[], count: number): T[] {
        const shuffled = [...array].sort(() => 0.5 - this.number(0, 1));

        return shuffled.slice(0, count);
    }

    public randomItem<T>(array: T[]): T {
        return this.randomItems(array, 1)[0];
    }
}

class Img {
    constructor(private readonly random: Random) {
    }

    static all() {
        return Array.range(1, 6).map(i => Img.img(i));
    }

    static img(x: number) {
        return `/img-${x}.png`
    }

    rand(): string {
        return this.random.randomItem(Img.all());
    }

    randx(x: number) {
        return this.random.randomItems(Img.all(), x);
    }

    randp() {
        return GlitchImagePreset.presets[this.random.number(0, GlitchImagePreset.presets.length - 1)];
    }
}
