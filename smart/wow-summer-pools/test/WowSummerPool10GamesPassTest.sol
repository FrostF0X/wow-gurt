// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import "../src/WowSummerPool.sol";
import "../src/TestToken.sol";
import "../src/WowSummerPools10GamesPass.sol";
import "./TestToken.sol";

contract WowSummerPools10GamesPassTest is Test {
    WowSummerPools10GamesPass public pool;
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
        pool = new WowSummerPools10GamesPass();
    }

    function testAssignsRightTokenUrl() public {
        pool.mint{value: 0.000333 ether}(1);
        assertEq("https://nft.gurt.agency/wow-summer-pools/10-games-pass.json", pool.tokenURI(1));
    }

    function testCanMint2() public {
        pool.mint{value: 0.000666 ether}(2);
        assertEq("https://nft.gurt.agency/wow-summer-pools/10-games-pass.json", pool.tokenURI(2));
    }

    function testCannotMint2IfGivenLessEthThanNeeded() public {
        vm.expectRevert("ERC721: Insufficient payment");
        pool.mint{value: 0.000665 ether}(2);
    }

    function testGasPriceIsLow() public {
        GasHelpers h = new GasHelpers();
        TestToken t = new TestToken();

        h.startMeasuringGas('mint');
        t.mint{value: 0.005 ether}(owner, '1');
        console2.log(h.stopMeasuringGas());

        h.startMeasuringGas('mint');
        pool.mint{value: 0.005 ether}(1);
        console2.log(h.stopMeasuringGas());
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
