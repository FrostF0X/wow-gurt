import GlitchImage from "./GlitchImage";
import "./styles/RenderOverlay2.scss";
import React from "react";

export default class RenderOverlay2 extends React.Component {

    render() {
        return <div className="wow-render-2-overlay" style={{
            '--size': `${this.props.size}px`,
            '--animation-length': `${this.props.animationLength}ms`,
        }}>
            <div className="wow-render-2-overlay-small-imgs">
                {Array.range(1, 2).map(i => Array.range(1, 2).map(j => <div
                    className={`wow-render-2-overlay-img wow-render-2-overlay-img-${i}-${j}`}>
                    <GlitchImage img={"logo/parts/coin-star"} preset={"geton"}/>
                </div>))}
            </div>
            <div className="wow-render-2-overlay-big-img">
                <GlitchImage img={'logo/frame'} preset={2}/>
            </div>
            <div className="wow-render-2-overlay-big-img">
                <GlitchImage img={'logo/lines'} preset={2}/>
            </div>
            <div className="wow-render-2-overlay-big-img">
                <GlitchImage img={'logo/w'} preset={7}/>
            </div>
            <div className="wow-render-2-overlay-big-img">
                <GlitchImage img={'logo/geton'} preset={'geton'}/>
            </div>
            <div className="wow-render-2-overlay-big-img">
                <GlitchImage img={'100-games'} preset={5}/>
            </div>
        </div>

    }
}
