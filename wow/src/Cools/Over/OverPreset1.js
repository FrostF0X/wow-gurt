import React from "react";
import GlitchImage from "../../GlitchImage";
import './OverPreset1.scss';

export default class OverPreset1 extends React.Component {
    render() {
        return <div
            className={`just-grid over-just-grid-preset-${this.props.config.overPreset} over-just-grid-preset-${this.props.config.overPreset}-level-${this.props.config.level}`}>
            <div className="over-just-grid-block over-just-grid-corner over-just-grid-corner-left-top over-frame">
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset} size={2}/>
            </div>
            <div className="over-just-grid-block over-just-grid-corner over-just-grid-corner-right-top over-frame">
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset} size={2}/>
            </div>
            <div className="over-just-grid-block over-just-grid-corner over-just-grid-corner-left-bottom over-frame">
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset} size={2}/>
            </div>
            <div className="over-just-grid-block over-just-grid-corner over-just-grid-corner-right-bottom over-frame">
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset} size={2}/>
            </div>
            <div className="over-just-grid-block over-just-grid-center-x over-just-grid-center-4 over-frame">
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset} size={2}/>
            </div>
        </div>;
    }
}
