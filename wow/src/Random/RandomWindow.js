import React, {createRef} from "react";
import {JustFrame} from "../JustFrame";
import "./styles/Window.scss";

class RandomWindow extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.randomItem = createRef();
        this.img = `/0${Number.random(4, 9)}-trans.png`;
    }

    componentDidMount = () => {
        this.random();
        setInterval(() => {
            this.random();
        }, 1000);
    }

    random() {
        let width = Number.random(15, 25);
        this.randomItem.current.style.left = Number.random(0, 100) + '%';
        this.randomItem.current.style.top = Number.random(0, 100) + '%';
        this.randomItem.current.style.width = width + 'vh';
        this.randomItem.current.style.height = width + 'vh';
    }

    render() {
        return <div ref={this.randomItem} className={"just-random-window"}>
            <JustFrame><img className={"just-random-window-image"}
                            src={this.img} alt="fast_1_512"/></JustFrame>
        </div>;
    }
}

export default RandomWindow;
