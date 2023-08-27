import './GallerySite.scss';
import React from "react";

export default class ApeLuckyCoinSite extends React.Component {
    render() {
        return (
            <div className={`gallery-site`}>
                {this.props.children}
            </div>
        );
    }
}
