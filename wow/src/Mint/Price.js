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
                        <td>WOW</td>
                        <td style={{textAlign: "right"}}>1000-1999</td>
                        <td className={"text-highlight-cool"}>0.01</td>
                        <td style={{textAlign: "right"}} className={"text-highlight-cool"}>ETH</td>
                    </tr>
                    <tr>
                        <td>WOW</td>
                        <td style={{textAlign: "right"}}>2000-2999</td>
                        <td className={"text-highlight-cool"}>0.02</td>
                        <td style={{textAlign: "right"}} className={"text-highlight-cool"}>ETH</td>
                    </tr>
                    <tr>
                        <td>WOW</td>
                        <td style={{textAlign: "right"}}>3000-3999</td>
                        <td className={"text-highlight-cool"}>0.025</td>
                        <td style={{textAlign: "right"}} className={"text-highlight-cool"}>ETH</td>
                    </tr>
                    <tr>
                        <td>WOW</td>
                        <td style={{textAlign: "right"}}>4000-4999</td>
                        <td className={"text-highlight-cool"}>0.05</td>
                        <td style={{textAlign: "right"}} className={"text-highlight-cool"}>ETH</td>
                    </tr>
                    <tr>
                        <td>WOW</td>
                        <td style={{textAlign: "right"}}>5000-5999</td>
                        <td className={"text-highlight-cool"}>0.10</td>
                        <td style={{textAlign: "right"}} className={"text-highlight-cool"}>ETH</td>
                    </tr>
                    <tr>
                        <td>WOW</td>
                        <td style={{textAlign: "right"}}>6000-6999</td>
                        <td className={"text-highlight-cool"}>0.15</td>
                        <td style={{textAlign: "right"}} className={"text-highlight-cool"}>ETH</td>
                    </tr>
                    <tr>
                        <td>WOW</td>
                        <td style={{textAlign: "right"}}>7000-7999</td>
                        <td className={"text-highlight-cool"}>0.25</td>
                        <td style={{textAlign: "right"}} className={"text-highlight-cool"}>ETH</td>
                    </tr>
                    <tr>
                        <td>WOW</td>
                        <td style={{textAlign: "right"}}>8000-8999</td>
                        <td className={"text-highlight-cool"}>0.5</td>
                        <td style={{textAlign: "right"}} className={"text-highlight-cool"}>ETH</td>
                    </tr>
                    <tr>
                        <td>WOW</td>
                        <td style={{textAlign: "right"}}>9000-9999</td>
                        <td className={"text-highlight-cool"}>1</td>
                        <td style={{textAlign: "right"}} className={"text-highlight-cool"}>ETH</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
