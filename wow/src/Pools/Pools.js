import React from "react";
import "./Pools.scss";
import BrowserOrientation from "../BrowserOrientation";
import Popup from "reactjs-popup";
import Pepe from "./Pepe";

export default class Pools extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            orientation: BrowserOrientation.get(),
            open: false,
        };
        BrowserOrientation.listen(o => this.setState((state) => ({...state, orientation: o})));
    }

    componentDidMount() {

    }

    openModal = () => {
        this.setState((state) => ({
            ...state, open: true
        }))
    }

    closeModal = () => {
        this.setState((state) => ({
            ...state, open: false
        }))
    }

    render() {
        return <div className={`pools pools-${this.state.orientation}`}>
            <img src={`/assets/pools/landing-${this.state.orientation}.png`} alt="" className="pools-background"/>
            <div className="pools-pepe">
                {this.pepe()}
            </div>
            <div className="pools-background-line">&nbsp;</div>
            <a className={"pools-buttons pools-buttons-mint"}
               href="https://mint.fun/base/0x773d100c99797881fAC69123F25bA37B83AbCA3c"
               rel="noreferrer"
               target="_blank">
                <img src="/assets/pools/mint.png" alt=""/>
            </a>
            <button className={"pools-buttons-b pools-buttons pools-buttons-game"} onClick={this.openModal}>
                <img src="/assets/pools/game.png" alt=""/>
            </button>
            <Popup open={this.state.open}>
                <div className={`pools-popup`} onClick={this.closeModal}>
                    {this.state.orientation === 'landscape'
                        ? <div className={"pools-popup-landscape"}>
                            <img src={`/assets/pools/popup/landscape/banner.png`} alt=""
                                 className="pools-popup-landscape-banner"/>
                            <a href="https://wow.gurt.agency"
                               className="pools-popup-landscape-gurt"
                               rel="noreferrer"
                               target={"_blank"}
                            >
                                <img src={`/assets/pools/gurt.png`} alt=""
                                     className="pools-popup-landscape-gurt-image"/>
                            </a>
                            <a href="https://twitter.com/gurt_agency"
                               className="pools-popup-landscape-twitter"
                               rel="noreferrer"
                               target={"_blank"}
                            >
                                <img src={`/assets/pools/twitter.png`} alt=""
                                     className="pools-popup-landscape-gurt-image"/>
                            </a>
                            <div className="pools-popup-landscape-pepe">
                                {this.pepe()}
                            </div>
                        </div> :
                        <>
                            <div className="pools-popup-landscape-header">
                            </div>
                        </>
                    }
                </div>
            </Popup>
            <a className={"pools-buttons pools-buttons-wow-gurt"}
               href="https://wow.gurt.agency" rel="noreferrer"
               target="_blank">
                <img src="/assets/pools/wow-gurt.png" alt=""/>
            </a>
            <a className={"pools-buttons pools-buttons-made-by"}
               href="https://gurt.agency" rel="noreferrer"
               target="_blank">
                <img src="/assets/pools/made-by.png" alt=""/>
            </a>
        </div>
    }

    pepe() {
        return <Pepe/>;
    }
}
