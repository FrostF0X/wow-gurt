import React from "react";
import Random from "./Random";
import "@rainbow-me/rainbowkit/styles.css";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {useAccount} from 'wagmi';
import {MintWow} from "./Mint/MintWow";
import "./styles/Mint.scss";
import WowScroller from "./WowScroller";
import Scroller from "./Scroller";
import MintDescription from "./Mint/MintDescription";
import Button from "./Mint/Button";

class Mint extends React.Component {
    loaded = false;
    provider = null;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            btnText: "▲ GET WOW ▲",
            seed: Number.random(0, Number.MAX_SAFE_INTEGER)
        };
        this.account = null;
        this.contract = null;
        this.key = 0;
        this.generate = this.generate.bind(this);
    }

    async componentDidMount() {
        if (this.loaded) {
            return false;
        }
        this.loaded = true;
    }

    async generate() {
        try {
            this.startLoader();

            const response = await fetch(process.env.REACT_APP_RENDERER_ADDRESS, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    seed: this.state.seed
                })
            });

            const url = (await response.json()).url;
            this.setState((state) => ({...state, url}));
        } finally {
            this.stopLoader();
        }
    }

    startLoader() {
        this.setState((prevState) => ({...prevState, loading: true}));
        this.loaderInterval = setInterval(() => {
            if (this.state.btnText.length >= 5) {
                this.setState((prevState) => ({...prevState, btnText: "▲"}));
            } else {
                this.setState((prevState) => ({...prevState, btnText: prevState.btnText + "▲"}));
            }
        }, 500);
    }

    stopLoader() {
        clearInterval(this.loaderInterval);
        Random.fresh(this.state.seed);
        this.setState({btnText: "▲ Get WoW ▲", loading: false});
    }

    refresh = () => {
        this.setState(state => ({...state, seed: Number.random(1, Number.MAX_SAFE_INTEGER)}));
    }

    render() {
        ++this.key;
        return <div className={"mint mint-landscape"}>
            <div className="mint-content">
                <MintDescription/>
                <WowScroller key={this.key} seed={this.state.seed}></WowScroller>
                <div className="actions" style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "stretch"
                }}>
                    <Button><ConnectButton accountStatus={"address"} showBalance={true}
                                           label={"CONNECT WALLET"}/></Button>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "stretch",
                        alignItems: "stretch"
                    }}>
                        <Button>
                            <button className="refresh-btn"
                                    onClick={this.refresh}>
                                &nbsp;
                                <img src="/refresh.svg" alt=""/>
                            </button>
                        </Button>

                        {this.state.url ? <Button style={{width: '100%'}}><MintWow
                                url={this.state.url}/></Button> :
                            <Button style={{width: '100%'}}>
                                <button disabled={!this.props.address && !this.state.loading} className="generate-btn"
                                        onClick={this.generate}>{this.state.btnText}</button>
                            </Button>}
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 1.5em 10px 1em",
                        fontFamily: "Machina r"
                    }}>
                        <span>Seed:&nbsp;</span><span className={"text-highlight-cool"}>{this.state.seed}</span></div>
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
