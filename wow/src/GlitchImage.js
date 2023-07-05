import React, {createRef} from "react";
import "./styles/Glitch.scss";
import Random from "./Random";

class GlitchImage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.item = createRef();
        console.log(this.props.preset);
        this.additionalClass = this.props.preset.randomAnimationStart ? `animation-random-start-${Number.random(1, 1000)}` : ``;
        this.additionalImage = Random.get().image();
    }

    render() {
        return <div className={`just-glitch-img-container just-glitch-preset-${this.props.preset.index}`}>
            <img className={`just-glitch-img just-glitch-img-1 ${this.additionalClass}`}
                 src={this.props.img} alt={"img"}/>
            <img className={`just-glitch-img just-glitch-img-2 ${this.additionalClass}`}
                 src={this.props.img} alt={"img"}/>
            <img className={`just-glitch-img just-glitch-img-3 ${this.additionalClass}`} alt={"img"}
                 src={this.props.img}/>
            {this.props.preset.duplicateImage &&
                <React.Fragment>
                    <img className={`just-glitch-img just-glitch-img-1 ${this.additionalClass}`} alt={"img"}
                         src={this.additionalImage}/>
                    <img className={`just-glitch-img just-glitch-img-2 ${this.additionalClass}`} alt={"img"}
                         src={this.additionalImage}/>
                    <img className={`just-glitch-img just-glitch-img-3 ${this.additionalClass}`} alt={"img"}
                         src={this.additionalImage}/>
                </React.Fragment>
            }
        </div>;
    }
}

export class GlitchImagePreset {
    static presets = [
        new GlitchImagePreset(false, 1, true),
        new GlitchImagePreset(false, 1, false),
        new GlitchImagePreset(true, 1, true),
        new GlitchImagePreset(true, 1, false),
        new GlitchImagePreset(true, 2, false),
        new GlitchImagePreset(true, 2, false),
        new GlitchImagePreset(true, 2, false),
        new GlitchImagePreset(false, 3, false),
        new GlitchImagePreset(false, 3, true),
        new GlitchImagePreset(true, 3, false),
        new GlitchImagePreset(true, 3, true),
    ];

    randomAnimationStart;
    index;
    doubleImage;

    constructor(randomAnimationStart, index, duplicateImage) {
        this.randomAnimationStart = randomAnimationStart;
        this.index = index;
        this.doubleImage = duplicateImage;
    }

    static random() {
        return GlitchImagePreset.presets[Number.random(0, GlitchImagePreset.presets.length - 1)];
    }
}

export default GlitchImage;
