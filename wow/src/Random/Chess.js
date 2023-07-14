import React from "react";
import "./styles/Window.scss";
import "./styles/Chess.scss";
import GlitchImage from "../GlitchImage";
import Grid from "../Grid";

class Chess extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.preset = this.props.random.img().randp();
        this.cols = this.props.division.endCol - this.props.division.startCol + 1;
        this.rows = this.props.division.endRow - this.props.division.startRow + 1;
        this.invert = ((this.props.division.startRow + this.props.division.startCol) % 2) ? 'just-random-chess-invert' : 'just-random-chess';
        this.img = this.props.random.img().rand();
    }

    render() {
        return <div ref={this.randomItem} className={"just-random-chess " + this.invert}>
            <div ref={this.randomItem}
                 className={"just-random-chess-grid just-grid just-random-chess-grid-board"}>
                {Array.range(1, this.rows).map((i) =>
                    Array.range(1, this.cols).map((j) =>
                        <div
                            key={Grid.toCellIndex(i, j)}
                            className={`just-grid-cell just-random-chess-grid-cell-${Grid.toCellIndex(i, j)} just-grid-cell-${Grid.toCellIndex(i, j)}`}>
                        </div>
                    )
                )}
            </div>
            <div ref={this.randomItem}
                 className={"just-random-chess-grid just-grid just-random-chess-grid-pieces"}>
                {Array.range(1, this.rows).map((i) =>
                    Array.range(1, this.cols).map((j) => {
                            return <div className={"just-random-chess-piece just-grid-cell-" + Grid.toCellIndex(i, j)}>
                                <GlitchImage key={Grid.toCellIndex(i, j)} img={this.img} preset={this.preset}
                                             animationDelayedStart={Grid.animationDelay(this.props.division.startRow + i, this.props.division.startCol + j)}/>
                            </div>;
                        }
                    )
                )}
            </div>
        </div>;
    }
}

export default Chess;
