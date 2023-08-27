import React from "react";
import GA from "../GoogleAnalytics/GA";

export default class Site extends React.Component {
    render() {
        return (
            <div className={`summer-pools-site`}>
                <GA id={'G-MJ6DTSMQZ3'}/>
                {this.props.children}
            </div>
        );
    }
}
