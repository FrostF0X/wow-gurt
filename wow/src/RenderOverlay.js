import React from 'react';
import RenderOverlay1 from "./RenderOverlay1";
import RenderOverlay2 from "./RenderOverlay2";

export default class RenderOverlay extends React.Component {
    render() {
        if (this.props.overlay === 1) {
            return <RenderOverlay1 size={this.props.size} animationLength={this.props.animationLength}/>
        }
        if (this.props.overlay === 2) {
            return <RenderOverlay2 size={this.props.size} animationLength={this.props.animationLength}/>
        }
        return <></>
    }
}
