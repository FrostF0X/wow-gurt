import './styles/Just.scss';
import './styles/TextGlitch.scss';
import React, {createRef} from "react";
import Wave from "./Random/Wave";
import ImageGrid from "./Random/ImageGrid";
import Chess from "./Random/Chess";
import Delay from "./Animation/Delay";
import Color from "./Animation/Color";
import Slow from "./Animation/Slow";
import Size from "./Animation/Size";
import {JustChessConfig, JustGridConfig, JustWaveConfig} from "./AnimationConfig";

class Just extends React.Component {
    started = [];

    constructor(props) {
        super(props);
        this.ref = createRef();
        this.cells = [];
        Slow.slow(this.props.slow ?? 1);
    }

    onStart = (callback) => {
        this.started.push(callback);
    };

    componentDidMount() {
        this.started.forEach(callback => callback());
    }

    justFromConfig(cell) {
        const config = cell.config;
        let style = {
            gridRow: `cell-${cell.division.startRow} / cell-${cell.division.endRow + 1}`,
            gridColumn: `cell-${cell.division.startCol} / cell-${cell.division.endCol + 1}`,
        };
        if (config instanceof JustWaveConfig) {
            return <div className={"just-scene-grid-cell"} style={style}><Wave
                img={config.img}
                direction={config.direction}
                preset={config.preset}
                style={style}
            /></div>
        }
        if (config instanceof JustGridConfig) {
            return <div className={"just-scene-grid-cell"} style={style}><ImageGrid
                img={config.img}
                preset={config.preset}
                type={config.type}
                division={cell.division}
            /></div>
        }
        if (config instanceof JustChessConfig) {
            return <div className={"just-scene-grid-cell"} style={style}>
                <Chess
                    img={config.img}
                    preset={config.preset}
                    division={cell.division}
                />
            </div>;
        }
    }

    render() {
        if (this.ref && this.ref.current) {
            Size.size(this.props.size, this.ref.current);
            Delay.delay(this.props.config.delay, this.ref.current);
            Color.setColors(...this.props.config.colors, this.ref.current);
            Slow.slow2(this.ref.current);
        }
        let cells = this.props.config.cells.map(c => this.justFromConfig(c));
        return (
            <div className={"just"} ref={this.ref}>
                <div className={"just-scene-grid"} style={{"width": "100%", "height": "100%"}}>
                    {cells}
                </div>
            </div>
        );
    }
}

export default Just;
