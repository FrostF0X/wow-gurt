import React, {createRef} from "react";
import "./Fountain.scss";

export default class Fountain extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.ref = createRef();
    }

    render() {
        return <div className="fountain" ref={this.ref}>
            <img className={"fountain-background"} src={"assets/wow-art-galleries/fountain.png"} alt=""/>
        </div>;
    }
}
