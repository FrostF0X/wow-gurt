import Web3 from 'web3';

export default class Sign {
    private web3: Web3;

    constructor(private readonly privateKeyHex: string) {
        this.web3 = new Web3();
    }

    padLeft(data: string, size: number, padding: string) {
        while (data.length < size) {
            data = padding + data;
        }
        return data;
    }

    sign(message: string) {
        const signed = this.web3.eth.accounts.sign(message, this.privateKeyHex);
        return signed.signature;
    }
}
