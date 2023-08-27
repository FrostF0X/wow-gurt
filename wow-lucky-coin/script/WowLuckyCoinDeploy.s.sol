// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/WowLuckyCoin.sol";


contract ApeLuckyCoinDeploy is Script {
    function setUp() public {}

    function run() public {
        address coin = vm.envAddress("USDC_COIN_ADDRESS");
        vm.startBroadcast();
        WowLuckyCoin luckyCoin = WowLuckyCoin(0xd8aCD4Fb562E4824D93bbcbf03aa8d6262dB6035);
        luckyCoin.setUsdcCoinContract(coin);
        vm.stopBroadcast();
    }
}
