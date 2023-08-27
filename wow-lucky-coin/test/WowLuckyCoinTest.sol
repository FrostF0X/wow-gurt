// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import "../src/WowLuckyCoin.sol";
import "../src/USDCCoin.sol";

contract WowLuckyCoinTest is Test {
    uint256 private initialBalance = 100000 * 1e6;
    WowLuckyCoin public wowLuckyCoin;
    USDCCoin public usdcCoin;
    address public owner;
    address public other;
    address public rich;

    function setUp() public {
        owner = vm.addr(1);
        other = vm.addr(2);
        rich = vm.addr(3);

        vm.startPrank(owner);
        usdcCoin = new USDCCoin();
        wowLuckyCoin = new WowLuckyCoin();
        wowLuckyCoin.setUsdcCoinContract(address(usdcCoin));

        vm.deal(owner, 1 ether);
        usdcCoin.give(owner, initialBalance);
        vm.deal(other, 1 ether);
        usdcCoin.give(other, initialBalance);
        vm.deal(rich, 10000 ether);
        usdcCoin.give(rich, initialBalance);
    }

    function testAssignsRightTokenUrl() public {
        vm.startPrank(owner);
        usdcCoin.approve(address(wowLuckyCoin), 1 * 1e6);
        wowLuckyCoin.mint(owner, 1);
        assertEq("https://nft.gurt.agency/wow-lucky-coin/1", wowLuckyCoin.tokenURI(1));
    }

    function testTotalSupply() public {
        vm.startPrank(owner);
        usdcCoin.approve(address(wowLuckyCoin), 1 * 1e6);
        assertEq(wowLuckyCoin.totalSupply(), 0);
        wowLuckyCoin.mint(owner, 1);
        assertEq(wowLuckyCoin.totalSupply(), 1);
    }

    function testCanMintLot() public {
        vm.startPrank(owner);
        usdcCoin.approve(address(wowLuckyCoin), 10 * 1e6);
        wowLuckyCoin.mint(owner, 10);
        assertEq("https://nft.gurt.agency/wow-lucky-coin/10", wowLuckyCoin.tokenURI(10));
    }

    function testCantMintIfNotApprovedToGetWowCoins() public {
        vm.expectRevert("ERC20: insufficient allowance");
        vm.startPrank(owner);
        wowLuckyCoin.mint(owner, 1 * 10);
    }

    function testCantMintManyIfNotApprovedEnoughWowCoins() public {
        vm.startPrank(owner);
        usdcCoin.approve(address(wowLuckyCoin), 9 * 1e5);
        vm.expectRevert("ERC20: insufficient allowance");
        wowLuckyCoin.mint(owner, 1);
    }

    function testCantMintIfNotApprovedEnoughWowCoins() public {
        vm.startPrank(owner);
        usdcCoin.approve(address(wowLuckyCoin), 5 * 1e6);
        vm.expectRevert("ERC20: insufficient allowance");
        wowLuckyCoin.mint(owner, 10);
    }

    function testCanMintInPortions() public {
        vm.startPrank(owner);
        usdcCoin.approve(address(wowLuckyCoin), 5 * 1e6);
        wowLuckyCoin.mint(owner, 2);
        wowLuckyCoin.mint(owner, 1);
        wowLuckyCoin.mint(owner, 2);
        vm.expectRevert("ERC20: insufficient allowance");
        wowLuckyCoin.mint(owner, 1);
    }

    function testCanWithdrawTokens() public {
        vm.startPrank(rich);
        usdcCoin.approve(address(wowLuckyCoin), 100 * 1e6);
        wowLuckyCoin.mint(owner, 100);
        assertEq(usdcCoin.balanceOf(rich), initialBalance - 100 * 1e6);
        vm.startPrank(owner);
        wowLuckyCoin.withdraw();
        assertEq(usdcCoin.balanceOf(owner), initialBalance + 100 * 1e6);
    }

    function testOnlyOwnerCanWithdraw() public {
        vm.expectRevert("Not the contract owner");
        vm.startPrank(rich);
        wowLuckyCoin.withdraw();
    }

    function testOnlyOwnerCanModifyWowCoinContract() public {
        vm.expectRevert("Not the contract owner");
        vm.startPrank(rich);
        wowLuckyCoin.setUsdcCoinContract(rich);
    }

    function testOwnerCanModifyWowCoinContract() public {
        vm.startPrank(owner);
        wowLuckyCoin.setUsdcCoinContract(rich);
    }

    function testOnlyOwnerCanModifyBaseUri() public {
        vm.expectRevert("Not the contract owner");
        vm.startPrank(rich);
        wowLuckyCoin.setBaseUri("test");
    }

    function testOwnerCanModifyBaseUri() public {
        vm.startPrank(owner);
        usdcCoin.approve(address(wowLuckyCoin), 10 * 1e6);
        wowLuckyCoin.mint(owner, 10);
        assertEq("https://nft.gurt.agency/wow-lucky-coin/10", wowLuckyCoin.tokenURI(10));
        wowLuckyCoin.setBaseUri("http://localhost/");
        assertEq("http://localhost/10", wowLuckyCoin.tokenURI(10));
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
