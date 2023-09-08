import React, {createRef} from "react";
import "./Explainer.scss";
import Hammer from "hammerjs";

export default class Explainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.ref = createRef();
        this.explainerEnd = createRef();
        this.explainerStart = createRef();
    }

    componentDidMount() {
        this.props.sections([this.ref.current]);
        this.props.registerSwipe(this.explainerStart.current, 'scroll', Hammer.DIRECTION_RIGHT);
        this.props.registerSwipe(this.explainerEnd.current, 'scroll', Hammer.DIRECTION_LEFT);
    }

    render() {
        return <div className="explainer" ref={this.ref}>
            <img className={"explainer-background"} src={"assets/wow-art-galleries/fountain.png"} alt=""/>
            <div className="explainer-start" ref={this.explainerStart}>
            </div>
            <div className="explainer-end" ref={this.explainerEnd}>
            </div>
        </div>
    }
}
