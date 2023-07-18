import React from "react";
import './styles/JustFrame.scss';

export class JustFrame extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.class = this.props.plain ? 'just-random-frame-plain' : '';
    }

    render() {
        return (
            <div className={"just-random-frame " + this.class}>
                <div className={"just-random-frame-toolbar"}>
                    <span
                        className={`just-random-frame-toolbar-text ${this.props.text ? 'just-random-frame-toolbar-text-active' : ''}`}>{this.props.text}</span>
                    <div className={"just-random-frame-toolbar-item just-random-frame-toolbar-minimize"}>
                        <span className={"just-random-frame-toolbar-minimize-1"}></span>
                    </div>
                    <div className={"just-random-frame-toolbar-item just-random-frame-toolbar-expand"}>
                        <span className={"just-random-frame-toolbar-expand-1"}></span>
                        <span className={"just-random-frame-toolbar-expand-2"}></span>
                    </div>
                    <div className={"just-random-frame-toolbar-item just-random-frame-toolbar-close"}>
                        <span className={"just-random-frame-toolbar-close-1"}></span>
                        <span className={"just-random-frame-toolbar-close-2"}></span>
                    </div>
                </div>
                <div className="just-random-frame-content" style={this.props.style}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
