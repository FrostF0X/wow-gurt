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

export default class Mint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orientation: BrowserOrientation.get(),
            wallet: getWalletClient(),
            firstPhaseError: false,
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
                this.setState((state) => ({...state, firstPhaseError: '⤫[NEED 1 APE COIN] [CLICK TO RETRY]⤬'}));
                return;
            }
        } catch (e) {
            this.setState((state) => ({...state, firstPhaseError: '⤫[TRANSACTION ERROR] [CLICK TO RETRY]⤬'}));
            return;
        }
        this.setState((state) => ({...state, showMint: true}));
    };

    render() {
        return (
            <div className={`ape-lucky-coin-mint ape-lucky-coin-mint-${this.state.orientation}`}>
                <div className={`ape-lucky-coin-mint-content`}>
                    <div className={`ape-lucky-coin-mint-explanations`}>
                        <Button type={"left"}>
                            [APE LUCKY COIN]
                        </Button>
                        <Button type={"left"}>
                            [PRICE: 1 APE]
                        </Button>
                        <Button type={"left"}>
                            [MINT #[{this.state.minted}]]
                        </Button>
                    </div>
                    <div className={`ape-lucky-coin-mint-preview`}>
                        {this.state.minted !== null ?
                            <ApeLuckyCoin seed={this.state.minted}
                                          slow={this.slow}
                                          animate={true}
                                          config={this.config}/> : ''}
                    </div>
                    <div className={`ape-lucky-coin-mint-buttons`}>
                        <Button type={"right"}>
                            <ConnectButton
                                accountStatus={"address"}
                                showBalance={false}
                                label={"⤫[CONNECT WALLET]⤬"}
                            />
                        </Button>
                        <Button type={"right"}>
                            {this.state.showMint ?
                                <MintApeLuckyCoin tokenId={this.state.minted}/> :
                                <button className={""} onClick={this.write}>
                                    {this.state.firstPhaseError ? this.state.firstPhaseError : '⤫[MINT]⤬'}
                                </button>}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
