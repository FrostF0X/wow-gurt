import React from "react";
import Mint from "./Mint";
import "./Site/Site.css";
import "./Site/SiteOverride.scss";
import {configureChains, createConfig, WagmiConfig} from "wagmi";
import {getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {theme} from "./Theme";
import {goerli, mainnet} from "wagmi/chains";
import {infuraProvider} from "wagmi/providers/infura";
import {jsonRpcProvider} from "wagmi/providers/jsonRpc";

const localhost = {
    id: 1337,
    name: "Local",
    network: "localhost",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
    },
    rpcUrls: {
        default: {
            http: ["http://127.0.0.1:7545"],
        },
        public: {
            http: ["http://127.0.0.1:7545"],
        },
    },
};

const {
    chains,
    publicClient,
    webSocketPublicClient
} = configureChains([
    ...(process.env.REACT_APP_ENABLE_GOERLI === 'true' ? [goerli] : []),
    ...(process.env.REACT_APP_ENABLE_LOCAL === 'true' ? [localhost] : []),
    ...(process.env.REACT_APP_ENABLE_MAINNET === 'true' ? [mainnet] : []),
], [
    ...(process.env.REACT_APP_ENABLE_LOCAL === 'true' ? [jsonRpcProvider({rpc: () => ({http: 'http://127.0.0.1:7545'})})] : []),
    ...(process.env.REACT_APP_ENABLE_GOERLI === 'true' || process.env.REACT_APP_ENABLE_MAINNET === 'true' ? [infuraProvider({apiKey: String(process.env.REACT_APP_INFURA_PROJECT_ID)})] : [])
]);

const {connectors} = getDefaultWallets({
    appName: 'RainbowKit demo', projectId: 'd3a216c52b2adac62ac723b339a7b3c7', chains,
});

const wagmiConfig = createConfig({
    autoConnect: true, connectors, publicClient, webSocketPublicClient,
});

export const App = () => {
    return <WagmiConfig config={wagmiConfig}>
        <div className={"rk"}>
            <RainbowKitProvider chains={chains} theme={theme} coolMode={true}
                                modalSize={"compact"}>
                <Mint></Mint>
            </RainbowKitProvider>
        </div>
    </WagmiConfig>
}
