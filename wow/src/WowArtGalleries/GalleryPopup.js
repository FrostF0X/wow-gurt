import React from "react";
import "./Popup.scss";
import Window from "./Window";
import Popup from "reactjs-popup";
import EventQ from "../Common/EventQ";

export default class GalleryPopup extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {open: false};
        this.props.controller.onClose(this.closeModal);
        this.props.controller.onOpen(this.openModal);
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
        return <Popup open={this.state.open} closeOnDocumentClick={true}>
            <div className="wow-art-galleries-popup-container">
                <div className="wow-art-galleries-popup-background" onClick={this.closeModal}>
                </div>
                <div className="wow-art-galleries-popup">
                    <Window close={this.closeModal}>
                        <div className="wow-art-galleries-popup-content">
                            {this.props.children}
                        </div>
                    </Window>
                </div>
            </div>
        </Popup>
    }
}

export class PopupController {
    constructor() {
        this.openEvents = EventQ.n();
        this.closeEvents = EventQ.n();
    }

    static n() {
        return new PopupController();
    }

    open = () => {
        this.openEvents.emmit();
    }
    close = () => {
        this.closeEvents.emmit();
    }

    onOpen = (l) => {
        this.openEvents.listen(l);
    }

    onClose = (l) => {
        this.closeEvents.listen(l);
    }
}
