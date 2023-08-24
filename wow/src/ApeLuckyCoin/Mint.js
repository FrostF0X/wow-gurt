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
            firstPhaseError: false
        };
        BrowserOrientation.listen(o => this.setState((state) => ({...state, orientation: o})));
        this.size = query().get('size') ?? 512;
        this.slow = query().get('slow') ?? 1;
    }

    write = async () => {
        try {
            const approved = await ApeMintUtils.transferApe();
            if (!approved) {
                this.setState((state) => ({...state, firstPhaseError: '[NEED 1 APE COIN] [CLICK TO RETRY]'}));
                return;
            }
        } catch (e) {
            this.setState((state) => ({...state, firstPhaseError: '[TRANSACTION ERROR] [CLICK TO RETRY]'}));
            return;
        }
        this.setState((state) => ({...state, showMint: true}));
    };

    render() {
        return (
            <div className={`ape-lucky-coin-mint ape-lucky-coin-mint-portrait`}>
                <div className={`ape-lucky-coin-mint-portrait-content`}>
                    <div className={`ape-lucky-coin-mint-portrait-explanations`}>
                    </div>
                    <div className={`ape-lucky-coin-mint-portrait-preview`}>
                        <ApeLuckyCoin seed={1} slow={this.slow} animate={true} config={this.config}/>
                    </div>
                    <div className={`ape-lucky-coin-mint-portrait-buttons`}>
                        <Button>
                            <ConnectButton
                                accountStatus={"address"}
                                showBalance={false}
                                label={"[CONNECT WALLET]"}
                            />
                        </Button>
                        <Button>
                            {this.state.showMint ?
                                <MintApeLuckyCoin/> :
                                <button className={""} onClick={this.write}>
                                    {this.state.firstPhaseError ? this.state.firstPhaseError : '[MINT]'}
                                </button>}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
