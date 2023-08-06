import './styles/MultiRender.scss';
import React from "react";
import Wow from "./Wow";
import AnimationConfig from "./AnimationConfig";
import {Cools} from "./Cools/Cools";
import Button from "./Mint/Button";

function query() {
    return new URLSearchParams(document.location.search);
}

export class Multirender extends React.Component {
    constructor(props) {
        super(props);
        this.size = 700;
        let seed = query().get('seed');
        let level = parseInt(query().get('level') ?? 7);
        this.state = {
            level: level,
            seed: seed,
        };
    }

    generate = async () => {
        const response = await fetch(`${process.env.REACT_APP_RENDERER_ADDRESS}/test` , {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                config: btoa(JSON.stringify(AnimationConfig.generate(this.state.seed))),
                cools: btoa(JSON.stringify(Cools.gen(this.state.seed, 1, this.state.level))),
                seed: `${this.state.seed}`,
            })
        });
        const blob = await response.blob();
        const href = URL.createObjectURL(blob);
        const a = Object.assign(document.createElement("a"), {
            href,
            style: "display:none",
            download: 'result.gif',
        });
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(href);
        a.remove();
    }

    nextLevel = () => {
        this.setState((state) => ({
            ...state,
            level: Math.min(state.level + 1, 7),
        }));
    }

    prevLevel = () => {
        this.setState((state) => ({
            ...state,
            level: Math.max(state.level - 1, 0),
        }));
    }

    nextSeed = () => {
        this.setState((state) => ({
            ...state,
            seed: state.seed + 1,
        }));
    }

    render() {
        return (
            <div className={"just-multirender"}>
                <div className="just-multirender-buttons">
                    <Wow key={Number.random(1, Number.MAX_SAFE_INTEGER)} size={this.size}
                         config={AnimationConfig.generate(this.state.seed)}
                         cools={Cools.gen(this.state.seed, 1, this.state.level)}/>
                </div>
                <div className="just-multirender-buttons">

                    <span>Seed:&nbsp;</span><span style={{width: '166px', fontSize: '0.875em', textAlign: 'right'}}
                                                  className={"text-highlight-cool"}>{this.state.seed}</span>
                    <span>Level:&nbsp;</span><span style={{width: '166px', fontSize: '0.875em', textAlign: 'right'}}
                                                   className={"text-highlight-cool"}>{this.state.level}</span>
                    <Button>
                        <button className={"btn"} onClick={this.nextLevel}>
                            NEXT
                        </button>
                    </Button>
                    <Button>
                        <button className={"btn"} onClick={this.prevLevel}>
                            PREV
                        </button>
                    </Button>
                    <Button>
                        <button className={"btn"} onClick={this.nextSeed}>
                            NEXT SEED
                        </button>
                    </Button>
                    <Button>
                        <button className={"btn"} onClick={this.generate}>
                            GENERATE
                        </button>
                    </Button>
                </div>
            </div>
        );
    }
}
