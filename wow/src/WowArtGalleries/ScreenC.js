import React, {createRef} from "react";
import Hammer from "hammerjs";
import {Screen, Section} from "./Screens";
import "./Screen.scss";
import EventQ from "../Common/EventQ";


export const ScreenContext = React.createContext({
    timeline: new EventQ()
});
export default class ScreenC extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.ref = createRef();
        this.end = createRef();
        this.start = createRef();
        this.content = createRef();
        this.timeline = new EventQ();
    }

    componentDidMount() {
        if (this.props.type === 'sections') {
            this.props.activeScreens.add(new Screen(
                [...this.ref.current.querySelectorAll('[data-section-id]')].map(i => new Section(i)),
                this.ref.current)
            );
            this.props.registerSwipe(this.ref.current, 'sections', Hammer.DIRECTION_HORIZONTAL);
        } else {
            this.props.activeScreens.add(new Screen([new Section(this.ref.current)], this.ref.current));
            this.props.registerSwipe(this.start.current, 'scroll', Hammer.DIRECTION_RIGHT);
            this.props.registerSwipe(this.end.current, 'scroll', Hammer.DIRECTION_LEFT);
        }
    }

    onScroll = () => {
        this.timeline.emmit(this.ref.current.scrollLeft / (this.content.current.offsetWidth));
    };

    render() {
        return <ScreenContext.Provider value={{timeline: this.timeline}}>
            <div ref={this.ref} className="screen" onScroll={this.onScroll}>
                <div className={"screen-content"} ref={this.content}>
                    {this.props.children}
                    <div className="screen-controls screen-start" ref={this.start}>
                        <img src={"assets/wow-art-galleries/separator.png"} alt=""/>
                    </div>
                    <div className="screen-controls screen-end" ref={this.end}>
                        <img src={"assets/wow-art-galleries/separator.png"} alt=""/>
                    </div>
                </div>
            </div>
        </ScreenContext.Provider>
    }
}
