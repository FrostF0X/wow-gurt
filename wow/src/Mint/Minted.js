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
    return <div style={{display: "flex", justifyContent: "space-around", flexDirection: "row", fontFamily: "Machina r", padding: "0 10px"}}>
        <div>Minted:</div>
        <div style={{width: '166px', textAlign: 'right'}}><span className="text-highlight-cool">{minted}</span> / 10000</div>
    </div>
}
