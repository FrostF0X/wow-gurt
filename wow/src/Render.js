import './styles/Render.scss';
import React from "react";
import Random from "./Random";
import Just from "./Just";

function query() {
    return new URLSearchParams(document.location.search);
}

class Render extends React.Component {
    constructor(props) {
        super(props);
        this.size = query().get('size') ?? 1024;
        document.getElementsByTagName('body')[0].style.setProperty('width', `${this.size}px`);
        document.getElementsByTagName('body')[0].style.setProperty('height', `${this.size}px`);
        this.random = Random.fresh(query().get('seed') ?? String(Number.random(0, 10000)));
    }

    render() {
        return (
            <div className={"just-render"}>
                <Just slow={query().get('slow') ?? 10} size={this.size} random={this.random}/>
            </div>
        );
    }
}

export default Render;
