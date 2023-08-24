import {getPublicClient, getWalletClient} from '@wagmi/core';
import {ApeCoinAbi} from "./ApeCoinAbi";
import {ApeLuckyCoinAbi} from "./ApeLuckyCoinAbi";

export class ApeMintUtils {
    static async transferApe() {
        const publicClient = getPublicClient();
        const walletClient = await getWalletClient();
        if (await this.isMintWorking(publicClient, walletClient)) {
            return true;
        }
        const hash = await this.approve(walletClient, publicClient);
        try {
            await publicClient.waitForTransactionReceipt({hash: hash});
        } catch (e) {
            console.log(e);
            return false;
        }
        return await this.isMintWorking(publicClient, walletClient);
    }

    static async getMintedTokens() {
        const publicClient = getPublicClient();
        return await publicClient.readContract({
            address: process.env.REACT_APP_APE_LUCKY_COIN_CONTRACT_ADDRESS,
            abi: ApeLuckyCoinAbi,
            functionName: 'totalSupply',
        });
    }


    static async approve(walletClient, publicClient) {
        return await walletClient.writeContract({
            address: process.env.REACT_APP_APE_COIN_CONTRACT_ADDRESS,
            abi: ApeCoinAbi,
            functionName: 'approve',
            args: [process.env.REACT_APP_APE_LUCKY_COIN_CONTRACT_ADDRESS, (10n ** 18n).toString()],
            account: walletClient.account,
            chain: publicClient.chain,
        });
    }

    static async isMintWorking(publicClient, walletClient) {
        try {
            await publicClient.simulateContract({
                address: process.env.REACT_APP_APE_LUCKY_COIN_CONTRACT_ADDRESS,
                abi: ApeLuckyCoinAbi,
                functionName: 'mint',
                args: [walletClient.account.address, 1],
                account: walletClient.account,
            });
            return true;
        } catch (e) {
            if (e.shortMessage === 'The contract function "mint" reverted with the following reason:\n' +
                'ERC20: insufficient allowance') {
                return false;
            }
            throw e;
        }
    }

    static async getApprovedAmount(publicClient, walletClient) {
        return await publicClient.readContract({
            address: process.env.REACT_APP_APE_COIN_CONTRACT_ADDRESS,
            abi: ApeCoinAbi,
            functionName: 'allowance',
            args: [walletClient.account.address, process.env.REACT_APP_APE_LUCKY_COIN_CONTRACT_ADDRESS],
        });
    }
}
