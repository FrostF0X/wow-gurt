const Web3 = require('web3');
const {readFileSync} = require("fs");
const web3 = new Web3('http://localhost:7545'); // Replace with your node URL

const demoContractABI = JSON.parse(readFileSync("./build/contracts"));
const demoContractAddress = '0xC3f0510D0425588463F55d8882d32b73e91815C5'; // Replace this with your contract's deployed address

// Create a contract instance
const demoContract = new web3.eth.Contract(demoContractABI, demoContractAddress);

// Set the default account from which transactions will be sent
web3.eth.defaultAccount = '0xC3f0510D0425588463F55d8882d32b73e91815C5'; // Replace this with one of your accounts

// Call the echo function
demoContract.methods.echo('Hello, World!').send({from: web3.eth.defaultAccount})
    .then(receipt => {
        console.log(receipt);
    })
    .catch(err => {
        console.error(err);
    });

// Listen for the Echo event
demoContract.events.Echo({fromBlock: 0}, (error, event) => {
    console.log(event);
});
