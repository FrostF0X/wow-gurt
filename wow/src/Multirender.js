import './styles/MultiRender.scss';
import React from "react";
import AnimationConfig from "./AnimationConfig";
import {Cools} from "./Cools/Cools";
import Button from "./Mint/Button";
import Wow from "./Wow";
import RenderOverlay from "./RenderOverlay";

function query() {
    return new URLSearchParams(document.location.search);
}

export class Multirender extends React.Component {
    constructor(props) {
        super(props);
        this.size = 700;
        let seed = parseInt(query().get('seed')) ?? 0;
        let level = parseInt(query().get('level') ?? 7);
        this.overlay = parseInt(query().get('overlay')) ?? 0;
        this.state = {
            level: level,
            seed: seed,
        };
    }

    generateWithoutOverlay = async () => {
        return await this.generate(false);
    }

    generateWithOverlay = async () => {
        return await this.generate(true);
    }

    generate = async (overlay) => {
        const response = await fetch(`${process.env.REACT_APP_RENDERER_ADDRESS}/test`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                config: btoa(JSON.stringify(AnimationConfig.generate(this.state.seed))),
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
        this.setState((state) => ({
            ...state,
            seed: state.seed + 1,
        }));
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
                        <button className={"btn"} onClick={this.generateWithOverlay}>
                            GENERATE WITH OVERLAY
                        </button>
                    </Button>
                    <Button>
                        <button className={"btn"} onClick={this.generateWithoutOverlay}>
                            GENERATE WITHOUT OVERLAY
                        </button>
                    </Button>
                </div>
            </div>
        );
    }
}
