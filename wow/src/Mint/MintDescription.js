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
                <Intro/>
                <Price/>
                <WhatIsIt/>
            </div>
        </div>
    }
}
