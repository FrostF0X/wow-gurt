import './styles/Just.scss';
import './styles/TextGlitch.scss';
import React, {createRef} from "react";
import Wave from "./Random/Wave";
import ImageGrid from "./Random/ImageGrid";
import {AreaDivider} from "./AreaDivision";
import JustRandomChess from "./Random/Chess";
import Delay from "./Animation/Delay";
import Color from "./Animation/Color";
import Slow from "./Animation/Slow";
import Size from "./Animation/Size";

class Just extends React.Component {
    static started = [];
    levelConfig = [2, 2, 3, 3];
    levelRarityConfig = [1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3];

    constructor(props) {
        super(props);
        this.ref = createRef();
        this.cells = [];
        this.random = this.props.random;
        const divider = new AreaDivider(this.random.randomItems(this.levelConfig, this.random.randomItems(this.levelRarityConfig, 1)[0]), 8, 8, this.random);
        this.divisions = divider.divide().flatten();
    }

    static onStart = (callback) => {
        Just.started.push(callback);
    };

    componentDidMount() {
        Delay.delay(this.random.randomItem(Delay.variants), this.ref.current);
        Color.setColors(...this.random.randomItem(Color.variants), this.ref.current);
        Slow.slow(this.props.slow ?? 1, this.ref.current);
        Size.size(this.props.size ?? 512, this.ref.current);
        this.divisions.forEach((division, i) => {
            this.cells[i].style.gridRow = `cell-${division.startRow} / cell-${division.endRow + 1}`;
            this.cells[i].style.gridColumn = `cell-${division.startCol} / cell-${division.endCol + 1}`;
            this.cells[i].classList.add(`just-scene-grid-cell-active`);
        });
        Just.started.forEach(callback => callback());
    }

    addCellRef = (ref) => {
        this.cells.push(ref);
    };

    randomJust = (i) => {
        if (this.divisions[i] === undefined) {
            return;
        }
        switch (this.random.number(1, 3)) {
            case 1:
                return <Wave random={this.random}/>
            case 2:
                return <ImageGrid division={this.divisions[i]} random={this.random}/>
            case 3:
                return <JustRandomChess division={this.divisions[i]} random={this.random}/>
            default:
                return <div/>
        }
    }

    render() {
        return (
            <div className={"just"} ref={this.ref}>
                <div className={"just-scene-grid"} style={{"width": "100%", "height": "100%"}}>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(0)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(1)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(2)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(3)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(4)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(5)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(6)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(7)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(8)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(9)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(10)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(11)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(12)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(13)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(14)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(15)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(16)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(17)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(18)}</div>
                    <div ref={this.addCellRef} className={"just-scene-grid-cell"}>{this.randomJust(19)}</div>
                </div>
            </div>
        );
    }
}

export default Just;
