import './Render.scss';
import React from "react";
import ApeLuckyCoin from "./ApeLuckyCoin";
import query from "../Common/Query";

class Render extends React.Component {
    constructor(props) {
        super(props);
        this.size = query().get('size') ?? 512;
        this.slow = query().get('slow') ?? 1;
        this.seed = query().get('tokenId') ?? 1;
    }

    render() {
        return (
            <div className={"ape-lucky-coin-render render"}>
                <ApeLuckyCoin seed={this.seed} size={this.size} slow={this.slow} animate={true} config={this.config}/>
                <div id={"attributes"} data-json={'{}'}></div>
            </div>
        );
    }
}

export default Render;
