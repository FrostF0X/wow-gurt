import React from "react";
import "./WowLuckyCoin.scss";
import Random from "../Random";
import Slow from "../Animation/Slow";

export default class WowLuckyCoin extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.patterns = [
            7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21
        ];
        this.state = {patterns: Random.fresh(this.props.seed).randomItems(this.patterns, 5)};
        Slow.slow(this.props.slow ?? 1);
        if (!this.props.seed) {
            throw new Error("Seed should be defined");
        }
    }

    componentDidMount = () => {
        setInterval(() => {
            const patterns = this.state.patterns;
            patterns.unshift(patterns.pop());
            this.setState({patterns: patterns});
        }, 73 * Slow.x());
    }

    render() {
        return <div className={`wow-lucky-coin ${this.props.noScene === true ? '' : 'wow-lucky-coin-scene'}`}
                    style={{"--scene-width": this.props.size ? `${this.props.size}px` : '100%'}}>
            <div className="wow-lucky-coin-assets">
                <div className="wow-lucky-coin-assets-container">
                    <div className={`wow-lucky-coin-backgrounds`}>
                        <div className={`wow-lucky-coin-backgrounds-container`}>
                            <img src={`/assets/wow-lucky-coin/background/${this.state.patterns[4]}.png`}
                                 className={'wow-lucky-coin-layer-5 wow-lucky-coin-background'}/>
                            <img src={`/assets/wow-lucky-coin/background/${this.state.patterns[3]}.png`}
                                 className={'wow-lucky-coin-layer-4 wow-lucky-coin-background'}/>
                            <img src={`/assets/wow-lucky-coin/background/${this.state.patterns[2]}.png`}
                                 className={'wow-lucky-coin-layer-3 wow-lucky-coin-background'}/>
                            <img src={`/assets/wow-lucky-coin/background/${this.state.patterns[1]}.png`}
                                 className={'wow-lucky-coin-layer-2 wow-lucky-coin-background'}/>
                            <img src={`/assets/wow-lucky-coin/background/${this.state.patterns[0]}.png`}
                                 className={'wow-lucky-coin-layer-1 wow-lucky-coin-background'}/>
                        </div>
                    </div>
                    <img src="/assets/wow-lucky-coin/logo.png" className={'wow-lucky-coin-background'}/>
                    <img src="/assets/wow-lucky-coin/lines.png" className={'wow-lucky-coin-background'}/>
                    <img src="/assets/wow-lucky-coin/coin-wrap.png" className={'wow-lucky-coin-background'}/>
                </div>
            </div>
        </div>
    }
}
