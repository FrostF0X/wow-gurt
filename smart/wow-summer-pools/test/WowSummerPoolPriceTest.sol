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
        pool.mint(owner);
    }

    function testCanMintStages() public {
        vm.expectRevert("Ether sent is not sufficient.");
        pool.mint{value: 0.0000099999 ether}(owner);

        mintTimesWithValue(999, 0.00001 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        pool.mint{value: 0.0000299999 ether}(owner);
        mintTimesWithValue(4000, 0.00003 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        pool.mint{value: 0.0000699999 ether}(owner);
        mintTimesWithValue(5000, 0.00007 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        pool.mint{value: 0.000099999 ether}(owner);
        mintTimesWithValue(10000, 0.0001 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        pool.mint{value: 0.000299999 ether}(owner);
        mintTimesWithValue(10000, 0.0003 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        pool.mint{value: 0.000699999 ether}(owner);
        mintTimesWithValue(10000, 0.0007 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        pool.mint{value: 0.00099999 ether}(owner);
        mintTimesWithValue(10000, 0.001 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        pool.mint{value: 0.00299999 ether}(owner);
        mintTimesWithValue(10000, 0.003 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        pool.mint{value: 0.00699999 ether}(owner);
        mintTimesWithValue(5000, 0.007 ether);
        vm.expectRevert("Ether sent is not sufficient.");
        pool.mint{value: 0.0099999 ether}(owner);
        mintTimesWithValue(4334, 0.01 ether);
        vm.expectRevert("No more NFTs available for minting.");
        pool.mint{value: 1 ether}(owner);
    }


    function testOnlyOwnerCanWithdraw() public {
        vm.expectRevert("Not the contract owner");
        vm.prank(rich);
        pool.withdraw();
    }

    function testCanWithdraw() public {
        mintTimesWithValue(999, 0.00001 ether);
        mintTimesWithValue(4000, 0.00003 ether);
        mintTimesWithValue(5000, 0.00007 ether);
        mintTimesWithValue(10000, 0.0001 ether);
        mintTimesWithValue(10000, 0.0003 ether);
        mintTimesWithValue(10000, 0.0007 ether);
        mintTimesWithValue(10000, 0.001 ether);
        mintTimesWithValue(10000, 0.003 ether);
        mintTimesWithValue(5000, 0.007 ether);
        mintTimesWithValue(4333, 0.01 ether);
        vm.prank(owner);
        pool.withdraw();
        assertGt(owner.balance, 54.9 ether);
    }

    function testMintManyPrices() public {
        vm.expectRevert("Ether sent is not sufficient.");
        pool.mintMany{value: 0.00998 ether}(owner, 999);
        vm.prank(owner);
        pool.mintMany{value: 0.00999 ether}(owner, 999);
    }

    function mintTimesWithValue(uint256 times, uint256 value) public {
        vm.prank(rich);
        for (uint256 i = 0; i < times; i++) {
            pool.mint{value: value}(rich);
        }
    }
}
