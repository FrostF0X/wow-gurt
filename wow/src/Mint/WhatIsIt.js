import React from "react";

export default class WhatIsIt extends React.Component {
    render() {
        return (
            <div className={"what-is-it"}
                 style={{
                     textAlign: "center",
                     fontSize: '13px',
                     marginBottom: '1em',
                     fontFamily: 'Machina r',
                     width: "100%",
                 }}
            >
                <table style={{
                    "border": "white 1px solid", width: "100%", borderSpacing: 0
                }}>
                    <tbody>
                    <tr>
                        <td style={{fontSize: "0.5em"}} colSpan={2}>&nbsp;</td>
                    </tr>
                    <tr>
                        <th colSpan={2} style={{textTransform: "uppercase"}}>
                            <span className="text-highlight">What is it?</span><br/>
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
                        <td colSpan={2}
                            style={{fontFamily: "Inter", fontSize: "11px", textAlign: "left", padding: '0 10px'}}>
                            We have created a unique mechanism that can generate approximately
                            152,403,456,000,000,000 different NFTs from our assets, but&nbsp;
                            <span className="text-highlight-cool">only 10,000 NFTs will beminted</span>&nbsp;
                            and added to the collection. And it is you who determines which ones will be selected!
                        </td>
                    </tr>
                    <tr>
                        <td style={{fontSize: "1em"}} colSpan={2}>&nbsp;</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
