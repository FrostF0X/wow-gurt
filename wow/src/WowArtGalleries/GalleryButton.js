import React from "react";

export default class GalleryButton extends React.Component {
    render() {
        return <button className={"wow-art-galleries-button"} onClick={this.props.click}>
            {this.props.label}
        </button>
    }
}
