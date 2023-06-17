import React from "react";
import '../styles/HomeLink.scss';
import Typed from "../Typed";

class HomeRow extends React.Component {
    render() {
        return <div>
            <h3 className={this.props.className}>
                <Typed
                    width={this.props.width}
                    title={this.props.title}
                />
            </h3>
        </div>
    }
}

export default HomeRow;