import React, {createRef} from 'react';
import "./Resize.scss";

export default class Resizer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {size: 10000};
        this.ref = createRef();
    }

    componentDidMount() {
        this.setState({size: Math.min(this.ref.current.offsetWidth, this.ref.current.offsetHeight)});
        this.listener = () => {
            this.setState({
                    size: Math.min(this.ref.current.offsetWidth, this.ref.current.offsetHeight)
                }
            );
        };
        window.addEventListener('resize', this.listener);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.listener);
    }

    render() {
        return <div ref={this.ref} className="equal-size" style={{
            '--resizer-equal-size': `${this.state.size}px`
        }}>
            <div className="equal-size-c">
                {this.props.children}
            </div>
        </div>
    }
}
