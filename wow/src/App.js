import React, {Fragment} from "react";
import Mint from "./Mint";
import {Contacts} from "./Site/Contacts";
import "./Site/Site.css";
import "./Site/SiteOverride.scss";
import {Footer} from "./Site/Footer";

export class App extends React.Component {
    render() {
        return <Fragment>
            <Mint/>
            <Contacts/>
            <Footer/>
        </Fragment>
    }
}
