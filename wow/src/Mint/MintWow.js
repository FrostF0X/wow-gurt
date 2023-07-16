import * as React from 'react'
import {useState} from 'react'
import {useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction,} from 'wagmi'
import WowGurt from './WowGurt.json';
import Navigate from "../Common/Navigate";

let initialExecute = false;

export function MintWow({url, signature}) {
    const {address} = useAccount();
    const {
        config,
        prepareError,
        isPrepareError,
    } = usePrepareContractWrite({
        address: process.env.REACT_APP_CONTRACT_ADDRESS,
        abi: WowGurt.abi,
        functionName: 'mintNFT',
        args: [address, url, signature],
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
    const {data, error, isError, write} = useContractWrite(config)

    const {isLoading, isSuccess, isIdle} = useWaitForTransaction({
        hash: data?.hash,
    })

    if (write && !initialExecute) {
        write();
        initialExecute = true;
    }
    let loading = isIdle || isLoading;
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                write?.()
            }}
        >
            {isSuccess ? (
                <Navigate url={`/wow/${minted}`}/>
            ) : <button className={"btn mint-btn"} disabled={!write || loading}>
                {loading ? 'Minting...' : 'MINT WOW'}
            </button>
            }
            {(isPrepareError || isError) && (
                <div>Error: {(prepareError || error)?.message}</div>
            )}
        </form>
    )
}
