// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/ApeLuckyCoin.sol";
import "../src/ApeCoin.sol";

contract ApeLuckyCoinDeployLocal is Script {
    function setUp() public {}

    function run() public {
        address fund = vm.envAddress("FUND_ADDRESS");
        vm.startBroadcast();
        ApeCoin coin = new ApeCoin();
        ApeLuckyCoin luckyCoin = new ApeLuckyCoin();
        luckyCoin.setApeCoinContract(address(coin));
        coin.give(fund, 10000 * 1e18);
        console2.log(coin.balanceOf(fund));
        coin.approve(address(luckyCoin), 1 * 1e18);
        luckyCoin.mint(fund, 1);
        vm.stopBroadcast();
    }
}
