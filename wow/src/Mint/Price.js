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
                        <th colSpan={4}>
                            <span className="text-highlight">What about price?</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className={"section"}>
                        <td style={{textAlign: "left"}}>first</td>
                        <td style={{textAlign: "center"}}>999</td>
                        <td style={{textAlign: "center"}}
                            className={"text-highlight-cool"}>are
                        </td>
                        <td style={{textAlign: "right"}}
                            className={"text-highlight-cool"}>FREE
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: "left", paddingTop: "0.5em"}}>NEXT</td>
                        <td style={{textAlign: "center"}}>9000</td>
                        <td style={{textAlign: "center"}}
                            className={"text-highlight-cool"}>0.01
                        </td>
                        <td style={{textAlign: "right"}}
                            className={"text-highlight-cool"}>ETH
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
