const Wallet = require('ethereumjs-wallet').default;

const wallet = Wallet.generate();

console.log("Private Key: " + wallet.getPrivateKeyString());
console.log("Public Key: " + wallet.getPublicKeyString());
console.log("Address: " + wallet.getAddressString());
