import React from "react";
import "./Art.scss";
import Random from "../../Random";

export default class Art extends React.Component {


    render() {
        return <div className="art-scene">
            <div className={"art-scene-art-blur-back"}>
                <div>
                    <img src={`assets/wow-art-galleries/nft/resized/${this.props.image}_blur_ultra.avif`} alt=""/>
                </div>
            </div>
            {/*<div className={"art-scene-art-blur-closest"}>*/}
            {/*    <div>*/}
            {/*        <img src={`assets/wow-art-galleries/nft/resized/${this.props.image}_blur_fade.avif`} alt=""/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={"art-scene-art"}>
                <div>
                    <img src={`assets/wow-art-galleries/nft/resized/${this.props.image}.avif`} alt=""/>
                </div>
            </div>
            <div className={"art-scene-frame"}>
                <img src={`assets/wow-art-galleries/frames/1.png`} alt=""/>
            </div>
        </div>

    }
}
