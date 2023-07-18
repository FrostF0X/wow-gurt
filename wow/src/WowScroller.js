import React, {createRef} from 'react';
import Wow from "./Wow";
import {JustFrame} from "./JustFrame";

export default class WowScroller extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {size: 512};
        this.ref = createRef();
        this.key = 0;
    }

    componentDidMount() {
        this.setState({size: Math.min(this.ref.current.offsetWidth * 0.85, this.ref.current.offsetHeight * 0.85)});
        this.listener = () => {
            this.setState({size: Math.min(this.ref.current.offsetWidth * 0.85, this.ref.current.offsetHeight * 0.85)});
        };
        window.addEventListener('resize', this.listener);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.listener);
    }

    render() {
        return <div ref={this.ref} className="just-preview">
            <div className="just-container">
                <JustFrame plain={true}>
                    <Wow
                        key={this.state.seed}
                        dynamic={true}
                        config={this.props.config}
                        size={this.state.size}
                    />
                </JustFrame>
            </div>
        </div>;
    }
}
