import React, {createRef} from "react";
import "./styles/Wave.scss";
import GlitchImage from "../GlitchImage";
import Slow from "../Animation/Slow";

class Wave extends React.Component {

    randomItem;
    wave;
    waveContainer;
    transform;
    refCounter;
    timeCounter;
    length;

    constructor(props, context) {
        super(props, context);
        this.img = this.props.img;
        this.preset = this.props.preset;
        this.direction = this.props.direction;
        this.fps = 30;
        this.length = 60;
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
        this.imgs.forEach((d, i) => {
            this.extracted(i);
            this.imgs[i].style.transform = `translateY(${this.transform}px) scaleX(-1)`;
        });
    }

    extracted(i) {
        let rad = 57.2958;
        const translate = (Math.sin((-(i * 4) + this.refCounter * this.length * 2 / this.fps) * 360 / this.length / rad)) / 2;
        return `translateY(calc(${translate} * var(--image-size))) scaleX(-1)`;
    }

    animate = () => {
        this.interval = setInterval(() => {
            this.imgs.forEach((d, i) => {
                this.imgs[i].style.transform = this.extracted(i);
            })
            this.refCounter = this.refCounter + 1;
        }, 1000 / this.fps * Slow.x());
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <div ref={this.waveContainer}
                    className={`just-random-wave-container just-random-wave-container-${this.direction}`}>
            <div ref={this.wave}
                 className={`just-random-wave just-random-wave-preset-${this.preset}`}>
                {Array.range(1, 60).map(i =>
                    <GlitchImage class={`just-random-wave-item just-random-wave-item-${i}`}
                                 key={i}
                                 type={'wow'}
                                 style={{transform: this.extracted(i)}}
                                 img={this.img}/>
                )}
            </div>
        </div>;
    }
}

export default Wave;
