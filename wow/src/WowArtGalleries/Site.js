import './Site.scss';
import React from "react";
import GA from "../GoogleAnalytics/GA";

export default class Site extends React.Component {
    render() {
        return (
            <div className={`wow-art-galleries-site`}>
                <GA id={'G-Q6C959KG3L'}/>
                {this.props.children}
            </div>
        );
    }
}
