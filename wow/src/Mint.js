import React, {Fragment} from "react";
import Just from "./Just";
import Random from "./Random";
import "@rainbow-me/rainbowkit/styles.css";
import {ConnectButton, darkTheme, getDefaultWallets, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import {configureChains, createConfig, WagmiConfig} from 'wagmi';
import {
    mainnet, goerli,
} from 'wagmi/chains';
import {infuraProvider} from 'wagmi/providers/infura';
import {MintWow} from "./Mint/MintWow";
import {JustFrame} from "./JustFrame";
import "./styles/Mint.scss";
import Size from "./Animation/Size";

const {
    chains,
    publicClient,
    webSocketPublicClient
} = configureChains([...(process.env.REACT_APP_ENABLE_GOERLI === 'true' ? [goerli] : []), ...(process.env.REACT_APP_ENABLE_MAINNET === 'true' ? [mainnet] : []),], [infuraProvider({apiKey: String(process.env.REACT_APP_INFURA_PROJECT_ID)})]);

const {connectors} = getDefaultWallets({
    appName: 'RainbowKit demo', projectId: 'd3a216c52b2adac62ac723b339a7b3c7', chains,
});

const wagmiConfig = createConfig({
    autoConnect: true, connectors, publicClient, webSocketPublicClient,
});

function query() {
    return new URLSearchParams(document.location.search);
}

class Mint extends React.Component {
    loaded = false;
    provider = null;

    constructor(props) {
        super(props);
        this.state = {
            btnText: "▲ Get WoW ▲"
        };
        this.account = null;
        this.contract = null;
        this.seed = query().get('seed') ?? String(Number.random(0, 10000));
        Random.init(this.seed);
        Size.set(512);
        this.generate = this.generate.bind(this);
    }

    async componentDidMount() {
        if (this.loaded) {
            return false;
        }
        this.loaded = true;
    }

    async generate() {
        this.startLoader();

        const response = await fetch(process.env.REACT_APP_RENDERER_ADDRESS, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                seed: this.seed
            })
        });

        const url = (await response.json()).url;
        this.setState((state) => ({...state, url}));
        this.stopLoader();
    }
    startLoader() {
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
        Random.init(this.seed);
        this.setState({btnText: "▲ Get WoW ▲"});
    }

    render() {
        return (<Fragment>
                <WagmiConfig config={wagmiConfig}>
                    <div className={"rk"}>
                        <RainbowKitProvider chains={chains} theme={darkTheme({
                            accentColor: '#EA42A7',
                            accentColorForeground: 'white',
                            borderRadius: 'none',
                            fontStack: 'system',
                            overlayBlur: 'large',
                        })} coolMode={true}
                                            modalSize={"compact"}>
                            <div className={"mint"}>
                                <div className="just-preview"><JustFrame><Just/></JustFrame></div>
                                {this.state.url ? <MintWow url={this.state.url}/> : <button className="generate-btn"
                                                                                            onClick={this.generate}>{this.state.btnText}</button>}
                                <ConnectButton accountStatus={"address"} showBalance={false} label={"CONNECT"}/>
                            </div>
                        </RainbowKitProvider>
                    </div>
                </WagmiConfig>
            </Fragment>);
    }
}

export default Mint;
