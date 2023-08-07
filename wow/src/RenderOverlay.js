import GlitchImage from "./GlitchImage";
import "./styles/RenderOverlay.scss";
import React from "react";
import Random from "./Random";
import Logo from "./Logo";

export default class RenderOverlay extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            preset: Random.fresh().randomItem([1, 3]),
            img: Random.fresh().randomItem(['coolshoe', 'sexydrugrabbit', 'stardroid'])
        };
    }

    render() {
        return <div className="wow-render-overlay" style={{
            '--size': `${this.props.size}px`,
            '--animation-length': `${this.props.animationLength * 2}ms`,
        }}>
            <div className="wow-render-overlay-small-imgs">
                {Array.range(1, 16).map(_ => Array.range(1, 16).map(_ => <div
                    className={"wow-render-overlay-img-container"}>
                    <div className="wow-render-overlay-img-container-img"><GlitchImage img={this.state.img}
                                                                                       preset={this.state.preset}/>
                    </div>
                </div>))}
            </div>
            <div className="wow-render-overlay-big-img">
                <Logo/>
            </div>
        </div>

    }
}
