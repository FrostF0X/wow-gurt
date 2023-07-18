import './styles/Just.scss';
import './styles/TextGlitch.scss';
import React, {createRef} from "react";
import Delay from "./Animation/Delay";
import Color from "./Animation/Color";
import Slow from "./Animation/Slow";
import Size from "./Animation/Size";
import WowReroller from "./WowReroller";

class Wow extends React.PureComponent {

    constructor(props) {
        super(props);
        this.ref = createRef();
        Slow.slow(this.props.slow ?? 1);
    }

    componentDidMount() {
        Size.size(this.props.size, this.ref.current);
        Delay.delay(this.props.config.delay, this.ref.current);
        Color.setColors(...this.props.config.colors, this.ref.current);
        Slow.slow2(this.ref.current);
    }

    render() {
        if (this.ref && this.ref.current) {
            Size.size(this.props.size, this.ref.current);
            Delay.delay(this.props.config.delay, this.ref.current);
            Color.setColors(...this.props.config.colors, this.ref.current);
            Slow.slow2(this.ref.current);
        }
        return (
            <div className={"just"} ref={this.ref}>
                <div className={"just-scene-grid"} style={{"--scene-size": `${this.props.size}px`}}>
                    {this.props.config.cells.map(c =>
                        <WowReroller division={c.division} config={c.config}
                                     configListener={this.modifyConfig(c)}></WowReroller>
                    )}
                </div>
            </div>
        );
    }

    modifyConfig(c) {
        return (newC) => {
            c.config = newC
        };
    }
}

export default Wow;
