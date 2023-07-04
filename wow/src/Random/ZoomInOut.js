import React, {createRef} from "react";
import "./styles/ZoomInOut.scss";

class ZoomInOut extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.randomItem = createRef();
        this.bounce = createRef();
    }

    componentDidMount = () => {
        this.imgs = Array.from(this.bounce.current.children);
        console.log(this.imgs);
        this.transform = 0;
        this.refCounter = 0;
        this.timeCounter = 0;
        this.animate();
    }

    animate = () => {
        var fps = 30;

        setTimeout(() => {
            requestAnimationFrame(this.animate);

            this.imgs.forEach((d, i) => {
                this.transform = (Math.sin((i + this.refCounter) / 2)) * 50;

                this.imgs[i].style.transform = `translateY(${this.transform}px)`;
            })

            this.refCounter = this.refCounter + 1;

            this.timeCounter = this.timeCounter + 1;
        }, 1000 / fps);
    }

    render() {
        return <div ref={this.bounce} className={"just-bounce"}>
            <img className={"bounce-item-1"} src={this.props.img} alt=""/>
            <img className={"bounce-item-2"} src={this.props.img} alt=""/>
            <img className={"bounce-item-3"} src={this.props.img} alt=""/>
            <img className={"bounce-item-4"} src={this.props.img} alt=""/>
            <img className={"bounce-item-5"} src={this.props.img} alt=""/>
            <img className={"bounce-item-6"} src={this.props.img} alt=""/>
            <img className={"bounce-item-7"} src={this.props.img} alt=""/>
            <img className={"bounce-item-8"} src={this.props.img} alt=""/>
            <img className={"bounce-item-9"} src={this.props.img} alt=""/>
            <img className={"bounce-item-10"} src={this.props.img} alt=""/>
        </div>;
    }
}

export default ZoomInOut;
