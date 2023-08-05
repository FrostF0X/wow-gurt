import React from "react";
import GlitchImage from "../../GlitchImage";

export default class OverPreset2 extends React.Component {
    render() {
        return <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                            img={this.props.config.img} preset={this.props.config.preset} size={8}/>;
    }
}
