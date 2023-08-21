import "./Pepe.scss";
import React from "react";

export default class Pepe extends React.Component {
    render() {
        return <div className="pepe">
            <img src="/assets/pools/pepe-rubber-ring.png" className={"pepe-rubber-ring"}
                 alt=""/>
            <img src="/assets/pools/pepe-character.png" className={"pepe-character"}
                 alt=""/>
        </div>;
    }
}
