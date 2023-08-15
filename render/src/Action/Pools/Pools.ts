import * as seedrandom from "seedrandom";

export class Pool {
    constructor(public type: PoolType, public colors: number, public x: number, public y: number) {
    }
}

export class Duck {
    constructor(public number: number, public x: number, public y: number) {
    }
}

enum PoolType {
    HEART = 'heart',
    ROUND = 'round',
    SQUARE = 'square',
}

const PoolTypeColors = {
    'heart': 10,
    'round': 10,
    'square': 11,
};

export class Pools {

    public static generate(seed: number) {
        const rng = Random.fresh(seed);
        const ducks = [
            {x: 140, y: 975},
            {x: 2100, y: 1470},
            {x: 2985, y: 1950},
            {x: 390, y: 2899},
            {x: 570, y: 3700},
            {x: 3026, y: 3671},
            {x: 5261, y: 4124},
            {x: 4496, y: 5250},
            {x: 2323, y: 5367},
        ].map(i => new Duck(rng.number(1, 5), i.x, i.y));
        const pools = [
            {x: 100, y: 1500},
            {x: 2192, y: 636},
            {x: 4163, y: 1501},
            {x: 1452, y: 2489},
            {x: 4033, y: 2983},
            {x: 592, y: 4094},
            {x: 2804, y: 4219},
        ].map(i => {
                const pool = rng.randomItem([PoolType.HEART, PoolType.ROUND, PoolType.SQUARE]);

                return new Pool(pool, rng.number(1, PoolTypeColors[pool]), i.x, i.y);
            }
        )
        return new Pools(pools, ducks);
    }

    constructor(public readonly pools: Pool[], public readonly ducks: Duck[]) {
    }
}

export class Random {
    private readonly rng: () => number;

    constructor(seed: string | number) {
        this.rng = seedrandom(seed.toString());
    }

    public static fresh(seed: number | string): Random {
        return new Random(seed);
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

