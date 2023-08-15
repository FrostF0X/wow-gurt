// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import "../src/WowSummerPool.sol";

contract WowSummerPoolTest is Test {
    WowSummerPool public pool;
    address public owner;
    address public other;
    address public allowed;
    address public disallowed;

    function setUp() public {
        owner = vm.addr(1);
        allowed = vm.addr(2);
        disallowed = vm.addr(3);
        vm.deal(owner, 1 ether);
        vm.deal(other, 1 ether);
        vm.deal(allowed, 1 ether);
        vm.deal(disallowed, 1 ether);
        vm.startPrank(owner);
        pool = new WowSummerPool();
        address[] memory allowedContracts = new address[](1);
        allowedContracts[0] = allowed;
        pool.setAllowedContracts(allowedContracts);
        vm.startPrank(allowed);
    }

    function testCannotChangeAllowedContractsIfNotOwner() public {
        address[] memory allowedContracts = new address[](1);
        allowedContracts[0] = disallowed;
        vm.stopPrank();
        vm.startPrank(other);
        vm.expectRevert("Not the contract owner");
        pool.setAllowedContracts(allowedContracts);
    }

    function testCanUseContractIfFromUserContract() public {
        WowSummerPoolUser userContract = new WowSummerPoolUser(address(pool));
        address[] memory allowedContracts = new address[](1);
        allowedContracts[0] = address(userContract);
        vm.stopPrank();
        vm.startPrank(owner);
        pool.setAllowedContracts(allowedContracts);
        pool.mint{value: 0.001 ether}(owner);
        userContract.use(1);
    }


    function testCannotUseContractIfUserContractNotSet() public {
        WowSummerPoolUser userContract = new WowSummerPoolUser(address(pool));
        pool.mint{value: 0.001 ether}(owner);
        vm.prank(owner);
        vm.expectRevert("Caller not allowed");
        userContract.use(1);
    }


    function testCannotRemoveGuyIfInDisallowed() public {
        address[] memory allowedContracts = new address[](1);
        allowedContracts[0] = disallowed;
        vm.stopPrank();
        vm.startPrank(disallowed);
        vm.expectRevert("Not the contract owner");
        pool.setAllowedContracts(allowedContracts);
    }

    function testAssignsPoolsOnMint() public {
        pool.mint{value: 0.001 ether}(owner);
        string[] memory guys = pool.getPoolGuys(1);
        assertEq(guys[0], 'pepe');
        assertEq(guys[1], 'bored');
        assertEq(guys[2], 'foxe');
    }

    function testCanRemoveGuyIfInAllowed() public {
        pool.mint{value: 0.001 ether}(owner);
        pool.removeLastGuy(1);
        string[] memory guys = pool.getPoolGuys(1);
        assertEq(guys[0], 'pepe');
        assertEq(guys[1], 'bored');
        assertEq(guys.length, 2);
    }

    function testCannotRemoveGuyIfNotEnough() public {
        pool.mint{value: 0.001 ether}(owner);
        pool.removeLastGuy(1);
        pool.removeLastGuy(1);
        pool.removeLastGuy(1);
        vm.expectRevert("No guys to pop from the source pool");
        pool.removeLastGuy(1);
    }

    function testCanAddGuyIfInAllowed() public {
        pool.mint{value: 0.001 ether}(owner);
        pool.addGuy(1, 'foxe');
        string[] memory guys = pool.getPoolGuys(1);
        assertEq(guys[0], 'pepe');
        assertEq(guys[1], 'bored');
        assertEq(guys[2], 'foxe');
        assertEq(guys[3], 'foxe');
    }

    function testCanBurnGuys() public {
        pool.mint{value: 0.00001 ether}(owner);
        pool.burn(1);
        string[] memory guys = pool.getPoolGuys(1);
        assertEq(guys.length, 0);
    }
}

contract WowSummerPoolUser {
    WowSummerPool wowSummerPool;
    constructor(address contractAddress){
        wowSummerPool = WowSummerPool(contractAddress);
    }

    function use(uint256 tokenId) public {
        console2.logAddress(msg.sender);
        wowSummerPool.requirePermissions(msg.sender, tokenId);
        wowSummerPool.removeLastGuy(tokenId);
    }
}
