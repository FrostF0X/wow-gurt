import './Preview.scss';
import React from "react";
import BrowserOrientation from "../BrowserOrientation";
import GlitchImage from "../GlitchImage";

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
            <div className={`wow-art-galleries-preview wow-art-galleries-preview-${this.state.orientation}`}>
                <div className={`wow-art-galleries-preview-background`}>
                    <GlitchImage img={`wow-art-galleries/mobile`} preset={'hue'}/>
                </div>
                <a href="#" className={'wow-art-galleries-preview-iwant-my-gallery'}>
                    <img src="/assets/wow-art-galleries/i-want-my-gallery.png"
                         alt=""/>
                </a>
                <a href="https://medium.com/@alina_17943/gurt-agency-who-we-are-d882db89c674"
                   target={'_blank'}
                   className="wow-art-galleries-preview-medium">
                    <img src="/assets/wow-art-galleries/medium.png" alt=""/>
                </a>
                <a href="https://twitter.com/gurt_agency"
                   target={'_blank'}
                   className="wow-art-galleries-preview-twitter">
                    <img src="/assets/wow-art-galleries/twitter.png" alt=""/>
                </a>
            </div>
        );
    }
}
