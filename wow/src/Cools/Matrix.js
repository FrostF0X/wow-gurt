import React from "react";
import "./Matrix.scss"
import Img from "../Img/Img";

export default class Matrix extends React.Component {
    render() {
        if (!this.props.config) {
            return;
        }
        return <div className={`cools-overlay matrix matrix-level-${this.props.config.level}`}>
            <div className="matrix-container">
                <div className="matrix-overlay matrix-overlay-chess">
                    {Array.range(1, 256).map(_ =>
                        <div className="matrix-overlay-line">
                            {Array.range(1, 256).map(_ => <div
                                className="matrix-overlay-cell"></div>)}
                        </div>
                    )}
                </div>
                <div className="matrix-overlay matrix-overlay-img">
                    {Array.range(1, 128).map(_ => <div className={`matrix-line`}>
                            {Array.range(1, 128).map(_ =>
                                <img className={`matrix-asset`}
                                     src={Img.path(this.props.config.img)} alt=""/>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    }
}
