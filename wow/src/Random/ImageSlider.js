// noinspection JSValidateTypes

import React, {createRef} from "react";
import "../styles/JustGrid.scss";
import "./styles/ImageGrid.scss";
import GlitchImage from "../GlitchImage";
import "./styles/Slider.scss";
import Grid from "../Grid";

class ImageSlider extends React.Component {
    /**
     * @type JustSliderConfig
     */
    c;

    constructor(props, context) {
        super(props, context);
        this.item = createRef();
        this.c = this.props.config;
        console.log(this.props.division);
    }

    render() {
        return <div ref={this.item}
                    className={`just-random-slider just-random-slider-preset-${this.c.animationPreset}`}>
            <div className={`img-size-1 just-random-slider-slides`}
                 style={{'--image-count': this.c.size + 1}}>
                <div className={"just-random-image-glitch-grid-grid just-grid"}>
                    {Array.range(1, this.props.division.cols + 1).map((col) =>
                        Array.range(1, this.props.division.rows + 1).map((row) =>
                            <div key={Grid.toCellIndex(col, row)}
                                 className={`just-grid-cell just-grid-cell-${Grid.toCellIndex(col, row)}`}>
                                <GlitchImage img={this.c.img}
                                             preset={2}
                                             animationDelayedStart={this.c.randomDelay[(col-1) + (row-1) * this.props.division.col]}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>;
    }
}

export default ImageSlider;
