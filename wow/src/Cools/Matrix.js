import React from "react";
import "./Matrix.scss"
import Img from "../Img/Img";

export default class Matrix extends React.Component {
    render() {
        if (!this.props.config) {
            return;
        }
        const imgPath = this.props.config.level === 1 ? Img.path(`overlay/background-chess`) : Img.path(`overlay/background-chess-wow`);
        return <div className={`cools-overlay matrix matrix-level-${this.props.config.level}`}>
            <div className="matrix-container">
                <img className="matrix-overlay-img" src={imgPath} alt=""/>
            </div>
        </div>
    }
}
