import React from "react";

export default class HowItWorks extends React.Component {
    render() {
        return <div className={"how-it-works"}
                    style={{
                        textAlign: "center",
                        fontSize: '13px',
                        marginBottom: '1em',
                        fontFamily: 'Machina r',
                        width: "100%",
                    }}>
            <table style={{
                "border": "white 1px solid", width: "100%", borderSpacing: 0,
            }}>
                <tbody>
                <tr>
                    <td style={{fontSize: "0.5em"}} colSpan={2}>&nbsp;</td>
                </tr>
                <tr>
                    <th colSpan={2} style={{textTransform: "uppercase"}}>
                        <span className="text-highlight">How it works?</span><br/>
                    </th>
                </tr>
                <tr>
                    <td style={{
                        fontSize: "0.5em", borderBottom: "white 1px solid"
                    }} colSpan={2}>&nbsp;</td>
                </tr>
                <tr>
                    <td style={{fontSize: "1em"}} colSpan={2}>&nbsp;</td>
                </tr>
                <tr>
                    <td colSpan={2} style={{
                        fontFamily: "Inter",
                        fontSize: "11px",
                        textAlign: "left",
                        padding: '0 10px'
                    }}>
                        <span className="text-highlight-cool">What to do:</span> Every time you click
                        refresh button,
                        new nft is randomized,
                        just pick specific NFT you desire and click Get.
                        <br/>
                        <span className="text-highlight-cool">Be cautious:</span> due to the large
                        number of
                        possible NFT variations, you will not encounter the same NFT twice, so mint it
                        if
                        you like it!
                    </td>
                </tr>
                <tr>
                    <td style={{fontSize: "1em"}} colSpan={2}>&nbsp;</td>
                </tr>
                </tbody>
            </table>
        </div>

    }
}
