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
    }

    render() {
        return <div ref={this.item} className={"just-random-image-glitch-grid"}>
            <div className={"just-random-image-glitch-grid-grid just-grid"}>
                {Array.range(1, Grid.TOTAL_CELLS).map((i) =>
                    <div className={"just-grid-cell-" + i}>
                        <GlitchImage img={this.props.img} preset={this.preset}/>
                    </div>
                )}
            </div>
        </div>;
    }
}

export default ImageGrid;
