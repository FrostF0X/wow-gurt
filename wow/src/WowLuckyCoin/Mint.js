import './Mint.scss';
import React from "react";
import WowLuckyCoin from "./WowLuckyCoin";
import query from "../Common/Query";
import BrowserOrientation from "../BrowserOrientation";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import Button from "./Button";
import {getWalletClient} from '@wagmi/core';
import {WowMintUtils} from "./WowMintUtils";
import {MintApeLuckyCoin} from "./MintApeLuckyCoin";
import NotEnoughUSDCCoin from "./NotEnoughUSDCCoin";
import {useAccount} from "wagmi";

class MintInternal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orientation: BrowserOrientation.get(),
            wallet: getWalletClient(),
            firstPhaseError: false,
            buyOnUniswap: false,
            minted: null
        };
        BrowserOrientation.listen(o => this.setState((state) => ({...state, orientation: o})));
        this.size = query().get('size') ?? 512;
        this.slow = query().get('slow') ?? 1;
    }

    componentDidMount = async () => {
        const minted = Number(await WowMintUtils.getMintedTokens());
        this.setState((state) => ({...state, minted: minted}))
    };

    write = async () => {
        try {
            const approved = await WowMintUtils.transferApe();
            if (!approved) {
                this.setState((state) => ({...state, firstPhaseError: '[NEED 1 USDC COIN]\n⤫ [CLICK TO RETRY] ⤬'}));
                return;
            }
        } catch (e) {
            if (e instanceof NotEnoughUSDCCoin) {
                this.setState((state) => ({
                    ...state,
                    buyOnUniswap: true
                }));
                return;
            }
            this.setState((state) => ({...state, firstPhaseError: '[TRANSACTION REJECTED]\n⤫ [CLICK TO RETRY] ⤬'}));
            return;
        }
        this.setState((state) => ({...state, showMint: true}));
    };

    openUniswap = async () => {
        window.open(`https://app.uniswap.org/#/swap?theme=light&exactField=output&exactAmount=1&inputCurrency=ETH&outputCurrency=${process.env.REACT_APP_USDC_COIN_CONTRACT_ADDRESS}&chain=polygon`, '_blank');
        this.setState((state) => ({
            ...state,
            buyOnUniswap: false
        }));
    }

    render() {
        return (
            <div className={`ape-lucky-coin-mint ape-lucky-coin-mint-${this.state.orientation}`}>
                <div className={`ape-lucky-coin-mint-content`}>
                    <div className={`ape-lucky-coin-mint-explanations`}>
                        <Button type={"left"}>
                            [WOW LUCKY COIN]
                        </Button>
                        <Button type={"left"}>
                            [PRICE: 1 USDC]
                        </Button>
                        <Button type={"left"}>
                            [MINT #[{this.state.minted}]]
                        </Button>
                        <Button>
                            [CHECK OUT]
                            <a target={"_blank"}
                               href={`https://rarible.com/collection/base/${process.env.REACT_APP_WOW_LUCKY_COIN_CONTRACT_ADDRESS}/items`}>[RARIBLE]</a>
                        </Button>
                        <Button>
                            [CHECK OUT]
                            <a target={"_blank"}
                               href="https://wow.gurt.agency">[WOW SECRET]</a>
                        </Button>
                    </div>
                    <div className={`ape-lucky-coin-mint-preview`}>
                        {this.state.minted !== null ? <WowLuckyCoin seed={this.state.minted + 1}
                                                                    noScene={true}
                                                                    slow={this.slow}
                                                                    animate={true}
                                                                    config={this.config}/> : ''}
                    </div>
                    <div className={`ape-lucky-coin-mint-buttons`}>
                        <Button type={"right"}>
                            <ConnectButton
                                accountStatus={"address"}
                                showBalance={false}
                                label={"⤫ [CONNECT WALLET] ⤬"}
                            />
                        </Button>
                        <Button type={"right"}>
                            {!this.state.buyOnUniswap && !this.state.showMint ?
                                <button disabled={!this.props.address} onClick={this.write}>
                                    {this.state.firstPhaseError ? this.state.firstPhaseError : '⤫ [MINT] ⤬'}
                                </button> : null}
                            {this.state.buyOnUniswap ?
                                <button
                                    onClick={this.openUniswap}>{'[NOT ENOUGH WOW COIN]\n⤫ [BUY ON UNISWAP] ⤬'}</button> : null}
                            {this.state.showMint ? <MintApeLuckyCoin tokenId={this.state.minted + 1}/> : null}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}


export const Mint = () => {
    const {address} = useAccount();
    return <MintInternal address={address}></MintInternal>
};
