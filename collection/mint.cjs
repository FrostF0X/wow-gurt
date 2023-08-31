const ethers = require("ethers");

async function distributeFunds(mnemonic, rpcUrl, contractAddress, mintFunctionSignature, wallets) {
    // Initialize a provider for the Ethereum RPC URL
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    // Create a wallet from the mnemonic
    const mainWallet = ethers.Wallet.fromMnemonic(mnemonic).connect(provider);

    const derivedWallets = [];
    for (let i = 75; i < wallets + 75; i++) {
        const derivedWallet = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i}`).connect(provider);
        derivedWallets.push(derivedWallet);
    }


    // Send funds from main wallet to each derived address
    for (let wallet of derivedWallets) {
        const tx = {
            to: wallet.address,
            value: ethers.utils.parseEther("0.00005")  // Sending 1 ether as an example. Adjust as needed.
        };
        console.log(`Sending to address ${wallet.address}`);

        const result = await mainWallet.sendTransaction(tx);
        await result.wait();
    }

    // Execute mint transaction on a specific contract for each derived wallet
    const contractInterface = new ethers.utils.Interface([
        mintFunctionSignature // e.g., 'function mint(address to, uint256 amount)'
    ]);


    for (let wallet of derivedWallets) {
        try {
            const contract = new ethers.Contract(contractAddress, contractInterface, wallet);
            const mintTx = await contract.mint();
            await mintTx.wait();
        } catch (e) {
            console.log(e);
        }
    }

    console.log("Funds distributed and tokens minted successfully!");
}

const MNEMONIC = 'bus connect grunt recipe until lion meat mystery rifle inspire female confirm';
const RPC_URL = "https://rpc.ankr.com/base/3af1b873a20ee560b8c5a2afb845edb469296b68270ab68cc54494d166aa30e8";
const CONTRACT_ADDRESS = "0x69416B63e970a615b5396ddD1eb193A0C35A3F08";
const MINT_FUNCTION_SIGNATURE = "function mint()";

distributeFunds(MNEMONIC, RPC_URL, CONTRACT_ADDRESS, MINT_FUNCTION_SIGNATURE, 20);
