import React, {createRef} from "react";
import "./styles/Wave.scss";
import Just from "../Just";

class Wave extends React.Component {

    randomItem;
    wave;
    waveContainer;
    transform;
    refCounter;
    timeCounter;

    constructor(props, context) {
        super(props, context);
        this.randomItem = createRef();
        this.wave = createRef();
        this.waveContainer = createRef();
    }

    componentDidMount = () => {
        this.imgs = Array.from(this.wave.current.children);
        this.transform = 0;
        this.refCounter = 0;
        this.timeCounter = 0;
        this.animate();
        Just.onStart(() => {
            if (this.waveContainer.current.clientWidth > this.waveContainer.current.clientHeight) {
                this.waveContainer.current.classList.add('just-random-wave-container-horizontal');
            } else {
                this.waveContainer.current.classList.add('just-random-wave-container-vertical');
            }
        });
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
        return <div ref={this.waveContainer} className={"just-random-wave-container"}>
            <div ref={this.wave} className={"just-random-wave"}>
                <img className={"just-random-wave-item-1"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-2"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-3"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-4"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-5"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-6"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-7"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-8"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-9"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-10"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-11"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-12"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-13"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-14"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-15"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-16"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-17"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-18"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-19"} src={this.props.img} alt=""/>
                <img className={"just-random-wave-item-20"} src={this.props.img} alt=""/>
            </div>
        </div>;
    }
}

export default Wave;
