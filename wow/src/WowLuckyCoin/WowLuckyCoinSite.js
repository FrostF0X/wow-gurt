import './WowLuckyCoinSite.scss';
import React from "react";

export default class WowLuckyCoinSite extends React.Component {
    render() {
        return (
            <div className={`wow-lucky-coin-site`}>
                {this.props.children}
            </div>
        );
    }
}
