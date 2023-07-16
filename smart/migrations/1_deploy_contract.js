const WowGurt = artifacts.require("WowGurt");

module.exports = function (deployer) {
    deployer.deploy(WowGurt, process.env.SERVER_ADDRESS);
};
