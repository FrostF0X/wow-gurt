import * as React from 'react'
import {useState} from 'react'
import {useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction,} from 'wagmi'
import WowGurt from './WowGurt.json';
import Navigate from "../Common/Navigate";

let initialExecute = false;

export function MintWow({input, signature}) {
    const {address} = useAccount();
    const {
        config,
    } = usePrepareContractWrite({
        address: process.env.REACT_APP_CONTRACT_ADDRESS,
        abi: WowGurt.abi,
        functionName: 'mintNFT',
        args: [address, input, signature],
    })
    const [minted, setMinted] = useState([`???`]);
    useContractRead({
        address: process.env.REACT_APP_CONTRACT_ADDRESS,
        abi: WowGurt.abi,
        functionName: 'totalSupply',
        onSuccess(data) {
            setMinted(String(parseInt(data)));
        },
    });
    const writeFn = useContractWrite(config);
    const {data, status, write} = writeFn;
    useWaitForTransaction({
        hash: data?.hash,
    })

    if (write && !initialExecute) {
        write();
        initialExecute = true;
    }
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                write?.()
            }}
        >
            {status === "success" ? (
                <Navigate url={`/wow/${minted}`}/>
            ) : <button className={"btn mint-btn"} disabled={status !== "error"}>
                {status === 'idle' ? 'Proceed in Wallet' : ''}
                {status === 'loading' ? 'Transaction loading' : ''}
                {status === "error" ? 'Mint error, retry!' : ''}
            </button>
            }
        </form>
    )
}
