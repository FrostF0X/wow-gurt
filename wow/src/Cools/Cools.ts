import Random from "../Random";
import {WowBordersPreset} from "../WowBorders";

export class Cools {

    public static gen(seed: string, triesCount: number, level: number): Cools {
        let traitLevel = [[0, 0, 0], [1, 0, 0], [1, 1, 1], [2, 1, 1], [3, 1, 2], [3, 2, 2], [4, 2, 2], [4, 3, 2]][level];
        const res = new Cools(
            BordersConfig.level(traitLevel[0], Random.fresh(seed + triesCount)),
            OverConfig.level(traitLevel[1], Random.fresh(seed + triesCount)),
            MatrixConfig.level(traitLevel[2], Random.fresh(seed + triesCount)),
            ImageStyle.none()
        );
        console.log(res);
        return res;
    }

    static none() {
        return new Cools(BordersConfig.none(), OverConfig.none(), MatrixConfig.none(), ImageStyle.none())
    }

    constructor(public borders: BordersConfig, public over: OverConfig | null, public matrix: MatrixConfig | null, public style: ImageStyle = ImageStyle.none()) {
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
    constructor(public img: string, public level: number, public preset: number, public overPreset: number) {
    }

    static level(level: number, random: Random) {
        if (level === 0) {
            return OverConfig.none();
        }
        return new OverConfig(
            random.img().rand(),
            level,
            random.img().randp(),
            random.number(1, 4)
        );
    }

    static none() {
        return null;
    }
}

export class BordersConfig {
    constructor(public img: string, public imgPreset: number, public preset: WowBordersPreset, public level: number) {
    }

    static level(level: number, random: Random) {
        return new BordersConfig(random.img().rand(), random.img().randp(), random.randomItem(WowBordersPreset.level(level)), level);
    }

    static none() {
        return new BordersConfig('', 1, WowBordersPreset.none(), 0);
    }

}

export class MatrixConfig {
    constructor(public img: string, public level: number) {
    }

    static level(level: number, r: Random) {
        if (level > 0) {
            return MatrixConfig.img(r, level);
        }
        return MatrixConfig.none();
    }

    static img(r: Random, level: number) {
        return new MatrixConfig(r.img().rand(), level);
    }

    static none() {
        return null;
    }
}
