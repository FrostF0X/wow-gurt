import React from "react";
import "./Cools.scss"
import OverPreset1 from "./Over/OverPreset1";
import OverPreset2 from "./Over/OverPreset2";
import OverPreset3 from "./Over/OverPreset3";
import OverPreset4 from "./Over/OverPreset4";
import OverPreset5 from "./Over/OverPreset5";

export default class Over extends React.Component {
    render() {
        return <div className="wow-cools-overlay img-size-max">
            {this.preset()}
        </div>
    }

    preset() {
        let config = this.props.config;
        let preset = config.overPreset;
        console.log(preset);
        if (preset === 1) {
            return <OverPreset1 config={config}></OverPreset1>
        }
        if (preset === 2) {
            return <OverPreset2 config={config}></OverPreset2>
        }
        if (preset === 3) {
            return <OverPreset3 config={config}></OverPreset3>
        }
        if (preset === 4) {
            return <OverPreset4 config={config}></OverPreset4>
        }
        if (preset === 5) {
            return <OverPreset5 config={config}></OverPreset5>
        }
        throw new Error(`Preset ${preset} is not supported`);
    }
}
