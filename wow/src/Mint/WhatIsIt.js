import React from "react";

export default class WhatIsIt extends React.Component {
    render() {
        return (
            <div className={"what-is-it"}
                 onClick={() => window.scroll(0, 1000)}
                 style={{
                     textAlign: "center",
                     width: "100%",
                 }}
            >
                <table className={"padded"}>
                    <thead>
                    <tr>
                        <th colSpan={2} style={{textTransform: "uppercase"}}>
                            <span className="text-highlight">What is it?</span><br/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan={2}>
                            <span className="text-highlight-cool">WOW</span> is NFT generator where you can create beautiful glitchy-flashy-coolish NFTs by yourself
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>
        );
    }
}
