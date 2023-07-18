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
    const serverAddress = '0xfd3c9c16e5b8efaa49ecb7e31b781994d5761d51';
    const privateKey = '0xb4c8c92a93385e6a11a05de751676691f310f029cef7e1a6758a1a391f60bafa';
    const wrongPrivateKey = '0x2959efc611bcecfbf86395032eb36e222716974d9ae3692b486cc837f6d25f4e';

    beforeEach(async function () {
        wowgurt = await WowGurt.new(serverAddress, {from: owner});
    });

    it("Should mint new token correctly", async function () {
        const transaction = await wowgurt.mintNFT(recipient, tokenURI, {from: owner});
        assert.equal(await wowgurt.ownerOf(getEventOfType(transaction, "NewWowMinted").tokenId), recipient, "Token id is not returned to contract");
    });

    it("Should set tokenURI correctly", async function () {
        const signature = web3.eth.accounts.sign(tokenURI, privateKey);
        const transaction = await wowgurt.mintNFT(recipient, tokenURI, signature.signature, {from: owner});
        assert.equal(await wowgurt.tokenURI(getEventOfType(transaction, "NewWowMinted").tokenId), tokenURI, "Token URI is set correctly");
    });

    it("test that signed messages are accepted by smart contract", async () => {
        const signature = web3.eth.accounts.sign(tokenURI, privateKey);
        const transaction = await wowgurt.mintNFT(recipient, tokenURI, signature.signature, {from: owner});
        assert.equal(await wowgurt.tokenURI(getEventOfType(transaction, "NewWowMinted").tokenId), tokenURI, "Token URI is set correctly");
    });

    it("test that wrong signed messages are not accepted by smart contract", async () => {
        await expectRevert(wowgurt.mintNFT(recipient, tokenURI, "lol", {from: owner}), "invalid arrayify value (argument=\"value\", value=\"0x0l\", code=INVALID_ARGUMENT, version=bytes/5.6.1)");
    });

    it("test that wrong PK signed messages are not accepted by smart contract", async () => {
        const signature = web3.eth.accounts.sign(tokenURI, wrongPrivateKey);
        await expectRevert(wowgurt.mintNFT(recipient, tokenURI, signature.signature, {from: owner}), "Unauthorized mint attempt.");
    });

    it("test that wrong data signed messages are not accepted by smart contract", async () => {
        const signature = web3.eth.accounts.sign(tokenURI, wrongPrivateKey);
        await expectRevert(wowgurt.mintNFT(recipient, "random data", signature.signature, {from: owner}), "Unauthorized mint attempt.");
    });

    it("test cannot mint same nft 2 times", async () => {
        const signature = web3.eth.accounts.sign(tokenURI, privateKey);
        await wowgurt.mintNFT(recipient, tokenURI, signature.signature, {from: owner});
        await expectRevert(wowgurt.mintNFT(recipient, tokenURI, signature.signature, {from: owner}), "NFT with same tokenURI already exists.");
    })

    it("test increases total supply when minted", async () => {
        assert.equal(await wowgurt.totalSupply({from: owner}), 0, "Total supply should be initiated with 0");
        await mint("0");
        assert.equal(await wowgurt.totalSupply({from: owner}), 1, "Total supply should be 1 after minting 1 nft");
    });

    it("test requires minimal transaction amount after 999 attempt", async () => {
        for (let i = 0; i < 19; i++) {
            await mintMany("0", 50);
        }
        await mintMany("0", 49);
        await expectRevert(mint("0"), "Ether sent is not sufficient.")
        await mint("0.005");
        await assert.equal(await web3.eth.getBalance(wowgurt.address), web3.utils.toWei("0.005"), "Transaction price should be payed");
        const current = await web3.eth.getBalance(owner);
        await wowgurt.withdraw({from: owner})
        const newB = await web3.eth.getBalance(owner)
        await assert.isAbove(newB - current, parseInt(web3.utils.toWei("0.0049")), "Balance should be more after withdraw");
    })

    function mint(amount) {
        let tokenURI = crypto.randomUUID();
        const signature = web3.eth.accounts.sign(tokenURI, privateKey);
        return wowgurt.mintNFT(recipient, tokenURI, signature.signature, {
            from: owner, value: web3.utils.toWei(amount, 'ether')
        });

    }

    function mintMany(amount, x) {
        return Promise.all([...Array(x)].map(() => mint(amount)));
    }

    it("test passes all amounts", async () => {
        for (let i = 0; i < 10; i++) {
            await mintMany("0", 50);
        }
        for (let i = 0; i < 10; i++) {
            await mintMany("0.005", 50);
        }
        for (let i = 0; i < 20; i++) {
            await mintMany("0.01", 50);
        }
        for (let i = 0; i < 20; i++) {
            await mintMany("0.02", 50);
        }
        for (let i = 0; i < 20; i++) {
            await mintMany("0.025", 50);
        }
        for (let i = 0; i < 20; i++) {
            await mintMany("0.05", 50);
        }
        for (let i = 0; i < 20; i++) {
            await mintMany("0.1", 50);
        }
        for (let i = 0; i < 20; i++) {
            await mintMany("0.15", 50);
        }
        for (let i = 0; i < 20; i++) {
            await mintMany("0.25", 50);
        }
        for (let i = 0; i < 20; i++) {
            await mintMany("0.5", 50);
        }
        for (let i = 0; i < 20; i++) {
            await mintMany("1", 50);
        }
        await assert.greaterThan(await web3.eth.getBalance(wowgurt.address), web3.utils.toWei('2107'), "After transactions nft should be 2107.5");
        await expectRevert(mint("1", "No more NFTs available for minting."));
    })

});
