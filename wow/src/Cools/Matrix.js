import React from "react";
import "./Matrix.scss"
import RotatingImg from "../Img/RotatingImg";

export default class Matrix extends React.Component {
    render() {
        let MAX_OFFSET = 64;
        let MAX_ASSETS = 30;
        return <div className="wow-cools-matrix">
            <div className="wow-cools-matrix-container">
                {Array.range(1, Number.random(20, 30)).map(_ => <div
                    className={`wow-cools-matrix-line wow-cools-matrix-animation-delay-${Number.random(1, MAX_OFFSET)} wow-cools-matrix-line-offset-${Number.random(1, MAX_OFFSET)} wow-cools-matrix-line-offset-top-${Number.random(1, MAX_OFFSET)}`}>
                    {Array.range(1, Number.random(10, MAX_ASSETS)).map(_ => <RotatingImg
                        delay={Number.random(1, 6)}/>)}
                </div>)
                }
            </div>
        </div>
    }
}
