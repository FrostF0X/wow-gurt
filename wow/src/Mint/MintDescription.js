import React from "react";
import WhatIsIt from "./WhatIsIt";
import Price from "./Price";
import Intro from "./Intro";

export default class MintDescription extends React.Component {

    render() {
        return <div className="description"
                    style={{
                        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "space-around"
                    }}
        >
            <div className={"description-bar"}>
                <div>
                    <Intro/>
                </div>
                <div className={"description-block"}>
                    <WhatIsIt/>
                    <Price/>
                    <div className={"mint-socials"}>
                        <a className={"twitter"} target={"_blank"} rel="noreferrer"
                           href="https://twitter.com/gurt_agency"><img src={"/twitter.svg"} alt={"twitter"}/></a>
                        <a className={"opensea"} target={"_blank"} rel="noreferrer"
                           href={process.env.REACT_APP_OPENSEA_COLLECTION_LINK}><img src={"/opensea.svg"}
                                                                                     alt={"opensea"}/></a>
                    </div>
                </div>
            </div>
        </div>
    }
}
