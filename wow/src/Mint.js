import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {useAccount} from 'wagmi';
import {MintWow} from "./Mint/MintWow";
import "./styles/Mint.scss";
import WowScroller from "./WowScroller";
import Scroller from "./Scroller";
import MintDescription from "./Mint/MintDescription";
import Button from "./Mint/Button";
import Minted from "./Mint/Minted";
import HowToWOW from "./Mint/HowToWOW";
import "./Site/SiteOverride.scss";
import BrowserOrientation from "./BrowserOrientation";
import Cools from "./Random/Cools";
import AnimationConfig from "./AnimationConfig";
import WhatIsIt from "./Mint/WhatIsIt";
import Price from "./Mint/Price";

class Mint extends React.Component {
    provider = null;
    loaderPos = 0;

    constructor(props) {
        super(props);
        let seed = Cools.generate();
        this.state = {
            loading: false,
            btnText: "MINT WOW",
            seed: seed,
            config: AnimationConfig.generate(seed),
            orientation: BrowserOrientation.get()
        };
        this.account = null;
        this.contract = null;
        this.generate = this.generate.bind(this);
        BrowserOrientation.listen(o => this.setState((state) => ({...state, orientation: o})));
    }

    async generate() {
        try {
            this.startLoader();
            const response = await fetch(process.env.REACT_APP_RENDERER_ADDRESS, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    config: btoa(JSON.stringify(this.state.config)),
                    seed: this.state.seed,
                })
            });
            const {url, signature} = (await response.json());
            this.setState((state) => ({...state, url, signature}));
        } finally {
            this.stopLoader();
        }
    }

    startLoader() {
        this.setState((prevState) => ({
            ...prevState,
            loading: true,
        }));
        this.loader();
        this.loaderInterval = setInterval(() => {
            this.loader();
        }, 325);
    }

    loader() {
        this.loaderPos++;
        let size = 6;
        let window = 5;
        if (this.loaderPos >= size) {
            this.loaderPos = 0;
        }
        this.setState((prevState) => ({
            ...prevState,
            btnText: Array.range(1, window - 1).map((i) => {
                return <img
                    className={`loader ${i % 2 === 0 ? 'loader-inverted' : ''} ${!((this.loaderPos + 1) % window === i || this.loaderPos % window === i) ? 'loader-empty' : ''}`}
                    src={"/loader.svg"}
                    alt={"loader"}/>;
            })
        }));
    }

    stopLoader() {
        this.loaderPos = 0;
        clearInterval(this.loaderInterval);
        this.setState({btnText: "MINT WOW", loading: false});
    }

    refresh = () => {
        let seed = Cools.generate();
        this.setState(state => ({...state, seed: seed, config: AnimationConfig.generate(seed)}));
    }

    render() {
        return <div className={`mint mint-${this.state.orientation}`}>
            <div className="mint-content">
                <MintDescription/>
                <WowScroller key={this.state.seed} config={this.state.config}></WowScroller>
                <div className="actions">
                    <div className={"actions-inner"}>
                        <Minted/>
                        <Button><ConnectButton accountStatus={"address"} showBalance={true}
                                               label={"CONNECT WALLET"}/></Button>
                        <div style={{
                            display: "flex", flexDirection: "row", justifyContent: "stretch", alignItems: "stretch"
                        }}>
                            <Button>
                                <button
                                    disabled={this.state.url || this.state.loading}
                                    className="btn refresh-btn"
                                    onClick={this.refresh}>
                                    &nbsp;
                                    <img src="/refresh.svg" alt=""/>
                                </button>
                            </Button>

                            {this.state.url ? <Button style={{width: '100%'}}><MintWow
                                    url={this.state.url} signature={this.state.signature}/></Button> :
                                <Button style={{width: '100%'}}>
                                    <button disabled={!this.props.address || this.state.loading}
                                            className={`btn generate-btn ${this.state.loading ? 'generate-btn-loading' : ''}`}
                                            onClick={this.generate}>{this.state.btnText}</button>
                                </Button>}
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-around",
                            padding: "10px 0 10px 0",
                            fontFamily: "Machina r"
                        }}>
                            <span>Seed:&nbsp;</span><span style={{width: '166px'}}
                                                          className={"text-highlight-cool"}>{this.state.seed}</span>
                        </div>
                        <div className={"mint-socials"}>
                            <a className={"twitter"} target={"_blank"} rel="noreferrer"
                               href="https://twitter.com/gurt_agency"><img src={"/twitter.svg"} alt={"twitter"}/></a>
                            <a className={"opensea"} target={"_blank"} rel="noreferrer"
                               href="https://opensea.com"><img src={"/opensea.svg"} alt={"opensea"}/></a>
                        </div>
                        <div className={"description-block"}>
                            <WhatIsIt/>
                            <Price/>
                            <HowToWOW/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mint-bottom"><Scroller/></div>

            <img className={"unicorn"} src="/unicorn.png" alt="unicorn"/>
        </div>;
    }
}

const MintWithAccount = () => {
    const {address} = useAccount();
    return <Mint address={address}></Mint>
};


export default MintWithAccount;
