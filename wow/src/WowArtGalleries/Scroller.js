import React, {createRef} from "react";
import Gallery from "./Gallery";
import {gsap} from "gsap";
import Hammer from "hammerjs";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import {Observer} from "gsap/Observer";
import "./Scroller.scss";
import {ActiveScreens} from "./Screens";
import 'pepjs';
import ScreenC from "./ScreenC";
import Intro from "./Intro";
import Window from "./Globals/Window";

export default class Scroller extends React.Component {
    constructor(props) {
        super(props);
        this.queue = new AnimationQueue();
        this.screens = new ActiveScreens();
        this.scroller = createRef();
    }

    componentDidMount = () => {
        gsap.to(window, {ease: "none", duration: 0.2, scrollTo: {x: 0, y: 0}});
        gsap.registerPlugin(Observer, ScrollToPlugin);
    };

    registerSwipe = (scene, sceneType, direction) => {
        let manager, Swipe;
        if (sceneType === 'sections') {
            manager = new Hammer.Manager(scene);
            Swipe = new Hammer.Swipe({direction: direction});
        } else {
            manager = new Hammer.Manager(scene, {inputClass: Hammer.TouchInput, touchAction: 'auto'});
            Swipe = new Hammer.Swipe({direction: direction});
        }
        manager.add(Swipe);
        manager.on('swipe', (e) => {
            const width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;
            const percentsDelta = e.deltaX * 100 / width;
            if (Math.abs(percentsDelta) > 2) {
                percentsDelta > 0 ? this.left1() : this.right1();
            }
        });
    };
    left1 = () => {
        this.queue.push([
            () => this.scroll(0.25, LEFT),
        ]);
    }
    right1 = () => {
        this.queue.push([
            () => this.scroll(0.25, RIGHT),
        ]);
    }
    scroll = async (time = 0.35, direction) => {
        const section = this.screens.moveSection(direction);
        if (section) {
            return await new Promise((res) => {
                    console.log(section.reference.offsetLeft);
                    this.screens.getActiveScreen().content.style.setProperty('--slide-time', '250ms');
                    this.screens.getActiveScreen().content.style.setProperty('--slide-to', `-${section.reference.offsetLeft - Window.width() / 2}px`);
                    this.screens.getActiveScreen().content.classList.add('screen-content-slide');
                    setTimeout(res, 250);
                }
            );
        }
        const screen = this.screens.moveScreen(direction);
        if (screen) {
            return await new Promise((res) => {
                    gsap.to(this.scroller.current, {duration: time, scrollTo: screen.reference})
                        .eventCallback('onComplete', res)
                }
            );
        }
    }
    next = () => {
        this.right1();
    }
    prev = () => {
        this.left1();
    }

    render() {
        return <div className="scroll-container" ref={this.scroller}>
            <div className={"scroller"}>
                <ScreenC type={'autoscroll'}
                         activeScreens={this.screens}
                         registerSwipe={this.registerSwipe}>
                    <Intro></Intro>
                </ScreenC>
                {/*<ScreenC type={'scroll'}*/}
                {/*         activeScreens={this.screens}*/}
                {/*         registerSwipe={this.registerSwipe}>*/}
                {/*    <Fountain/>*/}
                {/*</ScreenC>*/}
                <ScreenC type={'sections'}
                         activeScreens={this.screens}
                         registerSwipe={this.registerSwipe}>
                    <Gallery/>
                </ScreenC>
                <ScreenC type={'sections'}
                         activeScreens={this.screens}
                         registerSwipe={this.registerSwipe}>
                    <Gallery/>
                </ScreenC>
            </div>
        </div>
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
