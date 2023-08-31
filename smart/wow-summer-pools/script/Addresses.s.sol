// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/WowSummerPools10GamesPass.sol";


contract Addresses is Script {
    function setUp() public {}

    function run() public {
        for (uint32 i = 5; i < 75; i++) {
            uint256 privateKey = vm.deriveKey(vm.envString("MNEMONIC"), i);
            address other = vm.addr(privateKey);
            console2.log(other);
        }
    }
}
