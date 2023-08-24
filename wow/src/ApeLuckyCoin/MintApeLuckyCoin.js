import * as React from 'react'
import {useState} from 'react'
import {useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction,} from 'wagmi'
import Navigate from "../Common/Navigate";
import {ApeLuckyCoinAbi} from "./ApeLuckyCoinAbi";

let initialExecute = false;

export function MintApeLuckyCoin() {
    const {address} = useAccount();
    const {
        config,
    } = usePrepareContractWrite({
        address: process.env.REACT_APP_APE_LUCKY_COIN_CONTRACT_ADDRESS,
        abi: ApeLuckyCoinAbi,
        functionName: 'mint',
        args: [address, 1],
    })
    const [minted] = useState([`???`]);
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
                <Navigate url={`/${minted}`}/>
            ) : <button style={{textAlign: "center", width: "100%"}}>
                {status === 'idle' ? '[PROCEED IN WALLET] [CLICK TO RETRY]' : ''}
                {status === 'loading' ? '[TRANSACTION LOADING] [CLICK TO RETRY]' : ''}
                {status === "error" ? '[MINT ERROR] [CLICK TO RETRY]' : ''}
            </button>
            }
        </form>
    )
}
