import React, {createRef} from "react";
import "./Intro.scss";
import Gallery from "./Gallery";

export default class Intro extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.ref = createRef();
    }

    render() {
        return <div className={"intro"}>
            <div className="intro-description" ref={this.ref}>
                <img className={"intro-description-background"} src={"assets/wow-art-galleries/intro.png"} alt=""/>
            </div>
            <Gallery/>
        </div>;
    }
}
