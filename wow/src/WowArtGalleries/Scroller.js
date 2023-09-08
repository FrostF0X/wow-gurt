import React, {createRef} from "react";
import Gallery from "./Gallery";
import {gsap} from "gsap";
import Hammer from "hammerjs";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import {Observer} from "gsap/Observer";
import "./Scroller.scss";
import Screens, {Screen, Section} from "./Screens";
import Explainer from "./Explainer";
import 'pepjs';
export default class Scroller extends React.Component {
    constructor(props) {
        super(props);
        this.queue = new AnimationQueue();
        this.screenSections = [];
        this.screenRefs = []
        this.scroller = createRef();
    }

    addScreenSections = (sections) => {
        this.screenSections.push(sections);
    }
    addScreenRef = (ref) => {
        this.screenRefs.push(ref);
    }

    componentDidMount = () => {
        console.log(this.screenRefs.map((ref, i) => new Screen(this.screenSections[i].map(s => new Section(s)), ref)));
        this.screens = new Screens(this.screenRefs.map((ref, i) => new Screen(this.screenSections[i].map(s => new Section(s)), ref)));
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
            () => this.scroll(0.15, LEFT),
        ]);
    }
    right1 = () => {
        this.queue.push([
            () => this.scroll(0.15, RIGHT),
        ]);
    }
    scroll = async (time = 0.35, direction) => {
        const section = this.screens.moveSection(direction);
        if (section) {
            return await new Promise((res) =>
                gsap
                    .to(this.screens.activeScreen.reference, {duration: time, scrollTo: section.reference})
                    .eventCallback('onComplete', res)
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
                <div ref={this.addScreenRef} className="screen"><Explainer sections={this.addScreenSections}
                                                                           registerSwipe={this.registerSwipe}/>
                </div>
                <div ref={this.addScreenRef} className="screen"><Gallery sections={this.addScreenSections}
                                                                         registerSwipe={this.registerSwipe}/>
                </div>
                <div ref={this.addScreenRef} className="screen"><Explainer sections={this.addScreenSections}
                                                                           registerSwipe={this.registerSwipe}/>
                </div>
                <div ref={this.addScreenRef} className="screen"><Gallery sections={this.addScreenSections}
                                                                         registerSwipe={this.registerSwipe}/>
                </div>
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
