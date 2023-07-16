import React, {createRef} from 'react';
import Just from "./Just";
import {JustFrame} from "./JustFrame";
import AnimationConfig from "./AnimationConfig";

export default class WowScroller extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {size: 512};
        this.ref = createRef();
        this.config = AnimationConfig.generate(this.props.seed);
        this.key = 0;
    }

    componentDidMount() {
        this.setState({size: Math.min(this.ref.current.offsetWidth * 0.9, this.ref.current.offsetHeight * 0.9)});
        this.listener = () => {
            this.setState({size: Math.min(this.ref.current.offsetWidth * 0.9, this.ref.current.offsetHeight * 0.9)});
        };
        window.addEventListener('resize', this.listener);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.listener);
    }

    render() {
        return <div className="just-preview">
            <div ref={this.ref} className="just-container">
                <JustFrame plain={true}>
                    <Just
                        key={this.state.seed}
                        dynamic={true}
                        config={this.config}
                        size={this.state.size}
                    />
                </JustFrame>
            </div>
        </div>;
    }
}
