// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/WowSummerPool.sol";


contract WowSummerPoolDeploy is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        WowSummerPool nft = new WowSummerPool();
        AddressGenerator gen = new AddressGenerator();
        gen.generateAddresses()
        vm.stopBroadcast();
    }
}

contract AddressGenerator {

    address[] public generatedAddresses;

    function generateAddresses() public {
        // Clear the list (in case the function was called before)
        delete generatedAddresses;

        // Generate 30,000 pseudo-random addresses
        for (uint i = 0; i < 30000; i++) {
            // This will create a pseudo-random address using current block information and loop counter
            address generatedAddress = address(uint160(uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, i)))));
            generatedAddresses.push(generatedAddress);
        }
    }

    function getGeneratedAddresses() external view returns (address[] memory) {
        return generatedAddresses;
    }
}
