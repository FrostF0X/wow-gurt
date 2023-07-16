import './styles/Render.scss';
import React from "react";
import Just from "./Just";
import AnimationConfig from "./AnimationConfig";

function query() {
    return new URLSearchParams(document.location.search);
}

class Render extends React.Component {
    constructor(props) {
        super(props);
        this.size = query().get('size') ?? 1024;
        this.config = AnimationConfig.generate(parseInt(query().get('seed')));
        this.metadata = JSON.stringify({"some-metadata": "test"});
    }

    render() {
        return (
            <div className={"just-render"}>
                <Just slow={query().get('slow') ?? 10} size={this.size} config={this.config}/>
                <div id={"just-metadata"} data-json={this.metadata}></div>
            </div>
        );
    }
}

export default Render;
