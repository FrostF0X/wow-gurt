import React from "react";
import "./styles/Window.scss";
import "./styles/Chess.scss";
import GlitchImage from "../GlitchImage";
import Grid from "../Grid";

class Chess extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.preset = this.props.preset;
        this.cols = this.props.division.cols;
        this.rows = this.props.division.rows;
        this.invert = ((this.props.division.startRow + this.props.division.startCol) % 2) ? 'just-random-chess-invert' : 'just-random-chess';
        this.img = this.props.img;
    }

    render() {
        return <div ref={this.randomItem} className={"just-random-chess " + this.invert}>
            <div ref={this.randomItem}
                 className={"just-random-chess-grid just-grid just-random-chess-grid-board"}>
                {Array.range(1, this.cols).map(col =>
                    Array.range(1, this.rows).map(row =>
                        <div
                            key={Grid.toCellIndex(col, row)}
                            className={`just-grid-cell just-random-chess-grid-cell-${Grid.toCellIndex(col, row)} just-grid-cell-${Grid.toCellIndex(col, row)}`}>
                        </div>
                    )
                )}
            </div>
            <div ref={this.randomItem}
                 className={"just-random-chess-grid just-grid just-random-chess-grid-pieces"}>
                {Array.range(1, this.cols).map((col) =>
                    Array.range(1, this.rows).map((row) => {
                            return <div key={Grid.toCellIndex(col, row)}
                                        className={`just-random-chess-piece just-grid-cell-${Grid.toCellIndex(col, row)} ${this.props.division.startCol + col}-${this.props.division.startRow + row}`}>
                                <GlitchImage type={'wow'} img={this.img} preset={this.preset}
                                             animationDelayedStart={Grid.animationDelay(this.props.division.startCol + col, this.props.division.startRow + row)}/>
                            </div>;
                        }
                    )
                )}
            </div>
        </div>;
    }
}

export default Chess;
