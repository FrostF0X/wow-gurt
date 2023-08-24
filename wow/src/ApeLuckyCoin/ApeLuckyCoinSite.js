import './ApeLuckyCoinSite.scss';
import React from "react";

export default class ApeLuckyCoinSite extends React.Component {
    render() {
        return (
            <div className={`ape-lucky-coin-site`}>
                {this.props.children}
            </div>
        );
    }
}
