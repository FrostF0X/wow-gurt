import './Site.scss';
import React from "react";
import GA from "../GoogleAnalytics/GA";

export default class Site extends React.Component {
    render() {
        return (
            <div className={`wow-crypto-city-site`}>
                <GA id={'G-85VZQV4L2G'}/>
                {this.props.children}
            </div>
        );
    }
}
