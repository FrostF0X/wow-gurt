import React from "react";
import "./PoolsCelebsPreview.scss";
import Random from "../Random";

export default class PoolsCelebsPreview extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.celebs = [
            'based-fellas-1',
            'based-fellas-2',
            'based-fellas-3',
            'nounimals-1',
            'nounimals-2',
            'nounimals-3',
            'tripster-walley-1',
            'tripster-walley-2',
            'tripster-walley-3',
        ];
        this.state = {celebs: Random.fresh().randomItems(this.celebs, 6)};
    }

    componentDidMount() {
        this.setState({celebs: Random.fresh().randomItems(this.celebs, 6)});
    }

    render() {
        return <div className={`pools-celebs-preview`}>
            <img src={`/assets/pools/celebs/background.png`} alt="" className="pools-celebs-preview-background"/>
            <img src={`/assets/pools/celebs/pools.png`} alt="" className="pools-celebs-preview-background"/>
            <img src={`/assets/pools/celebs/pepe.png`} alt="" className="pools-celebs-preview-pepe"/>
            <img src={`/assets/pools/celebs/${this.state.celebs[0]}.png`} alt=""
                 className="pools-celebs-preview-celeb pools-celebs-preview-celeb-0"/>
            <img src={`/assets/pools/celebs/${this.state.celebs[1]}.png`} alt=""
                 className="pools-celebs-preview-celeb pools-celebs-preview-celeb-1"/>
            <img src={`/assets/pools/celebs/${this.state.celebs[2]}.png`} alt=""
                 className="pools-celebs-preview-celeb pools-celebs-preview-celeb-2"/>
            <img src={`/assets/pools/celebs/${this.state.celebs[3]}.png`} alt=""
                 className="pools-celebs-preview-celeb pools-celebs-preview-celeb-3"/>
            <img src={`/assets/pools/celebs/${this.state.celebs[4]}.png`} alt=""
                 className="pools-celebs-preview-celeb pools-celebs-preview-celeb-4"/>
            <img src={`/assets/pools/celebs/${this.state.celebs[5]}.png`} alt=""
                 className="pools-celebs-preview-celeb pools-celebs-preview-celeb-5"/>
        </div>
    }
}
