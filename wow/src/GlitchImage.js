import React, {createRef} from "react";
import "./styles/Glitch.scss";

class GlitchImage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.preset = this.props.preset;
        this.img = this.props.img;
        this.item = createRef();
        this.additionalClass = this.props.animationDelayedStart ? `animation-delayed-start-${this.props.animationDelayedStart}` : '';
        this.sizer = this.props.size ?? 1;
        this.container = createRef();
    }

    componentDidMount() {
        this.container.current.style.setProperty('--sizer', this.sizer);
    }

    render() {
        return <div ref={this.container}
                    className={`just-glitch-img-container just-glitch-preset-${this.preset.index}`}>
            <img className={`just-glitch-img just-glitch-img-1 ${this.additionalClass}`}
                 src={this.img} alt={"img"}/>
            <img className={`just-glitch-img just-glitch-img-2 ${this.additionalClass}`}
                 src={this.img} alt={"img"}/>
            <img className={`just-glitch-img just-glitch-img-3 ${this.additionalClass}`} alt={"img"}
                 src={this.img}/>
            <img className={`just-glitch-img just-glitch-img-4 ${this.additionalClass}`} alt={"img"}
                 src={this.img}/>
            <img className={`just-glitch-img just-glitch-img-5 ${this.additionalClass}`} alt={"img"}
                 src={this.img}/>
            <img className={`just-glitch-img just-glitch-img-6 ${this.additionalClass}`} alt={"img"}
                 src={this.img}/>
            <img className={`just-glitch-img just-glitch-img-7 ${this.additionalClass}`} alt={"img"}
                 src={this.img}/>
        </div>;
    }
}

export class GlitchImagePreset {
    static presets = [
        new GlitchImagePreset(false, 1, true),
        new GlitchImagePreset(false, 2, true),
        new GlitchImagePreset(false, 3, true),
        new GlitchImagePreset(false, 4, true),
        new GlitchImagePreset(false, 5, true),
        new GlitchImagePreset(false, 6, true),
        new GlitchImagePreset(false, 7, true),
    ];

    static plain = new GlitchImagePreset(true, 2, true);
    animationDelay;
    index;
    doubleImage;

    constructor(animationDelay, index, duplicateImage) {
        this.animationDelay = animationDelay;
        this.index = index;
        this.doubleImage = duplicateImage;
    }
}

export default GlitchImage;
