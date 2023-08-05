import React from "react";
import "./Bounce.scss"
import {JustFrame} from "../JustFrame";
import Img from "../Img/Img";

export default class Bounce extends React.Component {
    render() {
        return <div className="wow-cools-bounce">
            <div className="wow-cools-bounce-container">
                <div className={"wow-cools-bounce-asset-container-5"}>
                    <JustFrame>
                        <img className={"wow-cools-bounce-asset"} src={Img.path(this.props.img)} alt={""}/>
                    </JustFrame>
                </div>
            </div>
        </div>
    }
}
