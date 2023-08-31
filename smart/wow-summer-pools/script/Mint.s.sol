// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/ERC721Token.sol";


contract Mint is Script {
    function setUp() public {}

    function run() public {
        ERC721Token nft = ERC721Token(vm.envAddress("MINT"));

        vm.startBroadcast();
        nft.mint();
        vm.stopBroadcast();
    }
}
