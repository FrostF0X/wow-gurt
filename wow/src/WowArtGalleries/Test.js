import "./Test.scss";
import React from "react";
import GlitchImage from "../GlitchImage";
import AppWindow from "./AppWindow";
import GalleryPopup, {PopupController} from "./GalleryPopup";
import GalleryButton from "./GalleryButton";

export default class Test extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.popup = PopupController.n();
    }

    render() {
        return <div className={`wow-art-gallery`}>
            <div className={`wow-art-gallery-background`}>
                <GlitchImage img={`wow-art-galleries/mobile`} preset={'hue'}/>
            </div>
            <div className={`wow-art-gallery-iwant-my-gallery`}>
                <AppWindow click={this.popup.open}>
                    <h2>I want my own gallery!</h2>
                    <GalleryPopup controller={this.popup}>
                        <div className="wow-art-gallery-iwant-my-gallery-popup-text">
                            Buying gallery gives you opportunity to exhibit art in the CITY.
                            Your gallery is piece of generative art minted as NFT.
                            In future direct selling and auction option will be available for our nft collectors.
                        </div>
                        <div className={'wow-art-gallery-iwant-my-gallery-popup-buttons'}>
                            <GalleryButton label={"Close!"} click={this.popup.close}/> <GalleryButton
                            label={"Mint!"}/>
                        </div>
                    </GalleryPopup>
                </AppWindow>
            </div>
            <a href="https://medium.com/@alina_17943/gurt-agency-who-we-are-d882db89c674"
               target={'_blank'}
               className="wow-art-gallery-medium">
                <img src="/assets/wow-art-galleries/medium.png" alt=""/>
            </a>
            <a href="https://twitter.com/gurt_agency"
               target={'_blank'}
               className="wow-art-gallery-twitter">
                <img src="/assets/wow-art-galleries/twitter.png" alt=""/>
            </a>
        </div>
    }
}
