import React from "react";

export default class HowToWOW extends React.Component {
    render() {
        return <div className={"how-to-wow"}
                    onClick={() => window.scroll(0, 1000)}
                    style={{
                        textAlign: "center",
                        width: "100%",
                    }}>
            <table className={"padded"}>
                <thead>
                <tr>
                    <th colSpan={2} style={{textTransform: "uppercase"}}>
                        <span className="text-highlight">How to WOW?</span><br/>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        1)
                    </td>
                    <td>
                        Connect your wallet.
                    </td>
                </tr>
                <tr >
                    <td>
                        2)
                    </td>
                    <td>
                        Click <img style={{marginBottom: '-2px', display: "inline-block", width: "1em",
                        'filter': 'invert(52%) sepia(87%) saturate(657%) hue-rotate(96deg) brightness(92%) contrast(97%)'}} src="/refresh.svg"
                                   alt=""/> button to reroll tiles,
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>colors and animation breath.</td>
                </tr>
                <tr>
                    <td>
                        3)
                    </td>
                    <td>
                        Click on tile to reroll specif tile.
                    </td>
                </tr>
                <tr>
                    <td>
                        4)
                    </td>
                    <td>
                        Click Mint.
                    </td>
                </tr>
                <tr>
                    <td>
                        5)
                    </td>
                    <td>
                        Wait for minting.
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    }
}
