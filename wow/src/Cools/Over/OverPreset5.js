import React from "react";
import GlitchImage from "../../GlitchImage";
import './OverPreset5.scss';

export default class OverPreset5 extends React.Component {
    render() {
        return <div className="just-grid">
            <div className="over-preset-5-just-grid-left-top">
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset} size={2}/>
            </div>
            <div className="over-preset-5-just-grid-right-top">
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset} size={2}/>
            </div>
            <div className="over-preset-5-just-grid-left-bottom">
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset} size={2}/>
            </div>
            <div className="over-preset-5-just-grid-right-bottom">
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset} size={2}/>
            </div>
            <div className="over-preset-5-just-grid-center">
                <GlitchImage type={'over'} key={Number.random(1, Number.MAX_SAFE_INTEGER)}
                             img={this.props.config.img} preset={this.props.config.preset} size={2}/>
            </div>
        </div>;
    }
}
