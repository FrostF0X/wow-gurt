import React from "react";

export default class Basics extends React.Component {
    render() {
        return <div style={{'--animation-length': '2000ms'}}>
            {this.props.children}
        </div>
    }
}
