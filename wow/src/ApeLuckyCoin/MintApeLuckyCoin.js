import * as React from 'react'
import {useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction,} from 'wagmi'
import Navigate from "../Common/Navigate";
import {ApeLuckyCoinAbi} from "./ApeLuckyCoinAbi";

let initialExecute = false;

export function MintApeLuckyCoin({tokenId}) {
    const {address} = useAccount();
    const {
        config,
    } = usePrepareContractWrite({
        address: process.env.REACT_APP_APE_LUCKY_COIN_CONTRACT_ADDRESS,
        abi: ApeLuckyCoinAbi,
        functionName: 'mint',
        args: [address, 1],
    })
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
                <Navigate
                    url={`https://rarible.com/token/polygon/0xd8acd4fb562e4824d93bbcbf03aa8d6262db6035:2`}/>
            ) : <button style={{textAlign: "center", width: "100%"}}>
                {status === 'idle' ? '[PROCEED IN WALLET] ⤫ [CLICK TO RETRY] ⤬' : ''}
                {status === 'loading' ? '[TRANSACTION LOADING] ⤫ [CLICK TO RETRY] ⤬' : ''}
                {status === "error" ? '[MINT ERROR] ⤫ [CLICK TO RETRY] ⤬' : ''}
            </button>
            }
        </form>
    )
}
