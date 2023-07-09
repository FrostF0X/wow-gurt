import React, {createRef} from "react";
import "./styles/Glitch.scss";
import Random from "./Random";

class GlitchImage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.preset = this.props.preset ?? GlitchImagePreset.random();
        this.img = this.props.img ?? Random.get().image();
        this.item = createRef();
        this.additionalClass = `animation-delayed-start-${this.props.animationDelayedStart}`;
        this.additionalImage = Random.get().image();
    }

    render() {
        return <div className={`just-glitch-img-container just-glitch-preset-${this.preset.index}`}>
            <img className={`just-glitch-img just-glitch-img-1 ${this.additionalClass}`}
                 src={this.img} alt={"img"}/>
            <img className={`just-glitch-img just-glitch-img-2 ${this.additionalClass}`}
                 src={this.img} alt={"img"}/>
            <img className={`just-glitch-img just-glitch-img-3 ${this.additionalClass}`} alt={"img"}
                 src={this.img}/>
            {this.preset.duplicateImage &&
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

    animationDelay;
    index;
    doubleImage;

    constructor(animationDelay, index, duplicateImage) {
        this.animationDelay = animationDelay;
        this.index = index;
        this.doubleImage = duplicateImage;
    }

    static random() {
        return GlitchImagePreset.presets[Random.get().number(0, GlitchImagePreset.presets.length - 1)];
    }
}

export default GlitchImage;
