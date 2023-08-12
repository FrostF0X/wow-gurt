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
import "./Site/SiteOverride.scss";
import BrowserOrientation from "./BrowserOrientation";
import Cools from "./Random/Cools";
import AnimationConfig from "./AnimationConfig";
import WhatIsIt from "./Mint/WhatIsIt";
import Price from "./Mint/Price";
import MintLoader from "./Mint/MintLoader";
import {JustFrame} from "./JustFrame";
import query from "./Common/Query";

class Mint extends React.Component {
    provider = null;
    loaderPos = 0;

    constructor(props) {
        super(props);
        let seed = query().get('seed') ?? Cools.generate();
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
                    seed: `${this.state.seed}`,
                })
            });
            const {input, signature} = (await response.json());
            this.setState((state) => ({...state, input, signature}));
        } finally {
            this.stopLoader();
        }
    }

    startLoader() {
        this.rememberConfig = this.state.config;
        this.remberSeed = this.state.seed;
        this.setState((prevState) => ({
            ...prevState,
            loading: true,
            btnText: <MintLoader/>
        }));
        this.loaderInterval = setInterval(() => {
            this.refresh();
        }, 500);
    }

    stopLoader() {
        this.loaderPos = 0;
        clearInterval(this.loaderInterval);
        this.setState({btnText: "MINT WOW", loading: false, seed: this.remberSeed, config: this.rememberConfig});
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
                        <Minted setMinted={(m) => this.setState(() => ({minted: m}))}/>
                        <Button><ConnectButton accountStatus={"address"} showBalance={true}
                                               label={"CONNECT WALLET"}/></Button>
                        <div style={{
                            display: "flex", flexDirection: "row", justifyContent: "stretch", alignItems: "stretch"
                        }}>
                            <Button absolutes={<div className={'pointer-wow-container pointer-wow-refresh-container'}>
                                <JustFrame>
                                    <img src="/pointer-hand.png" alt="pointer"
                                         className={"pointer-wow"}/>
                                </JustFrame>
                            </div>
                            }>
                                <button
                                    disabled={this.state.input || this.state.loading}
                                    className="btn refresh-btn"
                                    onClick={this.refresh}>
                                    &nbsp;
                                    <img src="/refresh.svg" alt=""/>
                                </button>
                            </Button>

                            {this.state.input ? <Button style={{width: '100%'}}><MintWow
                                    input={this.state.input} signature={this.state.signature}/></Button> :
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
                            fontFamily: "Machina r",
                            height: "60px"
                        }}>
                            <span>Seed:&nbsp;</span><span
                            style={{width: '166px', fontSize: '0.875em', textAlign: 'right'}}
                            className={"text-highlight-cool"}>#{this.state.minted} {this.state.seed}</span>
                        </div>
                        <Button color={'blue'}>
                            <a href={`${process.env.REACT_APP_OPENSEA_DROP_LINK}`} target={"_blank"} rel="noreferrer">
                                <button className={"btn"}>Cool Up my WOW!</button>
                            </a>
                        </Button>
                        <div className={"mint-socials"}>
                            <Button>
                                <a className={"twitter"} target={"_blank"} rel="noreferrer"
                                   href="https://twitter.com/gurt_agency"><img src={"/twitter.svg"}
                                                                               alt={"twitter"}/></a>
                            </Button>
                            <Button color={"blue"}>
                                <a className={"opensea"} target={"_blank"} rel="noreferrer"
                                   href={process.env.REACT_APP_OPENSEA_COLLECTION_LINK}><img src={"/opensea.svg"}
                                                                                             alt={"opensea"}/></a>
                            </Button>
                        </div>
                        <div className={"description-block"}>
                            <WhatIsIt/>
                            <Price/>
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
