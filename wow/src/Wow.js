import './styles/Wow.scss';
import './styles/TextGlitch.scss';
import React, {createRef} from "react";
import Slow from "./Animation/Slow";
import WowBorders, {WowBordersPreset} from "./WowBorders";
import Random from "./Random";
import Cools from "./Random/Cools";
import WowReroller from "./WowReroller";

class Wow extends React.PureComponent {

    constructor(props) {
        super(props);
        this.ref = createRef();
        Slow.slow(this.props.slow ?? 1);
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
            }}>
                <WowBorders preset={Random.fresh(Cools.generate()).number(1, WowBordersPreset.all().length)}
                            size={this.props.size}
                            img={Random.fresh(Cools.generate()).img().rand()}>

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
