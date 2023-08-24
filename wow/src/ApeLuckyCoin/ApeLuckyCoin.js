import React from "react";
import "./ApeLuckyCoin.scss";
import Random from "../Random";
import InlineSVG from "react-inlinesvg";
import Slow from "../Animation/Slow";

export default class ApeLuckyCoin extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.patterns = [
            14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 37, 38
        ];
        Slow.slow(this.props.slow ?? 1);
        if (!this.props.seed) {
            throw new Error("Seed should be defined");
        }
        this.state = {patterns: Random.fresh(this.props.seed).randomItems(this.patterns, 5)};
    }

    componentDidMount = () => {
        setInterval(() => {
            const patterns = this.state.patterns;
            patterns.unshift(patterns.pop());
            this.setState({patterns: patterns});
        }, 73 * Slow.x());
    }

    render() {
        return <div className={`ape-lucky-coin`}
                    style={{"--scene-width": this.props.size ? `${this.props.size}px` : '100%'}}>
            <div className="ape-lucky-coin-assets">
                <div className="ape-lucky-coin-assets-container">
                    <InlineSVG src="/assets/ape-lucky-coin/masks/masks.svg"></InlineSVG>
                    <div className={`ape-lucky-coin-backgrounds`}>
                        <div className={`ape-lucky-coin-backgrounds-container`}>
                            <img src={`/assets/ape-lucky-coin/background/${this.state.patterns[4]}.png`}
                                 className={'ape-lucky-coin-skull-layer-5 ape-lucky-coin-background'}/>
                            <img src={`/assets/ape-lucky-coin/background/${this.state.patterns[3]}.png`}
                                 className={'ape-lucky-coin-skull-layer-4 ape-lucky-coin-background'}/>
                            <img src={`/assets/ape-lucky-coin/background/${this.state.patterns[2]}.png`}
                                 className={'ape-lucky-coin-skull-layer-3 ape-lucky-coin-background'}/>
                            <img src={`/assets/ape-lucky-coin/background/${this.state.patterns[1]}.png`}
                                 className={'ape-lucky-coin-skull-layer-2 ape-lucky-coin-background'}/>
                            <img src={`/assets/ape-lucky-coin/background/${this.state.patterns[0]}.png`}
                                 className={'ape-lucky-coin-skull-layer-1 ape-lucky-coin-background'}/>
                        </div>
                    </div>
                    <img src="/assets/ape-lucky-coin/ape.png" className={'ape-lucky-coin-background'}/>
                    <img src="/assets/ape-lucky-coin/lines.png" className={'ape-lucky-coin-background'}/>
                    <img src="/assets/ape-lucky-coin/lines.png" className={'ape-lucky-coin-background'}/>
                    <img src="/assets/ape-lucky-coin/coin-wrap.png" className={'ape-lucky-coin-background'}/>
                    <div className="ape-lucky-coin-background ape-lucky-coin-shadow"></div>
                </div>
            </div>
        </div>
    }
}
