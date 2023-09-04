import React, {createRef} from "react";
import './styles/JustFrame.scss';

export class JustFrame extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.class = this.props.plain ? 'just-random-frame-plain' : '';
        this.class += ` just-random-frame-colors-${this.props.color ?? 'pink'}`;
        this.class += ` ${this.props.click || this.props.clickable ? 'just-random-frame-clickable' : ''}`;
        this.ref = createRef();
        this.minimized = false;
    }

    idk = () => {
        this.ref.current.classList.add('just-random-frame-buzz');
        setTimeout(() => this.ref.current?.classList.remove('just-random-frame-buzz'), 200);
    }

    minimize = () => {
        if (this.minimized) {
            this.ref.current.classList.remove('just-random-frame-hide');
            this.minimized = false;
        } else {
            this.ref.current.classList.add('just-random-frame-hide');
            this.minimized = true;
        }
    };

    render() {
        return (
            <div ref={this.ref} className={`just-random-frame ${this.props.class} ${this.class} `}>
                <div className={"just-random-frame-toolbar"}>
                    <span
                        className={`just-random-frame-toolbar-text ${this.props.text ? 'just-random-frame-toolbar-text-active' : ''}`}>{this.props.text}</span>
                    <div className={"just-random-frame-toolbar-item just-random-frame-toolbar-minimize"}
                         onClick={this.props.minimize ?? this.minimize}>
                        <span className={"just-random-frame-toolbar-minimize-1"}></span>
                    </div>
                    <div className={"just-random-frame-toolbar-item just-random-frame-toolbar-expand"}
                         onClick={this.props.expand ?? this.idk}>
                        <span className={"just-random-frame-toolbar-expand-1"}></span>
                        <span className={"just-random-frame-toolbar-expand-2"}></span>
                    </div>
                    <div className={"just-random-frame-toolbar-item just-random-frame-toolbar-close"}
                         onClick={this.props.close ?? this.idk}>
                        <span className={"just-random-frame-toolbar-close-1"}></span>
                        <span className={"just-random-frame-toolbar-close-2"}></span>
                    </div>
                </div>
                <div className="just-random-frame-content" style={this.props.style}
                     onClick={this.props.click ?? this.idk}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
