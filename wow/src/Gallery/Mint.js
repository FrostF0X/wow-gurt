import './Mint.scss';
import React from "react";
import ApeLuckyCoin from "./ApeLuckyCoin";
import query from "../Common/Query";
import BrowserOrientation from "../BrowserOrientation";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import Button from "./Button";
import {getWalletClient} from '@wagmi/core';
import {ApeMintUtils} from "./ApeMintUtils";
import {MintApeLuckyCoin} from "./MintApeLuckyCoin";
import NotEnoughApeCoin from "./NotEnoughApeCoin";
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
        const minted = Number(await ApeMintUtils.getMintedTokens());
        this.setState((state) => ({...state, minted: minted}))
    };

    write = async () => {
        try {
            const approved = await ApeMintUtils.transferApe();
            if (!approved) {
                this.setState((state) => ({...state, firstPhaseError: '[NEED 1 APE COIN]\n⤫ [CLICK TO RETRY] ⤬'}));
                return;
            }
        } catch (e) {
            if (e instanceof NotEnoughApeCoin) {
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
        window.open(`https://app.uniswap.org/#/swap?theme=dark&exactField=output&exactAmount=1&inputCurrency=ETH&outputCurrency=${process.env.REACT_APP_USDC_COIN_CONTRACT_ADDRESS}&chain=base`, '_blank');
        this.setState((state) => ({
            ...state,
            buyOnUniswap: false
        }));
    }

    render() {
        return (
            <div className={`gallery-mint gallery-mint-${this.state.orientation}`}>
                <div className={`gallery-mint-content`}>
                    <div className={`gallery-mint-explanations`}>
                        <Button type={"left"}>
                            [NFT GALLERY]
                        </Button>
                        <Button type={"left"}>
                            [PRICE: 0.1 ETH]
                        </Button>
                        <Button type={"left"}>
                            [MINT #[{this.state.minted}]]
                        </Button>
                        <Button>
                            [CHECK OUT]
                            <a target={"_blank"}
                               href="https://rarible.com/collection/polygon/0xd8acd4fb562e4824d93bbcbf03aa8d6262db6035/items">[RARIBLE]</a>
                        </Button>
                        <Button>
                            [CHECK OUT]
                            <a target={"_blank"}
                               href="https://wow.gurt.agency">[WOW SECRET]</a>
                        </Button>
                    </div>
                    <div className={`gallery-mint-preview`}>
                        {this.state.minted !== null ? <ApeLuckyCoin seed={this.state.minted}
                                                                    slow={this.slow}
                                                                    animate={true}
                                                                    config={this.config}/> : ''}
                    </div>
                    <div className={`gallery-mint-buttons`}>
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
                                    onClick={this.openUniswap}>{'[NOT ENOUGH APE COIN]\n⤫ [BUY ON UNISWAP] ⤬'}</button> : null}
                            {this.state.showMint ? <MintApeLuckyCoin tokenId={this.state.minted}/> : null}
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
