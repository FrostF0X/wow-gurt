// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import "../src/ApeLuckyCoin.sol";
import "../src/ApeCoin.sol";

contract ApeLuckyCoinTest is Test {
    uint256 private initialBalance = 100000 * 1e18;
    ApeLuckyCoin public apeLuckyCoin;
    ApeCoin public apeCoin;
    address public owner;
    address public other;
    address public rich;

    function setUp() public {
        owner = vm.addr(1);
        other = vm.addr(2);
        rich = vm.addr(3);

        vm.startPrank(owner);
        apeCoin = new ApeCoin();
        apeLuckyCoin = new ApeLuckyCoin();
        apeLuckyCoin.setApeCoinContract(address(apeCoin));

        vm.deal(owner, 1 ether);
        apeCoin.give(owner, initialBalance);
        vm.deal(other, 1 ether);
        apeCoin.give(other, initialBalance);
        vm.deal(rich, 10000 ether);
        apeCoin.give(rich, initialBalance);
    }

    function testAssignsRightTokenUrl() public {
        vm.startPrank(owner);
        apeCoin.approve(address(apeLuckyCoin), 1 * 1e18);
        apeLuckyCoin.mint(owner, 1);
        assertEq("https://nft.gurt.agency/ape-lucky-coin/1", apeLuckyCoin.tokenURI(1));
    }

    function testCanMintLot() public {
        vm.startPrank(owner);
        apeCoin.approve(address(apeLuckyCoin), 10 * 1e18);
        apeLuckyCoin.mint(owner, 10);
        assertEq("https://nft.gurt.agency/ape-lucky-coin/10", apeLuckyCoin.tokenURI(10));
    }

    function testCantMintIfNotApprovedToGetApeCoins() public {
        vm.expectRevert("ERC20: insufficient allowance");
        vm.startPrank(owner);
        apeLuckyCoin.mint(owner, 1 * 10);
    }

    function testCantMintManyIfNotApprovedEnoughApeCoins() public {
        vm.startPrank(owner);
        apeCoin.approve(address(apeLuckyCoin), 9 * 1e17);
        vm.expectRevert("ERC20: insufficient allowance");
        apeLuckyCoin.mint(owner, 1);
    }

    function testCantMintIfNotApprovedEnoughApeCoins() public {
        vm.startPrank(owner);
        apeCoin.approve(address(apeLuckyCoin), 5 * 1e18);
        vm.expectRevert("ERC20: insufficient allowance");
        apeLuckyCoin.mint(owner, 10);
    }

    function testCanMintInPortions() public {
        vm.startPrank(owner);
        apeCoin.approve(address(apeLuckyCoin), 5 * 1e18);
        apeLuckyCoin.mint(owner, 2);
        apeLuckyCoin.mint(owner, 1);
        apeLuckyCoin.mint(owner, 2);
        vm.expectRevert("ERC20: insufficient allowance");
        apeLuckyCoin.mint(owner, 1);
    }

    function testCanWithdrawTokens() public {
        vm.startPrank(rich);
        apeCoin.approve(address(apeLuckyCoin), 100 * 1e18);
        apeLuckyCoin.mint(owner, 100);
        assertEq(apeCoin.balanceOf(rich), initialBalance - 100 * 1e18);
        vm.startPrank(owner);
        apeLuckyCoin.withdraw();
        assertEq(apeCoin.balanceOf(owner), initialBalance + 100 * 1e18);
    }

    function testOnlyOwnerCanWithdraw() public {
        vm.expectRevert("Not the contract owner");
        vm.startPrank(rich);
        apeLuckyCoin.withdraw();
    }

    function testOnlyOwnerCanModifyApeCoinContract() public {
        vm.expectRevert("Not the contract owner");
        vm.startPrank(rich);
        apeLuckyCoin.setApeCoinContract(rich);
    }

    function testOwnerCanModifyApeCoinContract() public {
        vm.startPrank(owner);
        apeLuckyCoin.setApeCoinContract(rich);
    }

    function testOnlyOwnerCanModifyBaseUri() public {
        vm.expectRevert("Not the contract owner");
        vm.startPrank(rich);
        apeLuckyCoin.setBaseUri("test");
    }

    function testOwnerCanModifyBaseUri() public {
        vm.startPrank(owner);
        apeCoin.approve(address(apeLuckyCoin), 10 * 1e18);
        apeLuckyCoin.mint(owner, 10);
        assertEq("https://nft.gurt.agency/ape-lucky-coin/10", apeLuckyCoin.tokenURI(10));
        apeLuckyCoin.setBaseUri("http://localhost/");
        assertEq("http://localhost/10", apeLuckyCoin.tokenURI(10));
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
