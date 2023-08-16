import React from "react";
import "./Pools.scss";
import BrowserOrientation from "../BrowserOrientation";
import Popup from "reactjs-popup";

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
            <img src={`/assets/pools/pepe.png`} alt="" className="pools-pepe"/>
            <div className="pools-background-line">&nbsp;</div>
            <a className={"pools-buttons pools-buttons-mint"}
               href="https://mint.fun/base/0x773d100c99797881fAC69123F25bA37B83AbCA3c"
               rel="noreferrer"
               target="_blank">
                <img src="/assets/pools/mint1.png" alt=""/>
            </a>
            <button className={"pools-buttons-b pools-buttons pools-buttons-game"}>
                <img src="/assets/pools/game1.png" alt=""/>
            </button>
            <Popup open={this.state.open}>
                <div className="pools-popup" onClick={this.closeModal}>
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
}
