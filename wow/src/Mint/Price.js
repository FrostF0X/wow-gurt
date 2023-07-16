import React from "react";

export default class Price extends React.Component {
    render() {
        return (
            <div className={"price"}
                 style={{
                     textAlign: "center",
                     textTransform: "uppercase",
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
                        <th colSpan={2}>
                            <span className="text-highlight">how it works?</span><br/>
                            first 500 NFT are <span
                            className="text-highlight">free</span>
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
                        <td style={{textAlign: "right"}}>500 - 1000 NFT</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.005 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>1000 - 2000 NFT</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.01 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>2000 - 3000 NFT</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.02 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>3000 - 4000 NFT</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.025 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>4000 - 5000 NFT</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.05 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>5000 - 6000 NFT</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.10 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>6000 - 7000 NFT</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.15 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>7000 - 8000 NFT</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.25 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>8000 - 9000 NFT</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.5 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>9000 - 10 000 NFT</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>1 ETH
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
