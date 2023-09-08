import './Site.scss';
import React from "react";
import GA from "../GoogleAnalytics/GA";
import Basics from "../Basics";

export default class Site extends React.Component {
    render() {
        return (
            <div className={`wow-art-galleries-site`}>
                <GA id={'G-Q6C959KG3L'}/>
                <Basics>{this.props.children}</Basics>
                {/*<div id={"popup-root"}></div>*/}
            </div>
        );
    }
}
