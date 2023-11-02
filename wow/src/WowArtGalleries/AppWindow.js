import React from "react";
import {JustFrame} from "../JustFrame";

export default class AppWindow extends React.Component {
    render() {
        return React.createElement(JustFrame, {color: "marble", ...this.props});
    }
}
