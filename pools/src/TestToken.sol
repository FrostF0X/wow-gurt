// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts/contracts/utils/Counters.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract TestToken is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("TestToken", "TT") {
        _tokenIds.increment();
    }

    function mint(address recipient, string memory tokenUri) public payable returns (uint256) {
        uint256 tokenId = _tokenIds.current();
        _tokenIds.increment();
        _mint(recipient, tokenId);
        return tokenId;
    }
}
