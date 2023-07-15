import {JustFrame} from "../JustFrame";
import React from "react";

export default class Button extends React.Component {
    render() {
        return <div style={{margin: "1em", textTransform: "uppercase", ...this.props.style}}>
            <JustFrame style={{backgroundColor:"#FE2AAA"}}>
                {this.props.children}
            </JustFrame>
        </div>
    }
}
