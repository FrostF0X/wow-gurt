import React, {createRef} from "react";
import Hammer from "hammerjs";
import {Screen, Section} from "./Screens";
import "./Screen.scss";

export default class ScreenC extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.ref = createRef();
        this.End = createRef();
        this.Start = createRef();
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
            this.props.registerSwipe(this.Start.current, 'scroll', Hammer.DIRECTION_RIGHT);
            this.props.registerSwipe(this.End.current, 'scroll', Hammer.DIRECTION_LEFT);
        }
    }

    render() {
        return <div ref={this.ref} className="screen">
            <div className={"screen-content"}>
                {this.props.children}
                <div className="screen-controls screen-start" ref={this.Start}>
                    <img src={"assets/wow-art-galleries/separator.png"} alt=""/>
                </div>
                <div className="screen-controls screen-end" ref={this.End}>
                    <img src={"assets/wow-art-galleries/separator.png"} alt=""/>
                </div>
            </div>
        </div>
    }
}
