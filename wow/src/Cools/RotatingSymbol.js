import React from "react";
import "./RotatingSymbol.scss";

export default class RotatingSymbol extends React.Component {
    render() {
        return <div className="rotating-symbols">
            {['W', 'O'].map((i, key) =>
                <span className={`rotating-symbol rotating-symbol-delay-${(key + this.props.delay) % 2 + 1}`}>{i}</span>
            )}
        </div>

    }
}
