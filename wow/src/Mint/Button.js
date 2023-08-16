import {JustFrame} from "../JustFrame";
import React from "react";
import "./styles/Button.scss";

export default class Button extends React.Component {
    render() {
        return <div style={{margin: "10px", textTransform: "uppercase", ...this.props.style}}
                    className={"button-wrapper"}
                    onClick={this.props.onClick ? this.props.onClick : () => null}>
            {this.props.absolutes}
            <JustFrame
                style={{height: '100%'}}
                color={this.props.color}
            >
                {this.props.children}
            </JustFrame>
        </div>
    }
}
