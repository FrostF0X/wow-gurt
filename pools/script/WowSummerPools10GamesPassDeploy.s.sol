// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/WowSummerPools10GamesPass.sol";


contract WowSummerPools10GamesPassDeploy is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        WowSummerPools10GamesPass nft = WowSummerPools10GamesPass(address(0x3C312F3c5997472A4203E8E1269385e604e36949));
        nft.mint{value: 0.000333 ether}(1);
        vm.stopBroadcast();
    }
}
