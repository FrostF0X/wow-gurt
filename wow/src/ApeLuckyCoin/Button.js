import React from "react";
import "./Button.scss";

export default class Button extends React.Component {
    render() {
        return <div className={"ape-lucky-coin-button"}>
            <div className="ape-lucky-coin-button-line"></div>
            <div className="ape-lucky-coin-button-content">
                {this.props.children}
            </div>
        </div>
    }
}
