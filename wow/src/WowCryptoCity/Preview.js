import './Preview.scss';
import React from "react";
import BrowserOrientation from "../BrowserOrientation";

export default class Preview extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            orientation: BrowserOrientation.get(),
        };
        BrowserOrientation.listen(o => this.setState((state) => ({...state, orientation: o})));
    }

    render() {
        return (
            <div className={`wow-crypto-city-preview wow-crypto-city-preview-${this.state.orientation}`}>
                {this.content()}
            </div>
        );
    }

    content() {
        return <>
            <img
                className={`wow-crypto-city-preview-background wow-crypto-city-preview-${this.state.orientation}-background`}
                src={`/assets/wow-crypto-city/${this.state.orientation}/background.png`}
                alt=""/>
            <img
                className={`wow-crypto-city-preview-header wow-crypto-city-preview-item wow-crypto-city-preview-${this.state.orientation}-header`}
                src={`/assets/wow-crypto-city/${this.state.orientation}/header.png`}
                alt=""/>
            <a href="https://wow-lucky-coin.gurt.agency" target={"_blank"}
               className={`wow-crypto-city-preview-coin wow-crypto-city-preview-item wow-crypto-city-preview-${this.state.orientation}-coin`}>
                <img src={`/assets/wow-crypto-city/${this.state.orientation}/coin.png`}
                     alt=""/>
            </a>
            <a href="https://wow-wish-fountain.gurt.agency" target={"_blank"}
               className={`wow-crypto-city-preview-fountain wow-crypto-city-preview-item wow-crypto-city-preview-${this.state.orientation}-fountain`}>
                <img src={`/assets/wow-crypto-city/${this.state.orientation}/fountain.png`}
                     alt=""/>
            </a>
            <a href="https://wow-art-galleries.gurt.agency" target={"_blank"}
               className={`wow-crypto-city-preview-galleries wow-crypto-city-preview-item wow-crypto-city-preview-${this.state.orientation}-galleries`}>
                <img src={`/assets/wow-crypto-city/${this.state.orientation}/galleries.png`}
                     alt=""/>
            </a>
        </>;
    }
}
