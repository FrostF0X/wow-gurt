// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "../src/WowSummerPool.sol";


contract WowSummerPoolDeploy is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        WowSummerPool nft = WowSummerPool(address(0x1A5bb078AcbB76B2D3873D6e94c5D553F2F6bD44));
        nft.mint{value: 0.00001 ether}(address(0x1A5bb078AcbB76B2D3873D6e94c5D553F2F6bD44));
        nft.withdraw();
        vm.stopBroadcast();
    }
}
