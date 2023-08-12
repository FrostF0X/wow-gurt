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
                class={`just-random-frame-background-${this.props.color ? this.props.color : 'pink'}`}
            >
                {this.props.children}
            </JustFrame>
        </div>
    }
}
