import * as React from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction, useAccount,
} from 'wagmi'
import WowGurt from './WowGurt.json';

export function MintWow(props) {
    const {address} = useAccount();
    const {
        config,
        prepareError: prepareError,
        isPrepareError: isPrepareError,
    } = usePrepareContractWrite({
        address: process.env.REACT_APP_CONTRACT_ADDRESS,
        abi: WowGurt.abi,
        functionName: 'mintNFT',
        args: [address, props.url],
    })
    const {data, error, isError, write} = useContractWrite(config)

    const {isLoading, isSuccess} = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                write?.()
            }}
        >
            <button className={"mint-btn"} disabled={!write || isLoading}>
                {isLoading ? 'Minting...' : 'Mint WoW'}
            </button>
            {isSuccess && (
                <div>
                    Successfully minted your NFT!
                    <div>
                        <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                    </div>
                </div>
            )}
            {(isPrepareError || isError) && (
                <div>Error: {(prepareError || error)?.message}</div>
            )}
        </form>
    )
}
