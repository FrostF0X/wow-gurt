import WowGurt from "./WowGurt.json";
import {useContractRead} from "wagmi";
import {useState} from "react";

export default function Minted() {
    const [minted, setMinted] = useState([`???`]);
    useContractRead({
        address: process.env.REACT_APP_CONTRACT_ADDRESS,
        abi: WowGurt.abi,
        functionName: 'totalSupply',
        onSuccess(data) {
            setMinted(String(parseInt(data)));
        },
    });
    return <div style={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        fontFamily: "Machina r",
        fontSize: "1.25em",
        padding: "0 10px"
    }}>
        <div>Mint:</div>
        <div style={{width: '166px', textAlign: 'right'}}><span
            className="text-highlight-cool">{parseInt(minted) + 1}</span> / 9999
        </div>
    </div>
}
