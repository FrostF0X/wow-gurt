import './City.scss';
import React from "react";
import BrowserOrientation from "../BrowserOrientation";
import AppWindow from "./AppWindow";
import ConnectButton from "../Chains/ConnectButton";
import Gallery from "./Gallery";
import {ParallaxProvider} from "react-scroll-parallax";

export default class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            orientation: BrowserOrientation.get(),
        };
        BrowserOrientation.listen(o => this.setState((state) => ({...state, orientation: o})));
    }

    render() {
        return <ParallaxProvider scrollAxis="horizontal">
            <div className={"wow-art-city"}>
                <div className={`wow-art-galleries-connect-wallet`}>
                    <AppWindow>
                        <ConnectButton label={"CONNECT"} showBalance={false} chainStatus={"none"}
                                       accountStatus={"address"}/>
                    </AppWindow>
                </div>
                <Gallery/>
                <Gallery/>
                <Gallery/>
            </div>
        </ParallaxProvider>
    }
}
