import React from "react";
import "./Matrix.scss"
import Img from "../Img/Img";

export default class Matrix extends React.Component {
    render() {
        if (!this.props.config) {
            return;
        }
        return <div className="wow-cools-matrix">
            <div className="wow-cools-matrix-container">
                {Array.range(1, 128).map(_ => <div className={`wow-cools-matrix-line`}>
                        {Array.range(1, 128).map(_ =>
                            <img className={`wow-cools-matrix-asset`}
                                 src={Img.path(this.props.config.img)} alt=""/>
                        )}
                    </div>
                )}
                <div className="wow-cools-matrix-overlay">
                    {Array.range(1, 256).map(_ =>
                        <div className="wow-cools-matrix-overlay-line">
                            {Array.range(1, 256).map(_ => <div
                                className="wow-cools-matrix-overlay-cell"></div>)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    }
}
