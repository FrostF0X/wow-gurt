// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/WowLuckyCoin.sol";


contract WowLuckyCoinDeploy is Script {
    function setUp() public {}

    function run() public {
        address coin = vm.envAddress("USDC_COIN_ADDRESS");
        vm.startBroadcast();
        WowLuckyCoin luckyCoin = new WowLuckyCoin();
        luckyCoin.setUsdcCoinContract(coin);
        vm.stopBroadcast();
    }
}
