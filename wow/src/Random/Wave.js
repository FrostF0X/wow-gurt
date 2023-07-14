import React, {createRef} from "react";
import "./styles/Wave.scss";
import Just from "../Just";

import Slow from "../Animation/Slow";
import Size from "../Animation/Size";

class Wave extends React.Component {

    randomItem;
    wave;
    waveContainer;
    transform;
    refCounter;
    timeCounter;

    constructor(props, context) {
        super(props, context);
        this.img = this.props.random.img().rand();
        this.randomItem = createRef();
        this.wave = createRef();
        this.waveContainer = createRef();
        this.preset = this.props.random.number(1, 3);
    }

    componentDidMount = () => {
        this.imgs = Array.from(this.wave.current.children);
        this.transform = 0;
        this.refCounter = 0;
        this.timeCounter = 0;
        Just.onStart(() => {
            this.animate();
            if (this.waveContainer.current.clientWidth > this.waveContainer.current.clientHeight) {
                this.waveContainer.current.classList.add('just-random-wave-container-horizontal');
            } else {
                this.waveContainer.current.classList.add('just-random-wave-container-vertical');
            }
        });
    }

    animate = () => {
        var fps = 30;
        setInterval(() => {
            this.imgs.forEach((d, i) => {
                let rad = 57.2958;
                this.transform = (Math.sin((i * 4 + this.refCounter * this.imgs.length * 2 / fps) * 360 / this.imgs.length / rad)) * Size.image() / 2;
                this.imgs[i].style.transform = `translateY(${this.transform}px)`;
            })

            this.refCounter = this.refCounter + 1;
        }, 1000 / fps * Slow.x());
    }

    render() {
        return <div ref={this.waveContainer} className={"just-random-wave-container"}>
            <div ref={this.wave} className={`just-random-wave just-random-wave-preset-${this.preset}`}>
                <img className={"just-random-wave-item-1"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-2"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-3"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-4"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-5"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-6"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-7"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-8"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-9"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-10"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-11"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-12"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-13"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-14"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-15"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-16"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-17"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-18"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-19"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-20"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-21"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-22"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-23"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-24"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-25"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-26"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-27"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-28"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-29"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-30"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-31"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-32"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-33"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-34"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-35"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-36"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-37"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-38"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-39"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-40"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-41"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-42"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-43"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-44"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-45"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-46"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-47"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-48"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-49"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-50"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-51"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-52"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-53"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-54"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-55"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-56"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-57"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-58"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-59"} src={this.img} alt=""/>
                <img className={"just-random-wave-item-60"} src={this.img} alt=""/>
            </div>
        </div>;
    }
}

export default Wave;
