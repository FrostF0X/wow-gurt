// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/WowSummerPools10GamesPass.sol";


contract SendTo is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        payable(vm.envAddress("TO")).call{value: 0.00007 ether}("");
        vm.stopBroadcast();
    }
}
