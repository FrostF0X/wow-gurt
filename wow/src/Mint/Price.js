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
                        <th colSpan={6}>
                            <span className="text-highlight">What about price?</span><br/>
                            <span className={"price-first-free"}>first 999 WOW are <span
                                className="text-highlight">free</span></span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1000</td>
                        <td style={{textAlign: "center"}}>-</td>
                        <td>1999</td>
                        <td>WOW</td>
                        <td className={"text-highlight-cool"}>0.01
                        </td>
                        <td>ETH
                        </td>
                    </tr>
                    <tr>
                        <td>2000</td>
                        <td style={{textAlign: "center"}}>-</td>
                        <td>2999</td>
                        <td>WOW</td>
                        <td className={"text-highlight-cool"}>0.02
                        </td>
                        <td>ETH
                        </td>
                    </tr>
                    <tr>
                        <td>3000</td>
                        <td style={{textAlign: "center"}}>-</td>
                        <td>3999</td>
                        <td>WOW</td>
                        <td className={"text-highlight-cool"}>0.025
                        </td>
                        <td>ETH
                        </td>
                    </tr>
                    <tr>
                        <td>4000</td>
                        <td style={{textAlign: "center"}}>-</td>
                        <td>4999</td>
                        <td>WOW</td>
                        <td className={"text-highlight-cool"}>0.05
                        </td>
                        <td>ETH
                        </td>
                    </tr>
                    <tr>
                        <td>5000</td>
                        <td style={{textAlign: "center"}}>-</td>
                        <td>5999</td>
                        <td>WOW</td>
                        <td className={"text-highlight-cool"}>0.10
                        </td>
                        <td>ETH
                        </td>
                    </tr>
                    <tr>
                        <td>6000</td>
                        <td style={{textAlign: "center"}}>-</td>
                        <td>6999</td>
                        <td>WOW</td>
                        <td className={"text-highlight-cool"}>0.15
                        </td>
                        <td>ETH
                        </td>
                    </tr>
                    <tr>
                        <td>7000</td>
                        <td style={{textAlign: "center"}}>-</td>
                        <td>7999</td>
                        <td>WOW</td>
                        <td className={"text-highlight-cool"}>0.25
                        </td>
                        <td>ETH
                        </td>
                    </tr>
                    <tr>
                        <td>8000</td>
                        <td style={{textAlign: "center"}}>-</td>
                        <td>8999</td>
                        <td>WOW</td>
                        <td className={"text-highlight-cool"}>0.5
                        </td>
                        <td>ETH
                        </td>
                    </tr>
                    <tr>
                        <td>9000</td>
                        <td style={{textAlign: "center"}}>-</td>
                        <td>9999</td>
                        <td>WOW</td>
                        <td className={"text-highlight-cool"}>1
                        </td>
                        <td>ETH
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
