import React from "react";

export default class Price extends React.Component {
    render() {
        return (
            <div className={"price"}
                 onClick={() => window.scroll(0, 1000)}
                 style={{
                     textAlign: "center",
                     textTransform: "uppercase",
                     fontFamily: 'Machina r',
                     width: "100%",
                 }}
            >
                <table className={"padded"}>
                    <thead>
                    <tr>
                        <th colSpan={2}>
                            <span className="text-highlight">What about price?</span><br/>
                            <span className={"price-first-free"}>first 999 WOW are <span
                                className="text-highlight">free</span></span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={{textAlign: "right"}}>1000 - 1999 WOW</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.01 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>2000 - 2999 WOW</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.02 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>3000 - 3999 WOW</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.025 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>4000 - 4999 WOW</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.05 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>5000 - 5999 WOW</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.10 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>6000 - 6999 WOW</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.15 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>7000 - 7999 WOW</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.25 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>8000 - 8999 WOW</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>0.5 ETH
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "right"}}>9000 - 9999 WOW</td>
                        <td style={{textAlign: "left"}}
                            className={"text-highlight-cool"}>1 ETH
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
