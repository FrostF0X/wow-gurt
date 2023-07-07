import './styles/Mint.scss';
import React from "react";
import Random from "./Random";
import Just from "./Just";

function query() {
    return new URLSearchParams(document.location.search);
}
class Render extends React.Component {
    constructor(props) {
        super(props);
        Random.init(query().get('seed') ?? String(Number.random(0, 10000)));
    }

    render() {
        return (
            <div className={"render"} style={{width: "100%", height: "100%"}}>
                <Just/>
            </div>
        );
    }
}

export default Render;
