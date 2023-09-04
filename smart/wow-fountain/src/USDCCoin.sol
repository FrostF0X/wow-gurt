// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts/contracts/utils/Counters.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract USDCCoin is ERC20 {
    constructor() ERC20("ApeToken", "AT") {
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    function give(address to, uint256 amount) public payable {
        _mint(to, amount);
    }
}
