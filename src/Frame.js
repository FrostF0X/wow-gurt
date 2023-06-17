import React from "react";
import Typed from "./Typed";
import "./styles/Frame.scss"

class Frame extends React.Component {
    render() {
        return <div className={"frame-banner " + this.props.className}>
            <div><Typed
                className={"frame-banner-text glitch-text-rare"}
                typeSpeed={20}
                title={[
                    "⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁⟁111⟁⟁111⟁⟁111⟁111⟁111⟁⟁111".shuffle(),
                ]}
            /></div>
            <div><Typed
                className={"frame-banner-text glitch-text-rare"}
                typeSpeed={20}
                title={[
                    "⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁⟁111⟁⟁111⟁⟁111⟁111⟁111⟁⟁111".shuffle(),
                ]}
            /></div>
            <div><Typed
                className={"frame-banner-text glitch-text-rare"}
                typeSpeed={20}
                title={[
                    "⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁111⟁⟁111⟁⟁111⟁⟁111⟁111⟁111⟁⟁111".shuffle(),
                ]}
            /></div>
        </div>
    }
}

export default Frame;
