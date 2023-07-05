import React from "react";
import "./styles/Window.scss";
import "./styles/Chess.scss";
import GlitchImage, {GlitchImagePreset} from "../GlitchImage";
import Grid from "../Grid";
import Random from "../Random";

class Chess extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.preset = GlitchImagePreset.random();
    }

    componentDidMount = () => {
        this.assignPieces();
    }

    assignPieces() {
        this.cells.forEach((cellRef) => {
            cellRef.classList = [];
            cellRef.classList.add(`just-grid-cell-${Number.random(1, Grid.TOTAL_CELLS)}`);
        })
    }

    cells = [];

    addPieceRef = (ref) => {
        this.cells.push(ref);
    };

    render() {
        return <div ref={this.randomItem} className={"just-random-chess"}>
            <div ref={this.randomItem}
                 className={"just-random-chess-grid just-grid just-random-chess-grid-board"}>
                {Array.range(1, Grid.TOTAL_CELLS).map((i) =>
                    <div className={`just-grid-cell just-random-chess-grid-cell-${i} just-grid-cell-${i}`}>
                    </div>
                )}
            </div>
            <div ref={this.randomItem}
                 className={"just-random-chess-grid just-grid just-random-chess-grid-pieces"}>
                {Array.range(10, 100).map(() =>
                    <div className={"just-random-chess-piece"} ref={this.addPieceRef}>
                        <GlitchImage img={Random.get().image()} preset={this.preset}/>
                    </div>
                )}
            </div>
        </div>;
    }
}

export default Chess;
