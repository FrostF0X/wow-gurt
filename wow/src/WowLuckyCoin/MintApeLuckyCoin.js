import * as React from 'react'
import {useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction,} from 'wagmi'
import Navigate from "../Common/Navigate";
import {WowLuckyCoinAbi} from "./WowLuckyCoinAbi";

let initialExecute = false;

export function MintApeLuckyCoin({tokenId}) {
    const {address} = useAccount();
    const {
        config,
    } = usePrepareContractWrite({
        address: process.env.REACT_APP_WOW_LUCKY_COIN_CONTRACT_ADDRESS,
        abi: WowLuckyCoinAbi,
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
                    url={`https://opensea.io/assets/base/${process.env.REACT_APP_WOW_LUCKY_COIN_CONTRACT_ADDRESS}/${tokenId}`}/>
            ) : <button style={{textAlign: "center", width: "100%"}}>
                {status === 'idle' ? '[PROCEED IN WALLET] ⤫ [CLICK TO RETRY] ⤬' : ''}
                {status === 'loading' ? '[TRANSACTION LOADING] ⤫ [CLICK TO RETRY] ⤬' : ''}
                {status === "error" ? '[MINT ERROR] ⤫ [CLICK TO RETRY] ⤬' : ''}
            </button>
            }
        </form>
    )
}
