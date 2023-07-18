import WowGurt from "./WowGurt.json";
import {useContractRead} from "wagmi";
import {useState} from "react";

export default function Minted(props) {
    const [minted, setMinted] = useState([`???`]);
    useContractRead({
        address: process.env.REACT_APP_CONTRACT_ADDRESS,
        abi: WowGurt.abi,
        functionName: 'totalSupply',
        onSuccess(data) {
            let minted = String(parseInt(data));
            setMinted(minted);
            props.setMinted(minted);
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
            className="text-highlight-cool">{parseInt(minted)}</span> / 9999
        </div>
    </div>
}
