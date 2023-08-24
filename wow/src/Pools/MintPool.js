import * as React from 'react'
import {useState} from 'react'
import {useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction,} from 'wagmi'
import WowSummerPools10GamesPass from './10GamesPass.json';
import Navigate from "../Common/Navigate";
import * as ethers from "viem";

let initialExecute = false;

export function MintPool({}) {
    useAccount();
    console.log(process.env.REACT_APP_WOW_SUMMER_POOLS_10_GAMES_PASS_CONTRACT_ADDRESS);
    const {
        config,
    } = usePrepareContractWrite({
        address: process.env.REACT_APP_WOW_SUMMER_POOLS_10_GAMES_PASS_CONTRACT_ADDRESS,
        abi: WowSummerPools10GamesPass,
        functionName: 'mint',
        value: ethers.parseEther(('0.000333').toString()),
        args: [1],
    });
    const [minted, setMinted] = useState([`???`]);
    useContractRead({
        address: process.env.REACT_APP_WOW_SUMMER_POOLS_10_GAMES_PASS_CONTRACT_ADDRESS,
        abi: WowSummerPools10GamesPass,
        functionName: 'totalSupply',
        onSuccess() {
            setMinted('Minted!');
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
