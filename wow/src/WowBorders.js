import React from "react";
import GlitchImage from "./GlitchImage";
import "./styles/WowBorders.scss";

const WOW_DEFAULT_SCENE_SCALE = 64;

export default class WowBorders extends React.Component {

    render() {
        const preset = WowBordersPreset.get(this.props.preset);
        const borderFullCellsWidth = (preset.width) * 2;
        const fullCellsCount = WOW_DEFAULT_SCENE_SCALE + borderFullCellsWidth;
        const borderImage = <GlitchImage min={true} key={Number.random(1, Number.MAX_SAFE_INTEGER)} img={this.props.img}/>;
        return (
            <div className={`wow-borders image-rescale ${preset.chess ? 'wow-borders-chess' : ''}`}
                 style={{
                     "--wow-border-full-cell-count": fullCellsCount,
                     "--wow-border-width": this.props.width,
                     "--wow-scene-size": `${this.props.size * WOW_DEFAULT_SCENE_SCALE / fullCellsCount}px`,
                     "--wow-border-cell-size": `${this.props.size / fullCellsCount}px`,
                 }}>
                {this.getFramePairs(fullCellsCount, preset.width).map(i => <div
                    className={`wow-borders-cell-${i}`}>{borderImage}</div>)}
                <div className="wow-borders-outer"></div>
                {preset.innerBorders ? Array.range(1, preset.width - 1).map(i => <div
                    className={`wow-borders-level-${i}`}></div>
                ) : []}
                <div className={`wow-borders-level-${preset.width}`}></div>
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
    static none = new WowBordersPreset('1', true, 0);
    name;
    chess;
    width;
    innerBorders;

    constructor(name, width, chess, innerBorders) {
        this.name = name;
        this.width = width;
        this.chess = chess;
        this.innerBorders = innerBorders;
    }

    static all = () => {
        return Array.combinations([[0, 1, 2, 3, 4, 5], [true, false], [true, false]]).map((i, key) => new WowBordersPreset(String(key + 1), ...i))
    }

    static get(preset) {
        return WowBordersPreset.all()[preset - 1];
    }
}
