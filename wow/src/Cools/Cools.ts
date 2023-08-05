import Random from "../Random";
import {WowBordersPreset} from "../WowBorders";

export class Cools {


    public static cools(theme: string, seed: string, triesCount: number, level: number) {
        let res = null;
        Cools.glitch(seed, triesCount, level)
        console.log(res);
        return res;
    }


    public static glitch(seed: string, triesCount: number, level: number): Cools {
        const random: Random = Random.fresh(seed + triesCount);
        let traitLevel = [[0, 0, 0], [1, 0, 0], [1, 0, 1], [1, 1, 1], [2, 1, 1], [2, 1, 2], [2, 1, 3], [2, 1, 4]][level];
        return new Cools(
            BordersConfig.level(traitLevel[0], Random.fresh(seed + triesCount)),
            MatrixConfig.level(traitLevel[1], Random.fresh(seed + triesCount)),
            OverConfig.level(traitLevel[2], Random.fresh(seed + triesCount)),
            ImageStyle.none()
        );
    }

    static none() {
        return new Cools(BordersConfig.none(), MatrixConfig.none(), OverConfig.none(), ImageStyle.none())
    }

    constructor(public borders: BordersConfig, public matrix: MatrixConfig | null, public over: OverConfig | null, public style: ImageStyle = ImageStyle.none()) {
    }
}

export class ImageStyle {
    constructor(public style: { [id: string]: string; }) {
    }


    static none() {
        return new ImageStyle({});
    }

    static glitch(level: number) {
        if (level === 1) {
            return new ImageStyle({});
        }
        return ImageStyle.none();
    }
}

export class OverConfig {
    constructor(public img: string, public preset: number, public overPreset: number, public maxOver: boolean) {
    }

    static level(level: number, random: Random) {
        if (level === 0) {
            return OverConfig.none();
        }
        return new OverConfig(
            random.img().rand(),
            random.img().randp(),
            random.number(1, 5),
            level > 1
        );
    }

    static none() {
        return null;
    }
}

export class BordersConfig {
    constructor(public img: string, public preset: WowBordersPreset) {
    }

    static level(level: number, random: Random) {
        return new BordersConfig(random.img().rand(), random.randomItem(WowBordersPreset.level(level)));
    }

    static none() {
        return new BordersConfig('', WowBordersPreset.none());
    }

}

export class MatrixConfig {
    constructor(public img: string) {
    }

    static level(level: number, r: Random) {
        if (level > 0) {
            return MatrixConfig.img(r);
        }
        return MatrixConfig.none();
    }

    static img(r: Random) {
        return new MatrixConfig(r.img().rand());
    }

    static none() {
        return null;
    }
}

function split(level: number, maxConfig: number[], random: Random): number[] {
    const result = maxConfig.map(_ => 0);
    level = Math.min(level, maxConfig.reduce((i1, i2) => i1 + i2));
    Array.range(1, level).forEach((i) => {
        while (true) {
            const enhance = random.number(1, maxConfig.length);
            if (result[enhance - 1] < maxConfig[enhance - 1]) {
                result[enhance - 1]++;
                break;
            }
        }
    });
    return result;
}
