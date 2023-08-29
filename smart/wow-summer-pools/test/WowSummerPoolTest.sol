// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import "../src/WowSummerPool.sol";
import "../src/TestToken.sol";

contract WowSummerPoolTest is Test {
    WowSummerPool public pool;
    address public owner;
    address public other;
    address public rich;

    function setUp() public {
        owner = vm.addr(1);
        other = vm.addr(2);
        rich = vm.addr(3);
        vm.prank(owner);
        vm.deal(owner, 1 ether);
        vm.deal(other, 1 ether);
        vm.deal(rich, 100000 ether);
        pool = new WowSummerPool();
    }

    function testAssignsRightTokenUrl() public {
        pool.mint{value: 0.001 ether}(owner);
        assertEq("https://nft.gurt.agency/pool?seed=1&guys=pepe,bored,foxe", pool.tokenURI(1));
    }

    function testTokenOwnerHasRequirePermissions() public {
        vm.prank(other);
        pool.mint{value: 0.001 ether}(other);
        pool.requirePermissions(other, 1);
    }

    function testCanRequirePermissions() public {
        vm.prank(other);
        pool.mint{value: 0.001 ether}(other);
        vm.prank(owner);
        vm.expectRevert("Address has no permissions for token");
        pool.requirePermissions(owner, 1);
    }

}

contract GasHelpers {
    string private checkpointLabel;
    uint256 private checkpointGasLeft = 1; // Start the slot warm.

    function startMeasuringGas(string memory label) public virtual {
        checkpointLabel = label;

        checkpointGasLeft = gasleft();
    }

    function stopMeasuringGas() public virtual returns (uint256){
        uint256 checkpointGasLeft2 = gasleft();
        uint256 gasDelta = checkpointGasLeft - checkpointGasLeft2 - 100;
        return gasDelta;
    }
}
