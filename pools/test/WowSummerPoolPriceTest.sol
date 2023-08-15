// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import "../src/WowSummerPool.sol";

contract WowSummerPoolTest is Test {
    WowSummerPool public pool;
    address public owner;
    address public rich;

    function setUp() public {
        owner = vm.addr(1);
        rich = vm.addr(3);
        vm.prank(owner);
        vm.deal(owner, 1 ether);
        vm.deal(rich, 100000 ether);
        pool = new WowSummerPool();
    }

    function testMintCannotBeFree() public {
        vm.expectRevert("Ether sent is not sufficient.");
        pool.mintTo(owner);
    }


    function testCanMintStages() public {
        vm.expectRevert("Ether sent is not sufficient.");
        pool.mintTo{value: 0.00099999 ether}(owner);

        mintTimesWithValue(999, 0.001 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        mintTimesWithValue(1, 0.00199999 ether);

        mintTimesWithValue(1000, 0.002 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        mintTimesWithValue(1, 0.00299999 ether);

        mintTimesWithValue(1000, 0.003 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        mintTimesWithValue(1, 0.00399999 ether);

        mintTimesWithValue(1000, 0.004 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        mintTimesWithValue(1, 0.00499999 ether);

        mintTimesWithValue(1000, 0.005 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        mintTimesWithValue(1, 0.00599999 ether);

        mintTimesWithValue(1000, 0.006 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        mintTimesWithValue(1, 0.00699999 ether);

        mintTimesWithValue(1000, 0.007 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        mintTimesWithValue(1, 0.00799999 ether);

        mintTimesWithValue(1000, 0.008 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        mintTimesWithValue(1, 0.00899999 ether);

        mintTimesWithValue(1000, 0.009 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        mintTimesWithValue(1, 0.00999999 ether);

        mintTimesWithValue(1000, 0.01 ether);
        vm.expectRevert("No more NFTs available for minting.");
        mintTimesWithValue(1, 1 ether);
    }


    function testOnlyOwnerCanWithdraw() public {
        vm.expectRevert("Not the contract owner");
        vm.prank(rich);
        pool.withdraw();
    }

    function testCanWithdraw() public {
        mintTimesWithValue(999, 0.001 ether);
        mintTimesWithValue(1000, 0.002 ether);
        mintTimesWithValue(1000, 0.003 ether);
        mintTimesWithValue(1000, 0.004 ether);
        mintTimesWithValue(1000, 0.005 ether);
        mintTimesWithValue(1000, 0.006 ether);
        mintTimesWithValue(1000, 0.007 ether);
        mintTimesWithValue(1000, 0.008 ether);
        mintTimesWithValue(1000, 0.009 ether);
        mintTimesWithValue(1000, 0.01 ether);
        vm.prank(owner);
        pool.withdraw();
        assertGt(owner.balance, 54.9 ether);
    }

    function mintTimesWithValue(uint256 times, uint256 value) public {
        vm.prank(rich);
        for (uint256 i = 0; i < times; i++) {
            pool.mintTo{value: value}(rich);
        }
    }
}
