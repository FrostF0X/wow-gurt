import Random from "./Random";
import {AreaDivider, AreaDivision} from "./AreaDivision";
import {GlitchImagePreset} from "./GlitchImage";
import Delay from "./Animation/Delay";
import Color from "./Animation/Color";

export default class AnimationConfig {
    static levelConfig = [2, 2, 3, 3];
    static levelRarityConfig = [1, 1, 1, 1, 1, 1, 1, 1, 2, 3];

    constructor(public readonly cells: CellConfig[], public readonly delay: Delay, public readonly colors: string[]) {
    }

    public static generate(seed: number): AnimationConfig {
        const r = Random.fresh(seed);
        const divider = new AreaDivider(r.randomItems(AnimationConfig.levelConfig, r.randomItems(AnimationConfig.levelRarityConfig, 1)[0]), 8, 8, r);
        const divisions = divider.divide().flatten();
        const cells = divisions.map(d => {
            switch (r.number(1, 3)) {
                case 1:
                    return new CellConfig(d, new JustWaveConfig(r.img().rand(), d.rows > d.cols ? "vertical" : "horizontal", r.number(1, 3)));
                case 2:
                    return new CellConfig(d, new JustChessConfig(r.img().rand(), r.img().randp()));
                case 3:
                    return new CellConfig(d, new JustGridConfig(d.rows === d.cols ? "big" : "small", r.img().rand(), r.img().randp()));
                default:
                    throw new Error('Such number is not supported');
            }
        });
        return new AnimationConfig(cells, r.randomItem(Delay.variants), r.randomItem(Color.variants));
    }
}

export class CellConfig {
    constructor(public readonly division: AreaDivision, public readonly config: JustConfig) {
    }

}

interface JustConfig {
}

export class JustWaveConfig implements JustConfig {
    constructor(public img: string, public direction: 'vertical' | 'horizontal', public preset: number) {
    }
}

export class JustChessConfig implements JustConfig {
    constructor(public img: string, public preset: GlitchImagePreset) {
    }
}

export class JustGridConfig implements JustConfig {
    constructor(public type: 'big' | 'small', public img: string, public preset: GlitchImagePreset) {
    }
}
