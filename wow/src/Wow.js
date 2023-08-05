import './styles/Wow.scss';
import './styles/TextGlitch.scss';
import React, {createRef} from "react";
import Slow from "./Animation/Slow";
import WowBorders from "./WowBorders";
import WowReroller from "./WowReroller";
import Over from "./Cools/Over";
import Matrix from "./Cools/Matrix";
import {Cools} from "./Cools/Cools";
import Img from "./Img/Img";

class Wow extends React.PureComponent {

    constructor(props) {
        super(props);
        this.ref = createRef();
        Slow.slow(this.props.slow ?? 1);
        this.state = {cools: this.props.cools ?? Cools.none()};
        console.log(this.props.cools);
        Img.applyStyleConfig(this.props.cools.style.style);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={"wow"} style={{
                "--wow-size": `${this.props.size}px`,
                "--chess-color-1": this.props.config.colors[0],
                "--chess-color-2": this.props.config.colors[1],
                "--animation-delay-multiplier": this.props.config.delay,
                '--animation-length': `${2000 * (this.props.slow ?? 1)}ms`,
                '--image-style': this.state.cools.style
            }}>
                <WowBorders config={this.state.cools.borders} size={this.props.size}>
                    <Matrix config={this.state.cools.matrix}/>
                    {this.state.cools.over ?
                        <Over config={this.state.cools.over}/> : null}
                    {this.props.config.cells.map(c =>
                        <WowReroller division={c.division} config={c.config}
                                     configListener={this.modifyConfig(c)}></WowReroller>
                    )}
                </WowBorders>
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
