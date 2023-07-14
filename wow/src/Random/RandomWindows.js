import React from "react";
import RandomWindow from "./RandomWindow";
import "./styles/Windows.scss";
import Img from "../Animation/Img";

export default class RandomWindows extends React.Component {

    static imgs = null;

    constructor(props, context) {
        super(props, context);
        this.cols = this.props.division.endCol - this.props.division.startCol + 1;
        this.rows = this.props.division.endRow - this.props.division.startRow + 1;
        this.size = Math.round(3 + this.cols * this.rows);
        if (!RandomWindows.imgs) {
            RandomWindows.imgs = Img.randx(3);
        }
    }

    render() {
        return <div className={"just-random-windows"}>
            {Array.range(0, this.size).map(() => <RandomWindow imgs={RandomWindows.imgs}/>)}
        </div>
    }
}
