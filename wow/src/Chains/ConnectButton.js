import React from "react";
import {ConnectButton as ConnectButtonW} from "@rainbow-me/rainbowkit";
import _ from "lodash";

export default class ConnectButton extends React.Component {


    constructor(props, context) {
        props = _.merge({
            accountStatus: "full",
            chainStatus: {
                largeScreen: "full",
                smallScreen: "icon",
            },
            label: "Connect Wallet",
            showBalance: {
                largeScreen: true,
                smallScreen: false,
            },
        }, props);
        super(props, context);
    }

    render() {
        return <div className="connect-button">
            {React.createElement(ConnectButtonW, this.props)}
        </div>
    }
}
