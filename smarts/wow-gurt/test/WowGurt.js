const {expectRevert} = require('@openzeppelin/test-helpers');
const crypto = require('crypto');
// const {toWei, eth} = require("web3");
const WowGurt = artifacts.require("WowGurt");

function getEventOfType(transaction, event) {
    let found = [...transaction.logs].find(t => t.event === event);
    return found ? found.args : new Error(`Event ${event} is not emitted during transaction`);
}

contract("WowGurt", function (accounts) {
    let wowgurt;
    const owner = accounts[0];
    const recipient = accounts[1];
    const tokenURI = "tokenURI";
    const tokenURI2 = "tokenURI2";
    const serverAddress = '0xfd3c9c16e5b8efaa49ecb7e31b781994d5761d51';
    const privateKey = '0xb4c8c92a93385e6a11a05de751676691f310f029cef7e1a6758a1a391f60bafa';
    const wrongPrivateKey = '0x2959efc611bcecfbf86395032eb36e222716974d9ae3692b486cc837f6d25f4e';

    beforeEach(async function () {
        wowgurt = await WowGurt.new(serverAddress, {from: owner});
    });

    it("Cannot mint with not proper input", async function () {
        const input = wrongInput(tokenURI);
        const signature = web3.eth.accounts.sign(input, privateKey);
        await expectRevert(wowgurt.mintNFT(recipient, input, signature.signature, {from: owner}), "VM Exception while processing transaction: revert");
    })

    it("Can mint with proper input", async function () {
        const {input, signature} = fullInput();
        const transaction = await wowgurt.mintNFT(recipient, input, signature, {from: owner});
        assert.equal(await wowgurt.ownerOf(getEventOfType(transaction, "NewWowMinted").tokenId), recipient, "Token id is not returned to contract");
    })

    it("test cannot mint same nft 2 times", async () => {
        const input1 = input(tokenURI);
        const input2 = input(tokenURI);
        const signature1 = web3.eth.accounts.sign(input1, privateKey);
        await wowgurt.mintNFT(recipient, input1, signature1.signature, {from: owner});
        const signature2 = web3.eth.accounts.sign(input2, privateKey);
        await expectRevert(wowgurt.mintNFT(recipient, input2, signature2.signature, {from: owner}), "NFT with same tokenURI already exists.");
    })

    it("Should mint new token correctly", async function () {
        const {input, signature} = fullInput();
        const transaction = await wowgurt.mintNFT(recipient, input, signature, {from: owner});
        assert.equal(await wowgurt.ownerOf(getEventOfType(transaction, "NewWowMinted").tokenId), recipient, "Token id is not returned to contract");
    });

    it("Should set tokenURI correctly", async function () {
        await mint();
        const {input, signature, tokenURI} = fullInput();
        const transaction = await wowgurt.mintNFT(recipient, input, signature, {from: owner});
        assert.equal(await wowgurt.tokenURI(getEventOfType(transaction, "NewWowMinted").tokenId), `${tokenURI}&tokenId=2`, "Token URI is set correctly");
    });

    it("test that signed messages are accepted by smart contract", async () => {
        await mint();
        const {input, signature, tokenURI} = fullInput();
        const transaction = await wowgurt.mintNFT(recipient, input, signature, {from: owner});
        assert.equal(await wowgurt.tokenURI(getEventOfType(transaction, "NewWowMinted").tokenId), `${tokenURI}&tokenId=2`, "Token URI is set correctly");
    });

    it("test that wrong signed messages are not accepted by smart contract", async () => {
        await expectRevert(wowgurt.mintNFT(recipient, fullInput().input, "lol", {from: owner}), "invalid arrayify value (argument=\"value\", value=\"0x0l\", code=INVALID_ARGUMENT, version=bytes/5.6.1)");
    });

    it("test that wrong PK signed messages are not accepted by smart contract", async () => {
        const {input} = fullInput();
        const signature = web3.eth.accounts.sign(input, wrongPrivateKey);
        await expectRevert(wowgurt.mintNFT(recipient, input, signature.signature, {from: owner}), "Unauthorized mint attempt.");
    });

    it("test that wrong data signed messages are not accepted by smart contract", async () => {
        const signature = web3.eth.accounts.sign(input(tokenURI), privateKey);
        await expectRevert(wowgurt.mintNFT(recipient, input(tokenURI2), signature.signature, {from: owner}), "Unauthorized mint attempt.");
    });

    it("test increases total supply when minted", async () => {
        assert.equal(await wowgurt.totalSupply({from: owner}), 1, "Total supply should be initiated with 1");
        await mint("0");
        assert.equal(await wowgurt.totalSupply({from: owner}), 2, "Total supply should be 2 after minting 1 nft");
    });

    it("cannot withdraw by not owner", async () => {
        await expectRevert(wowgurt.withdraw({from: recipient}), 'Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.');
    });

    it("test requires minimal transaction amount after 999 attempt", async () => {
        for (let i = 1; i < 1000; i++) {
            await mint("0");
        }
        await expectRevert(mint("0"), "Ether sent is not sufficient.")
        await mint("0.01");
        await assert.equal(await web3.eth.getBalance(wowgurt.address), web3.utils.toWei("0.01"), "Transaction price should be payed");
        const current = await web3.eth.getBalance(owner);
        await wowgurt.withdraw({from: owner})
        const newB = await web3.eth.getBalance(owner)
        await assert.isAbove(newB - current, parseInt(web3.utils.toWei("0.0099")), "Balance should be more after withdraw");
    })

    function mint(amount) {
        if (!amount) {
            amount = "0";
        }
        const {input, signature} = fullInput();
        return wowgurt.mintNFT(recipient, input, signature, {
            from: owner, value: web3.utils.toWei(amount, 'ether')
        });

    }

    function input(tokenURI) {
        const types = ['string'];
        const values = [tokenURI];
        return web3.eth.abi.encodeParameters(types, values);
    }

    function wrongInput(tokenURI) {
        const types = ['uint256', 'string'];
        const values = [1, tokenURI];
        return web3.eth.abi.encodeParameters(types, values);
    }

    function fullInput() {
        let tokenURI = crypto.randomUUID();
        const in1 = input(tokenURI);
        const signature = web3.eth.accounts.sign(in1, privateKey);
        return {input: in1, tokenURI, signature: signature.signature};
    }
});
