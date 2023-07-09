import React, {createRef} from "react";
import {JustFrame} from "../JustFrame";
import "./styles/Window.scss";
import GlitchImage from "../GlitchImage";
import Random from "../Random";

class RandomWindow extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.randomItem = createRef();
        this.img = `/0${Random.get().number(4, 9)}-trans.png`;
    }

    componentDidMount = () => {
        this.random();
    }

    random() {
        let width = Random.get().number(8, 12);
        this.randomItem.current.style.left = Random.get().number(0, 100) + '%';
        this.randomItem.current.style.top = Random.get().number(0, 100) + '%';
        this.randomItem.current.style.width = width + 'vh';
        this.randomItem.current.style.height = width + 'vh';
    }

    render() {
        return <div ref={this.randomItem} className={"just-random-window"}>
            <JustFrame plain={true}><GlitchImage/></JustFrame>
        </div>;
    }
}

export default RandomWindow;
