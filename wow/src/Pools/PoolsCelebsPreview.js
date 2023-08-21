import React from "react";
import "./PoolsCelebsPreview.scss";
import Random from "../Random";
import Pepe from "./Pepe";
import GlitchImage from "../GlitchImage";

export default class PoolsCelebsPreview extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.celebs = [
            'bored-left',
            'bored-right',
            'foxe-left',
            'foxe-right',
            'pepe-left',
            'pepe-right',
        ];
        this.state = {celebs: Random.fresh().randomItems(this.celebs, 6)};
    }

    componentDidMount() {
        this.setState({celebs: Random.fresh().randomItems(this.celebs, 6)});
    }

    render() {
        return <div className={`pools-celebs-preview`}>
            <img src={`/assets/pools/celebs/background.png`} alt="" className="pools-celebs-preview-background"/>
            <div className="pools-celebs-preview-clouds pools-celebs-preview-clouds-top-1">
                <img src={`/assets/pools/celebs/clouds-top.png`} alt=""
                     className="pools-celebs-preview-clouds-1"/>
                <img src={`/assets/pools/celebs/clouds-top.png`} alt=""
                     className="pools-celebs-preview-clouds-2"/>
            </div>
            <div className="pools-celebs-preview-clouds pools-celebs-preview-clouds-top-2">
                <img src={`/assets/pools/celebs/clouds-top.png`} alt=""
                     className="pools-celebs-preview-clouds-1"/>
                <img src={`/assets/pools/celebs/clouds-top.png`} alt=""
                     className="pools-celebs-preview-clouds-2"/>
            </div>
            <div className="pools-celebs-preview-clouds pools-celebs-preview-clouds-top-3">
                <img src={`/assets/pools/celebs/clouds-top.png`} alt=""
                     className="pools-celebs-preview-clouds-1"/>
                <img src={`/assets/pools/celebs/clouds-top.png`} alt=""
                     className="pools-celebs-preview-clouds-2"/>
            </div>
            <div className="pools-celebs-preview-clouds pools-celebs-preview-clouds-top-4">
                <img src={`/assets/pools/celebs/clouds-top.png`} alt=""
                     className="pools-celebs-preview-clouds-1"/>
                <img src={`/assets/pools/celebs/clouds-top.png`} alt=""
                     className="pools-celebs-preview-clouds-2"/>
            </div>
            <div className="pools-celebs-preview-clouds pools-celebs-preview-clouds-top-5">
                <img src={`/assets/pools/celebs/clouds-top.png`} alt=""
                     className="pools-celebs-preview-clouds-1"/>
                <img src={`/assets/pools/celebs/clouds-top.png`} alt=""
                     className="pools-celebs-preview-clouds-2"/>
            </div>

            <img src={`/assets/pools/celebs/pools.png`} alt="" className="pools-celebs-preview-background"/>
            <div className={'pools-celebs-preview-pepe'}>
                <Pepe/>
            </div>
            <div className="pools-celebs-preview-10-games-pass-bg-1">
                <GlitchImage img={'pools/celebs/10-games-pass'} preset={5}/>
            </div>
            <div className="pools-celebs-preview-10-games-pass">
                <div className="pools-celebs-preview-10-games-pass-con">
                    <img src={`/assets/pools/celebs/10-games-pass.png`} alt=""
                         className="pools-celebs-preview-10-games-pass-img"/>
                    <img src={`/assets/pools/celebs/blick.png`} alt=""
                         className="pools-celebs-preview-10-games-pass-blick"/>
                    <img src={`/assets/pools/celebs/blick.png`} alt=""
                         className="pools-celebs-preview-10-games-pass-blick-2"/>
                </div>
            </div>
            <img src={`/assets/pools/celebs/${this.state.celebs[0]}.png`} alt=""
                 className={`pools-celebs-preview-celeb pools-celebs-preview-celeb-delayed-start-${Random.fresh().number(1, 10)} pools-celebs-preview-celeb-0 `}/>
            <img src={`/assets/pools/celebs/${this.state.celebs[1]}.png`} alt=""
                 className={`pools-celebs-preview-celeb pools-celebs-preview-celeb-delayed-start-${Random.fresh().number(1, 10)} pools-celebs-preview-celeb-1 `}/>
            <img src={`/assets/pools/celebs/${this.state.celebs[2]}.png`} alt=""
                 className={`pools-celebs-preview-celeb pools-celebs-preview-celeb-delayed-start-${Random.fresh().number(1, 10)} pools-celebs-preview-celeb-2 `}/>
            <img src={`/assets/pools/celebs/${this.state.celebs[3]}.png`} alt=""
                 className={`pools-celebs-preview-celeb pools-celebs-preview-celeb-delayed-start-${Random.fresh().number(1, 10)} pools-celebs-preview-celeb-3 `}/>
            <img src={`/assets/pools/celebs/${this.state.celebs[4]}.png`} alt=""
                 className={`pools-celebs-preview-celeb pools-celebs-preview-celeb-delayed-start-${Random.fresh().number(1, 10)} pools-celebs-preview-celeb-4 `}/>
            <img src={`/assets/pools/celebs/${this.state.celebs[5]}.png`} alt=""
                 className={`pools-celebs-preview-celeb pools-celebs-preview-celeb-delayed-start-${Random.fresh().number(1, 10)} pools-celebs-preview-celeb-5 `}/>
            <div className="pools-celebs-preview-clouds-middle">
                <img src={`/assets/pools/celebs/clouds-bottom.png`} alt=""
                     className="pools-celebs-preview-clouds-middle-1"/>
                <img src={`/assets/pools/celebs/clouds-bottom.png`} alt=""
                     className="pools-celebs-preview-clouds-middle-2"/>
            </div>
            <div className="pools-celebs-preview-clouds-bottom-1">
                <img src={`/assets/pools/celebs/clouds-bottom.png`} alt=""
                     className="pools-celebs-preview-clouds-bottom-1-1"/>
                <img src={`/assets/pools/celebs/clouds-bottom.png`} alt=""
                     className="pools-celebs-preview-clouds-bottom-1-2"/>
                <img src={`/assets/pools/celebs/clouds-bottom.png`} alt=""
                     className="pools-celebs-preview-clouds-bottom-1-3"/>
            </div>
            <div className="pools-celebs-preview-clouds-bottom-2">
                <img src={`/assets/pools/celebs/clouds-bottom.png`} alt=""
                     className="pools-celebs-preview-clouds-bottom-2-1"/>
                <img src={`/assets/pools/celebs/clouds-bottom.png`} alt=""
                     className="pools-celebs-preview-clouds-bottom-2-2"/>
                <img src={`/assets/pools/celebs/clouds-bottom.png`} alt=""
                     className="pools-celebs-preview-clouds-bottom-2-3"/>
                <img src={`/assets/pools/celebs/clouds-bottom.png`} alt=""
                     className="pools-celebs-preview-clouds-bottom-2-4"/>
            </div>
        </div>
    }
}
