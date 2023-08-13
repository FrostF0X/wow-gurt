import './styles/MultiRender.scss';
import React from "react";
import {Cools} from "./Cools/Cools";
import Button from "./Mint/Button";
import Wow from "./Wow";
import RenderOverlay from "./RenderOverlay";
import AnimationConfig from "./AnimationConfig";

function query() {
    return new URLSearchParams(document.location.search);
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export class Multirender extends React.Component {
    constructor(props) {
        super(props);
        this.size = 700;
        let seed = 1;
        if (query().get('seed')) {
            seed = isNumeric(query().get('seed')) ? parseInt(query().get('seed')) : query().get('seed');
        }
        let level = parseInt(query().get('level') ?? 7);
        this.overlay = parseInt(query().get('overlay')) ?? 0;
        this.state = {
            level: level,
            seed: seed,
            config: AnimationConfig.generate(seed),
        };
    }

    generate = async () => {
        const response = await fetch(`${process.env.REACT_APP_RENDERER_ADDRESS}/test`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                config: btoa(JSON.stringify(this.state.config)),
                cools: btoa(JSON.stringify(Cools.gen(this.state.seed, 1, this.state.level))),
                seed: `${this.state.seed}`,
                overlay: `${this.overlay}`
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
        this.setState((state) => {
            const seed = state.seed + 1;
            return ({
                ...state,
                seed: seed,
                config: AnimationConfig.generate(seed),
            });
        });
    }

    hideOverlay() {

    }

    render() {
        return (
            <div className={"just-multirender"}>
                <div className="wow-render">
                    <RenderOverlay overlay={this.overlay} size={this.size} animationLength={2000}/>
                    <Wow key={Number.random(1, Number.MAX_SAFE_INTEGER)} size={this.size}
                         ready={this.hideOverlay()}
                         config={this.state.config}
                         cools={Cools.gen(this.state.seed, 1, this.state.level)}/>
                </div>
                <div className="just-multirender-buttons">

                    <span>Seed:&nbsp;</span><span style={{width: '166px', fontSize: '0.875em', textAlign: 'right'}}
                                                  className={"text-highlight-cool"}>{this.state.seed}</span>
                    <span>Level:&nbsp;</span><span style={{width: '166px', fontSize: '0.875em', textAlign: 'right'}}
                                                   className={"text-highlight-cool"}>{this.state.level}</span>
                    <Button>
                        <button className={"btn"} onClick={this.nextLevel}>
                            NEXT LEVEL
                        </button>
                    </Button>
                    <Button>
                        <button className={"btn"} onClick={this.prevLevel}>
                            PREV LEVEL
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
