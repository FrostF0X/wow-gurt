import React from "react";
import {configureChains, createConfig, WagmiConfig} from "wagmi";
import {getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {theme as defaultTheme} from "../Theme";
import {jsonRpcProvider} from "wagmi/providers/jsonRpc";
import {base, baseGoerli} from "viem/chains";

export const Base = ({theme, children}) => {
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

    const baseFixed = base;
    baseFixed.fees = {
        defaultPriorityFee: 1000000, // 0.001 gwei
    };
    const {
        chains,
        publicClient,
        webSocketPublicClient
    } = configureChains([
        ...(process.env.REACT_APP_ENABLE_GOERLI === 'true' ? [baseGoerli] : []),
        ...(process.env.REACT_APP_ENABLE_LOCAL === 'true' ? [localhost] : []),
        ...(process.env.REACT_APP_ENABLE_MAINNET === 'true' ? [baseFixed] : []),
    ], [
        ...(process.env.REACT_APP_ENABLE_LOCAL === 'true' ? [jsonRpcProvider({rpc: () => ({http: 'http://127.0.0.1:8545'})})] : []),
        ...(process.env.REACT_APP_ENABLE_GOERLI === 'true' || process.env.REACT_APP_ENABLE_MAINNET === 'true' ? [jsonRpcProvider({rpc: () => ({http: 'https://intensive-empty-isle.base-mainnet.discover.quiknode.pro/f49cf1ce10983435421826160fc886010faeb206/'})})] : [])
    ]);

    const {connectors} = getDefaultWallets({
        appName: 'RainbowKit demo', projectId: 'd3a216c52b2adac62ac723b339a7b3c7', chains,
    });

    const wagmiConfig = createConfig({
        autoConnect: true, connectors, publicClient, webSocketPublicClient,
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
