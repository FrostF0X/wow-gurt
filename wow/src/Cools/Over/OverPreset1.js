import React from "react";
import GlitchImage from "../../GlitchImage";
import './OverPreset1.scss';

export default class OverPreset1 extends React.Component {
    render() {
        return <div className="just-grid">
            <div className="over-preset-1-just-grid-left-top">
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset} size={2}/>
            </div>
            <div className="over-preset-1-just-grid-right-top">
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset} size={2}/>
            </div>
            <div className="over-preset-1-just-grid-left-bottom">
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset} size={2}/>
            </div>
            <div className="over-preset-1-just-grid-right-bottom">
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset} size={2}/>
            </div>
            <div className="over-preset-1-just-grid-center">
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset} size={2}/>
            </div>
        </div>;
    }
}
