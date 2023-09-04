// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/USDCCoin.sol";
import "../src/WowLuckyCoin.sol";

contract WowLuckyCoinDeployLocal is Script {
    function setUp() public {}

    function run() public {
        address fund = vm.envAddress("FUND_ADDRESS");
        vm.startBroadcast();
        USDCCoin coin = new USDCCoin();
        WowLuckyCoin luckyCoin = new WowLuckyCoin();
        luckyCoin.setUsdcCoinContract(address(coin));
        coin.give(fund, 10000 * 1e6);
        console2.log(coin.balanceOf(fund));
        coin.approve(address(luckyCoin), 1 * 1e6);
        luckyCoin.mint(fund, 1);
        vm.stopBroadcast();
    }
}
