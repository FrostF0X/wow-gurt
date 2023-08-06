import React from "react";
import GlitchImage from "../../GlitchImage";

export default class OverPreset2 extends React.Component {
    render() {
        return <div
            className={`just-grid over-just-grid-preset-${this.props.config.overPreset} over-just-grid-preset-${this.props.config.overPreset}-level-${this.props.config.level}`}>
            <div
                    className={`over-just-grid-block over-just-grid-center-x over-just-grid-center-${this.props.config.level * 2 + 2}`}>
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset}
                             size={this.props.config.level * 2 + 2}/>
            </div>
        </div>
    }
}
