import React, {createRef} from "react";
import "../styles/JustGrid.scss";
import "./styles/ImageGrid.scss";
import Grid from "../Grid";
import GlitchImage, {GlitchImagePreset} from "../GlitchImage";

class ImageGrid extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.item = createRef();
        this.preset = GlitchImagePreset.random();
        this.cols = this.props.division.endCol - this.props.division.startCol + 1;
        this.rows = this.props.division.endRow - this.props.division.startRow + 1;
    }

    render() {
        return <div ref={this.item} className={"just-random-image-glitch-grid"}>
            <div className={"just-random-image-glitch-grid-grid just-grid"}>
                {Array.range(1, this.rows).map((i) =>
                    Array.range(1, this.cols).map((j) =>
                        <div key={Grid.toCellIndex(i, j)} className={"just-grid-cell-" + Grid.toCellIndex(i, j)}>
                            <GlitchImage img={this.props.img} preset={this.preset}
                                         animationDelayedStart={Grid.animationDelay(this.props.division.startRow + i, this.props.division.startCol + j)}/>
                        </div>
                    )
                )}
            </div>
        </div>;
    }
}

export default ImageGrid;
