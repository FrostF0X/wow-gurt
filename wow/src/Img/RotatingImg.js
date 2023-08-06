import Img from "./Img";
import React from "react";
import "./RotatingImg.scss";

export default class RotatingImg extends React.Component {
    render() {
        return <div className="rotating-imgs">
            {Img.all().map((i, key) =>
                <img className={`rotating-img rotating-img-delay-${(key + this.props.delay) % 6 + 1}`} src={Img.path(i)}
                     alt=""/>
            )}
        </div>

    }
}
