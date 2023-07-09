import './styles/Just.scss';
import './styles/TextGlitch.scss';
import React from "react";
import Wave from "./Random/Wave";
import ImageGrid from "./Random/ImageGrid";
import {AreaDivider} from "./AreaDivision";
import JustRandomChess from "./Random/Chess";
import Random from "./Random";
import RandomWindows from "./Random/RandomWindows";
import Delay from "./Animation/Delay";
import Slow from "./Animation/Slow";

class Just extends React.Component {
    levelConfig = [2, 2, 3, 3];
    levelRarityConfig = [1, 2, 2, 2, 2, 2, ...Array.range(1, 25).map(() => 3)];
    static started = [];

    constructor(props) {
        super(props);
        this.cells = [];
        const divider = new AreaDivider(Random.get().randomItems(this.levelConfig, Random.get().randomItems(this.levelRarityConfig, 1)[0]), 8, 8);
        this.divisions = divider.divide().flatten();
        Delay.randomDelay();
        Slow.randomSlow();
    }

    componentDidMount() {
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
        switch (Random.get().number(1, 4)) {
            case 1:
                return <Wave img={Random.get().image()}/>
            case 2:
                return <ImageGrid division={this.divisions[i]} img={Random.get().image()}/>
            case 3:
                return <JustRandomChess division={this.divisions[i]}/>
            case 4:
                return <RandomWindows/>
            default:
                return <div/>
        }
    }

    render() {
        return (
            <div className={"just"}>
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

    static onStart = (callback) => {
        Just.started.push(callback);
    };
}

export default Just;
