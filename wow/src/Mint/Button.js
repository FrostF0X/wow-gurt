import {JustFrame} from "../JustFrame";
import React from "react";
import "./styles/Button.scss";

export default class Button extends React.Component {
    render() {
        return <div style={{margin: "10px", textTransform: "uppercase", ...this.props.style}}
                    className={"button-wrapper"}
                    onClick={this.props.onClick ? this.props.onClick : () => null}>
            {this.props.absolutes}
            <JustFrame style={{backgroundColor: this.props.color ? this.props.color : "#FE2AAA", height: '100%'}}>
                {this.props.children}
            </JustFrame>
        </div>
    }
}
