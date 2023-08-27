import './Site.scss';
import React from "react";
import GA from "../GoogleAnalytics/GA";

export default class Site extends React.Component {
    render() {
        return (
            <div className={`wow-lucky-coin-site`}>
                <GA id={'G-7C9NTNJ2K5'}/>
                {this.props.children}
            </div>
        );
    }
}
