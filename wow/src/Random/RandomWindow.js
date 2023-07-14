import React, {createRef} from "react";
import {JustFrame} from "../JustFrame";
import "./styles/Window.scss";
import GlitchImage from "../GlitchImage";

class RandomWindow extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.randomItem = createRef();
        this.img = this.props.random.randomItem(this.props.imgs);
    }

    componentDidMount = () => {
        this.random();
    }

    random() {
        let width = this.props.random.number(80, 120) / 100;
        this.randomItem.current.style.left = this.props.random.number(0, 100) + '%';
        this.randomItem.current.style.top = this.props.random.number(0, 100) + '%';
        this.randomItem.current.style.width = `var(--image-size * ${width})`;
        this.randomItem.current.style.height = `var(--image-size * ${width})`;
    }

    render() {
        return <div ref={this.randomItem} className={"just-random-window"}>
            <JustFrame plain={true}><GlitchImage img={this.img}/></JustFrame>
        </div>;
    }
}

export default RandomWindow;
