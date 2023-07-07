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

    beforeEach(async function () {
        wowgurt = await WowGurt.new({from: owner});
    });

    it("Should mint new token correctly", async function () {
        const transaction = await wowgurt.mintNFT(recipient, tokenURI, {from: owner});
        assert.equal(await wowgurt.ownerOf(getEventOfType(transaction, "NewWowMinted").tokenId), recipient, "Token id is not returned to contract");
    });

    it("Should update tokenURI correctly", async function () {
        const transaction = await wowgurt.mintNFT(recipient, tokenURI, {from: owner});
        assert.equal(await wowgurt.tokenURI(getEventOfType(transaction, "NewWowMinted").tokenId), tokenURI, "Token URI is set correctly");
    });
});
