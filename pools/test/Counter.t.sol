// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import "../src/WowSummerPool.sol";

contract WowSummerPoolTest is Test {
    WowSummerPool public counter;

    function setUp() public {
        counter = new WowSummerPool();
    }

    function testIncrement() public {
    }

    function testSetNumber(uint256 x) public {
        assertEq(x, x);
    }
}
