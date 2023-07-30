import React, {createRef} from "react";
import "./styles/Glitch.scss";
import Img from "./Img/Img";

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
        let img = Img.path(this.img, this.props.min);
        return <div ref={this.container}
                    className={`just-glitch-img-container just-glitch-preset-${this.preset}`}>
            <img className={`just-glitch-img just-glitch-img-1 ${this.additionalClass}`}
                 src={img} alt={"img"}/>
            <img className={`just-glitch-img just-glitch-img-2 ${this.additionalClass}`}
                 src={img} alt={"img"}/>
            <img className={`just-glitch-img just-glitch-img-3 ${this.additionalClass}`} alt={"img"}
                 src={img}/>
        </div>;
    }
}

export default GlitchImage;
