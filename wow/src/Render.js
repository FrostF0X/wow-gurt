import './styles/Render.scss';
import React from "react";
import Wow from "./Wow";

function query() {
    return new URLSearchParams(document.location.search);
}

class Render extends React.Component {
    constructor(props) {
        super(props);
        this.size = query().get('size') ?? 1024;
        this.config = JSON.parse(atob(query().get('config')));
        this.metadata = JSON.stringify({"some-metadata": "test"});
    }

    render() {
        return (
            <div className={"just-render"}>
                <Wow slow={query().get('slow') ?? 10} size={this.size} config={this.config}/>
                <div id={"just-metadata"} data-json={this.metadata}></div>
            </div>
        );
    }
}

export default Render;
