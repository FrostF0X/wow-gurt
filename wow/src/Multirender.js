import './styles/MultiRender.scss';
import React from "react";
import Wow from "./Wow";
import AnimationConfig from "./AnimationConfig";
import {Cools, MatrixConfig} from "./Cools/Cools";

function query() {
    return new URLSearchParams(document.location.search);
}

export class Multirender extends React.Component {
    constructor(props) {
        super(props);
        this.size = 700;
        let seed = Number.random(1, 10000);
        this.state = {
            config: AnimationConfig.generate(String(seed)),
            cools: Cools.glitch(String(seed), 1, parseInt(query().get('level') ?? 4)),
            coolsNoMatrix: this.configNoMatrix(Cools.glitch(String(seed), 1, parseInt(query().get('level') ?? 4)))
        };
    }

    change = () => {
        let seed = String(Number.random(1, 10000));
        this.setState({
            config: AnimationConfig.generate(seed),
            cools: Cools.glitch(seed, 1, parseInt(query().get('level') ?? 4)),
            coolsNoMatrix: this.configNoMatrix(Cools.glitch(seed, 1, parseInt(query().get('level') ?? 4)))
        });
    }

    configNoMatrix(config) {
        config.matrix = new MatrixConfig([]);
        return config;
    }

    render() {
        return (
            <div className={"just-multirender"} onClick={this.change}>
                {/*<Wow key={Number.random(1, Number.MAX_SAFE_INTEGER)} size={this.size} config={this.state.config}*/}
                {/*     cools={Cools.none()}/>*/}
                <Wow key={Number.random(1, Number.MAX_SAFE_INTEGER)} size={this.size} config={this.state.config}
                     cools={this.state.cools}/>
            </div>
        );
    }
}
