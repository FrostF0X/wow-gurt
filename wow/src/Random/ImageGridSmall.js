import React, {createRef} from "react";
import "../styles/JustGrid.scss";
import "./styles/ImageGrid.scss";
import Grid from "../Grid";
import GlitchImage from "../GlitchImage";

class ImageGridSmall extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.item = createRef();
    }

    render() {
        return <div ref={this.item} className={"just-random-image-glitch-grid"}>
            <div className={"just-random-image-glitch-grid-grid just-grid"}>
                {Array.range(1, this.props.division.cols).map((col) =>
                    Array.range(1, this.props.division.rows).map((row) => {
                            return <div key={Grid.toCellIndex(col, row)}
                                        className={`just-grid-cell just-grid-cell-${Grid.toCellIndex(col, row)} ${this.props.division.startCol + col}-${this.props.division.startRow + row}` }>
                                <GlitchImage img={this.props.img}
                                             preset={this.props.preset}
                                             animationDelayedStart={Grid.animationDelay(this.props.division.startCol + col, this.props.division.startRow + row)}/>
                            </div>;
                        }
                    )
                )}
            </div>
        </div>;
    }
}

export default ImageGridSmall;
