import './styles/Render.scss';
import React from "react";
import Random from "./Random";
import Just from "./Just";

import Slow from "./Animation/Slow";
import Size from "./Animation/Size";

function query() {
    return new URLSearchParams(document.location.search);
}

class Render extends React.Component {
    constructor(props) {
        super(props);
        Random.init(query().get('seed') ?? String(Number.random(0, 10000)));
        Size.set(query().get('size') ?? 1024);
        Slow.slow(query().get('slow') ?? 10);
    }

    render() {
        return (
            <div className={"just-render"}>
                <Just/>
            </div>
        );
    }
}

export default Render;
