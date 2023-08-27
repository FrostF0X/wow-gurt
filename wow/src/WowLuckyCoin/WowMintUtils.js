import {getPublicClient, getWalletClient} from '@wagmi/core';
import {WowCoinAbi} from "./WowCoinAbi";
import {WowLuckyCoinAbi} from "./WowLuckyCoinAbi";
import NotEnoughApeCoin from "./NotEnoughApeCoin";

export class WowMintUtils {
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
            address: process.env.REACT_APP_WOW_LUCKY_COIN_CONTRACT_ADDRESS,
            abi: WowLuckyCoinAbi,
            functionName: 'totalSupply',
        });
    }


    static async approve(walletClient, publicClient) {
        return await walletClient.writeContract({
            address: process.env.REACT_APP_USDC_COIN_CONTRACT_ADDRESS,
            abi: WowCoinAbi,
            functionName: 'approve',
            args: [process.env.REACT_APP_WOW_LUCKY_COIN_CONTRACT_ADDRESS, (10n ** 6n).toString()],
            account: walletClient.account,
            chain: publicClient.chain,
        });
    }

    static async isMintWorking(publicClient, walletClient) {
        try {
            await publicClient.simulateContract({
                address: process.env.REACT_APP_WOW_LUCKY_COIN_CONTRACT_ADDRESS,
                abi: WowLuckyCoinAbi,
                functionName: 'mint',
                args: [walletClient.account.address, 1],
                account: walletClient.account,
            });
            return true;
        } catch (e) {
            console.log(e.shortMessage);
            if (e.shortMessage === 'The contract function "mint" reverted with the following reason:\n' +
                'ERC20: insufficient allowance') {
                return false;
            }
            if (e.shortMessage === 'The contract function "mint" reverted with the following reason:\n' +
                'ERC20: transfer amount exceeds balance') {
                throw new NotEnoughApeCoin();
            }
            if (e.shortMessage === 'The contract function "mint" reverted with the following reason:\n' +
                'ERC20: transfer amount exceeds allowance') {
                return false;
            }
            throw e;
        }
    }

    static async getApprovedAmount(publicClient, walletClient) {
        return await publicClient.readContract({
            address: process.env.REACT_APP_USDC_COIN_CONTRACT_ADDRESS,
            abi: WowCoinAbi,
            functionName: 'allowance',
            args: [walletClient.account.address, process.env.REACT_APP_WOW_LUCKY_COIN_CONTRACT_ADDRESS],
        });
    }
}