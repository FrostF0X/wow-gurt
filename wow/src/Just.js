import './styles/Just.scss';
import './styles/TextGlitch.scss';
import React from "react";
import {JustFrame} from "./JustFrame";
import Wave from "./Random/Wave";
import ImageGrid from "./Random/ImageGrid";
import {AreaDivider} from "./AreaDivision";
import JustRandomChess from "./Random/Chess";
import Random from "./Random";

class Just extends React.Component {
    levelConfig = [2, 3, 3];
    static started = [];

    constructor(props) {
        super(props);
        this.cells = [];
    }

    componentDidMount() {
        const divider = new AreaDivider(this.levelConfig, 8, 8);
        this.divisions = divider.divide();
        console.log(this.divisions.flatten());
        this.divisions.flatten().forEach((division, i) => {
            this.cells[i].style.gridRow = `cell-${division.startRow} / cell-${division.endRow + 1}`;
            this.cells[i].style.gridColumn = `cell-${division.startCol} / cell-${division.endCol + 1}`;
        });
        Just.started.forEach(callback => callback());
    }


    addCellRef = (ref) => {
        this.cells.push(ref);
    };


    render() {
        return (
            <div className={"just"}>
                <JustFrame>
                    <div className={"just-scene-grid"} style={{"width": "100%", "height": "100%"}}>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}><Wave img={Random.image()}/></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}><ImageGrid img={Random.image()}/>
                        </div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}><JustRandomChess/></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}><Wave img={Random.image()}/></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}><ImageGrid img={Random.image()}/>
                        </div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}><JustRandomChess/></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}><Wave img={Random.image()}/></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}><ImageGrid img={Random.image()}/>
                        </div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}><JustRandomChess/></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}></div>
                        <div ref={this.addCellRef} className={"just-scene-grid-cell"}></div>
                    </div>
                </JustFrame>
            </div>
        );
    }

    static onStart = (callback) => {
        Just.started.push(callback);
    };
}

export default Just;
