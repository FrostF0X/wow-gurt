import React from "react";
import {configureChains, createConfig, WagmiConfig} from "wagmi";
import {getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {theme as defaultTheme} from "../Theme";
import {jsonRpcProvider} from "wagmi/providers/jsonRpc";
import {polygon, polygonMumbai} from "viem/chains";

export const Polygon = ({theme, children}) => {
    const localhost = {
        id: 31337,
        name: "Local",
        network: "localhost",
        nativeCurrency: {
            decimals: 18,
            name: "Ether",
            symbol: "ETH",
        },
        rpcUrls: {
            default: {
                http: ["http://127.0.0.1:8545"],
            },
            public: {
                http: ["http://127.0.0.1:8545"],
            },
        },
    };

    const {
        chains,
        publicClient,
        webSocketPublicClient
    } = configureChains([
        ...(process.env.REACT_APP_ENABLE_GOERLI === 'true' ? [polygonMumbai] : []),
        ...(process.env.REACT_APP_ENABLE_LOCAL === 'true' ? [localhost] : []),
        ...(process.env.REACT_APP_ENABLE_MAINNET === 'true' ? [polygon] : []),
    ], [
        ...(process.env.REACT_APP_ENABLE_LOCAL === 'true' ? [jsonRpcProvider({rpc: () => ({http: 'http://127.0.0.1:8545'})})] : []),
        ...(process.env.REACT_APP_ENABLE_GOERLI === 'true' ? [jsonRpcProvider({rpc: () => ({http: `https://polygon-mumbai.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`})})] : []),
        ...(process.env.REACT_APP_ENABLE_MAINNET === 'true' ? [jsonRpcProvider({rpc: () => ({http: `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`})})] : []),
    ]);

    const {connectors} = getDefaultWallets({
        appName: 'RainbowKit demo', projectId: 'd3a216c52b2adac62ac723b339a7b3c7', chains,
    });

    const wagmiConfig = createConfig({
        autoConnect: false, connectors, publicClient, webSocketPublicClient,
    });

    return <WagmiConfig config={wagmiConfig}>
        <div className={"rk"}>
            <RainbowKitProvider chains={chains} theme={theme ?? defaultTheme} coolMode={true}
                                modalSize={"compact"}>
                {children}
            </RainbowKitProvider>
        </div>
    </WagmiConfig>
}
