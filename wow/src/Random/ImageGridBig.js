import React, {createRef} from "react";
import "../styles/JustGrid.scss";
import "./styles/ImageGrid.scss";
import GlitchImage from "../GlitchImage";

class ImageGrid extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.item = createRef();
    }

    render() {
        return <div ref={this.item} className={"just-random-image-glitch-big"}>
            <div className={`just-random-image-glitch-big img-size-${this.props.size}`}>
                {Array.range(1, this.props.images).map(() => <GlitchImage img={this.props.img} size={this.props.size} preset={this.props.preset}/>)}
            </div>
        </div>;
    }
}

export default ImageGrid;
