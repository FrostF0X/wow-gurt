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
        this.setState({size: Math.min(this.ref.current.offsetWidth, this.ref.current.offsetHeight)});
        this.listener = () => {
            this.setState({size: Math.min(this.ref.current.offsetWidth, this.ref.current.offsetHeight)});
        };
        window.addEventListener('resize', this.listener);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.listener);
    }

    render() {
        return <div ref={this.ref} className="just-preview">
            <div className={'pointer-wow-container pointer-wow-tile-container'}>
                <img src="/pointer-hand.png" alt="pointer"
                     className={"pointer-wow"}/>
                <div className="pointer-text">
                    <h3>Click HERE!</h3>
                    <span className="text-note">To reroll tiles</span>
                </div>
            </div>
            <div className="just-container">
                <JustFrame plain={true}
                           text={<span><span className={"text-highlight"}>Click HERE!</span> to reroll tiles</span>}>
                    <Wow
                        dynamic={true}
                        config={this.props.config}
                        size={this.state.size}
                    />
                </JustFrame>
            </div>
        </div>;
    }
}
