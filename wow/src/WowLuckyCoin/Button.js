import React from "react";
import "./Button.scss";

export default class Button extends React.Component {
    render() {
        return <div className={`wow-lucky-coin-button wow-lucky-coin-button-type-${this.props.type}`}>
            <div className="wow-lucky-coin-button-line"></div>
            <div className="wow-lucky-coin-button-content">
                {this.props.children}
            </div>
        </div>
    }
}
