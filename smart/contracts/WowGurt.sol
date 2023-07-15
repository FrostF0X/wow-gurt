// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WowGurt is ERC721URIStorage {
    using Counters for Counter;
    Counter private _tokenIds;

    event NewWowMinted(uint256 tokenId, address recipient, string tokenURI);

    function initialize() initializer public {
        __ERC721_init("WowGurt", "WOWGURT");
    }

    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        emit NewWowMinted(newItemId, recipient, tokenURI);

        return newItemId;
    }
}
