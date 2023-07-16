import {JustFrame} from "../JustFrame";
import React, {Fragment} from "react";

export default class Intro extends React.Component {
    render() {
        return <Fragment>
            <div className={"intro"}>
                <div className={"greetings"}
                     style={{
                         textAlign: "left", textTransform: "uppercase", fontSize: '17px',
                     }}>
                    hello!<br/>
                    we are <span className={"text-highlight"}>web 3.0</span>
                    <br/>
                    <span className={"text-highlight"}>creative agency</span><br/>
                </div>
                <div className={"gurt-container"} style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}>

                    <a href="https://gurt.agency" target={"_blank"}>
                        <img src="/pointer-hand.png" alt="pointer" className={"pointer"}
                             style={{marginRight: '2em', width: "58px"}}/>
                    </a>
                    <a href="https://gurt.agency" target={"_blank"}>
                        <JustFrame>
                            <div className="gurt">
                                <img src="/gurt.svg" alt="gurt"/>
                            </div>
                        </JustFrame>
                    </a>

                </div>
                <div className={"check-out"}
                     style={{
                         textAlign: "center",
                         textTransform: "uppercase",
                         fontSize: '13px',
                         fontFamily: 'Machina r'
                     }}
                >
                    check out our <span
                    className={"text-highlight-cool"}>wow.gurt</span><br/>
                    nft&nbsp;collection
                </div>
                <a className={"twitter"}  target={"_blank"}
                   href="https://gurt.agency"><img src={"/twitter.svg"} alt={"twitter"}/></a>
                <a className={"opensea"}  target={"_blank"}
                   href="https://opensea.com"><img src={"/opensea.svg"} alt={"opensea"}/></a>
            </div>
        </Fragment>;
    }
}
