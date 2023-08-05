import React from "react";
import GlitchImage from "./GlitchImage";
import "./styles/WowBorders.scss";

const WOW_DEFAULT_SCENE_SCALE = 64;

export default class WowBorders extends React.Component {

    render() {
        const preset = this.props.config.preset;
        console.log(preset);
        const img = this.props.config.img;
        const width = WOW_DEFAULT_SCENE_SCALE / preset.width;
        const borderFullCellsWidth = (preset.count) * 2;
        const fullCellsCount = width + borderFullCellsWidth;
        const borderImage = <GlitchImage type={'border'} key={Number.random(1, Number.MAX_SAFE_INTEGER)} img={img}/>;
        return (
            <div className={`wow-borders image-rescale ${preset.chess ? 'wow-borders-chess' : ''}`}
                 style={{
                     "--wow-border-full-cell-count": fullCellsCount,
                     "--wow-border-width": this.props.width,
                     "--wow-scene-size": `${this.props.size * width / fullCellsCount}px`,
                     "--wow-border-cell-size": `${this.props.size / fullCellsCount}px`,
                 }}>
                {this.getFramePairs(fullCellsCount, preset.count).map(i => <div
                    className={`wow-borders-cell-${i}`}>{borderImage}</div>)}
                <div className="wow-borders-outer"></div>
                {preset.innerBorders ? Array.range(1, preset.count - 1).map(i => <div
                    className={`wow-borders-level-${i}`}></div>
                ) : []}
                <div className={`wow-borders-level-${preset.count}`}></div>
                <div className={"wow-borders-inner"}>
                    <div className={"wow-scene-grid"}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

    getFramePairs(size, width) {
        const pairs = [];

        // Top and Bottom Rows
        for (let row = 1; row <= width; row++) {
            for (let col = 1; col <= size; col++) {
                pairs.push([row, col]);
                pairs.push([size - row + 1, col]);
            }
        }

        // Left and Right Columns, excluding the already added top and bottom rows
        for (let row = width + 1; row <= size - width; row++) {
            for (let col = 1; col <= width; col++) {
                pairs.push([row, col]);
                pairs.push([row, size - col + 1]);
            }
        }

        return pairs.map((p) => p[0] + "-" + p[1]);
    }
}

export class WowBordersPreset {
    name;
    chess;
    count;
    width;
    innerBorders;

    constructor(name, width, count, chess, innerBorders) {
        this.name = name;
        this.width = width > 0 ? width : 1;
        this.count = count;
        this.chess = chess;
        this.innerBorders = innerBorders;
    }

    static level = (level) => {
        const levels = [
            [[1, 0], [true], [true]],
            [[1, 1], [true, false], [true, false]],
            [[[1, 4], [4, 1]], [true, false], [true, false]],
        ];

        return this.paramsToConfig(levels[level]);
    }

    static none = () => {
        return this.paramsToConfig([[[1, 0]], [true], [true]])[0];
    }

    static paramsToConfig(params) {
        return Array.combinations(params).map((i, key) => new WowBordersPreset(String(key + 1), ...i[0], i[1], i[2]));
    }

    static get(preset) {
        return WowBordersPreset.all()[preset - 1];
    }
}
