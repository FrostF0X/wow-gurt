import GlitchImage from "./GlitchImage";
import "./styles/RenderOverlay1.scss";
import React from "react";
import Random from "./Random";
import Logo from "./Logo";

export default class RenderOverlay1 extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            preset: Random.fresh().randomItem([1]),
            img: Random.fresh().randomItem(['stardroid'])
        };
    }

    render() {
        return <div className="wow-render-overlay" style={{
            '--size': `${this.props.size}px`,
            '--animation-length': `${this.props.animationLength}ms`,
        }}>
            <div className="wow-render-overlay-small-imgs">
                {Array.range(1, 2).map(i => Array.range(1, 2).map(j => <div
                    className={`wow-render-overlay-img wow-render-overlay-img-${i}-${j}`}>
                    <GlitchImage img={"logo/parts/coin-star"} preset={"geton"}/>
                </div>))}
            </div>
            <div className="wow-render-overlay-big-img">
                <Logo/>
            </div>
        </div>

    }
}
