import "./Test.scss";
import React from "react";
import GlitchImage from "../GlitchImage";
import {gsap} from "gsap";
import {Observer} from "gsap/Observer";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import Hammer from "hammerjs";

export default class Test extends React.Component {
    sections = [];
    scrolling = false;
    current = 1;

    constructor(props) {
        super(props);
        this.queue = new AnimationQueue();
    }

    componentDidMount = () => {
        gsap.to(window, {ease: "none", duration: 0.1, scrollTo: {x: 0, y: 0}});
        gsap.registerPlugin(Observer, ScrollToPlugin);
        const square = document.querySelector('#root');

        const manager = new Hammer.Manager(square);
        const Swipe = new Hammer.Swipe({direction: Hammer.DIRECTION_HORIZONTAL});
        manager.add(Swipe);

        manager.on('swipe', (e) => {
            console.log(e.deltaX)
            if (Math.abs(e.deltaX) > 700) {
                e.deltaX > 0 ? this.left3() : this.right3();
            } else if (Math.abs(e.deltaX) > 200) {
                e.deltaX > 0 ? this.left2() : this.right2();
            } else if (Math.abs(e.deltaX) > 5) {
                e.deltaX > 0 ? this.left1() : this.right1();
            }
        });
    };

    left3 = () => {
        this.queue.push([
            () => this.scroll(0.15, LEFT),
            () => this.scroll(0.20, LEFT),
            () => this.scroll(0.35, LEFT),
        ]);
        this.current -= 3;
    }
    left2 = () => {
        this.queue.push([
            () => this.scroll(0.20, LEFT),
            () => this.scroll(0.35, LEFT),
        ]);
    }
    left1 = () => {
        this.queue.push([
            () => this.scroll(0.15, LEFT),
        ]);
    }

    right2 = () => {
        this.queue.push([
            () => this.scroll(0.20, RIGHT),
            () => this.scroll(0.35, RIGHT),
        ]);
    }

    right1 = () => {
        this.queue.push([
            () => this.scroll(0.15, RIGHT),
        ]);
    }
    right3 = () => {
        this.queue.push([
            () => this.scroll(0.15, RIGHT),
            () => this.scroll(0.20, RIGHT),
            () => this.scroll(0.35, RIGHT),
        ]);
    }

    scroll = async (time = 0.35, direction) => {
        if (direction === 'left') {
            --this.current;
        } else {
            ++this.current;
        }
        if (this.current > 7) {
            this.current = 7;
            return;
        }
        if (this.current < 1) {
            this.current = 1;
            return;
        }
        await new Promise((res) =>
            gsap
                .to(window, {duration: time, scrollTo: `#section${this.current}`})
                .eventCallback('onComplete', res)
        );
    }


    addSection = (ref) => {
        this.sections.push(ref);
    }

    render() {
        return <div className="wow-art-test">
            <div className="wow-art-test-background">
                <GlitchImage img={`wow-art-galleries/mobile`} preset={'hue'}/>
            </div>
            {Array.range(1, 7).map(i =>
                <div id={`section${i}`} className="wow-art-test-section" ref={this.addSection} data-section-id={i}/>)}
        </div>
    }

    deduplicate(event) {
        if (this.event?.deltaX !== event.deltaX || this.event?.deltaY !== event.deltaY) {
            this.event = {deltaX: event.deltaX, deltaY: event.deltaY};
            console.log(this.event);
            return false;
        }
        return true;
    }
}
export const LEFT = 'left';
export const RIGHT = 'right';

export class AnimationQueue {
    queue = [];

    push = animations => {
        this.queue = [...this.queue, ...animations];
        this.process();
    };

    process = async () => {
        if (this.processing) {
            return;
        }
        this.processing = true;
        while (this.queue.length > 0) {
            const ani = this.queue.shift();
            await ani();
        }
        this.processing = false;
    };
}
