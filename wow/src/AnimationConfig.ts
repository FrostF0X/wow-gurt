import Random from "./Random";
import {AreaDivider, AreaDivision} from "./AreaDivision";
import Delay from "./Animation/Delay";
import Color from "./Animation/Color";

export default class AnimationConfig {
    static levelConfig = [2, 2, 3, 3];
    static levelRarityConfig = [1, 1, 1, 2, 3];

    constructor(public cells: CellConfig[], public delay: Delay, public readonly colors: string[]) {
    }

    public static generate(seed: string): AnimationConfig {
        const r = Random.fresh(seed);
        const divider = new AreaDivider(r.randomItems(AnimationConfig.levelConfig, r.randomItems(AnimationConfig.levelRarityConfig, 1)[0]), 8, 8, r);
        const divisions = divider.divide().flatten();
        const cells = divisions.map(d => {
            return new CellConfig(d, AnimationConfig.wowConfig(d));
        });
        return new AnimationConfig(cells, r.randomItem(Delay.variants), r.randomItem(Color.variants));
    }

    public static wowConfig(d: AreaDivision) {
        const r = Random.fresh(Number.random(1, Number.MAX_SAFE_INTEGER));
        switch (Number.random(1, 4)) {
            case 1:
                return new JustWaveConfig(r.img().rand(), d.rows > d.cols ? "vertical" : "horizontal", r.number(1, 3));
            case 2:
                return new JustChessConfig(r.img().rand(), r.img().randp());
            case 3:
                return new JustGridConfig(d.rows === d.cols ? r.randomItem(["big", "small"]) : "small", r.img().rand(), r.img().randp());
            case 4:
                return new JustSliderConfig(
                    Math.max(d.rows, d.cols),
                    r.img().rand(),
                    r.number(1, 4),
                    Array.range(0, d.rows * d.cols).map(() => r.img().randd())
                );
            default:
                throw new Error('Such number is not supported');
        }
    }
}

export class CellConfig {
    constructor(public division: AreaDivision, public config: JustConfig) {
    }

}

class JustConfig {
    public wowType: string = 'none';
}

export class JustWaveConfig extends JustConfig {
    public wowType = 'wave';

    constructor(public img: string, public direction: 'vertical' | 'horizontal', public preset: number) {
        super();
    }
}

export class JustChessConfig extends JustConfig {
    public wowType = 'chess';

    constructor(public img: string, public preset: number) {
        super();
    }
}

export class JustGridConfig extends JustConfig {
    public wowType = 'images';

    constructor(public type: 'big' | 'small', public img: string, public preset: number) {
        super();
    }
}

export class JustSliderConfig extends JustConfig {
    public wowType = 'slider';

    constructor(public size: number, public img: string, public animationPreset: number, public randomDelay: number[]) {
        super();
    }
}
