const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const WowGurt = artifacts.require('WowGurt');

module.exports = async function (deployer) {
    await deployProxy(WowGurt, [], { deployer, initializer: 'initialize' });
};
