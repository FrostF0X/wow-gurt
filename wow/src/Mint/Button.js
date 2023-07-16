import {JustFrame} from "../JustFrame";
import React from "react";

export default class Button extends React.Component {
    render() {
        return <div style={{margin: "10px", textTransform: "uppercase", ...this.props.style}}>
            <JustFrame style={{backgroundColor: "#FE2AAA", height: '100%'}}>
                {this.props.children}
            </JustFrame>
        </div>
    }
}
