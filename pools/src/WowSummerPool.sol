// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-contracts/contracts/utils/Counters.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract WowSummerPool is ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Visitor {
        uint8 number;
        uint8 xPosition;
        uint8 yPosition;
    }

    struct Pool {
        uint8 configuration;
        uint8 color;
        mapping(uint => Visitor) children;
        Visitor[] visitors;
    }

    mapping(uint256 => Pool) public pools;

    // Whitelist mechanism
    mapping(address => bool) public whitelist;
    mapping(address => uint8) public mintedCount;

    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() ERC721("WOW Summer Pool", "WSP") {
        owner = msg.sender;
    }

    function addToWhitelist(address[] memory users) public onlyOwner {
        for (uint i = 0; i < users.length; i++) {
            whitelist[users[i]] = true;
            mintedCount[users[i]] = 0;
        }
    }

    function removeFromWhitelist(address user) public onlyOwner {
        whitelist[user] = false;
    }

    function airdrop(address[] memory users) public onlyOwner {
        for (uint i = 0; i < users.length; i++) {
            mintTo(users[i]);
        }
    }

    function mint() public {
        mintTo(msg.sender);
    }

    function mintTo(address to) public {
        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId);

        pools[newTokenId].configuration = uint8(1 + (block.timestamp % 20));
        pools[newTokenId].color = uint8(1 + (block.timestamp % 20));

        // Example to add a random number of visitors between 1 to 5.
        uint8 visitorCount = uint8(1 + (block.timestamp % 5));
        for (uint j = 0; j < visitorCount; j++) {
            Visitor memory newVisitor;
            newVisitor.number = uint8(1 + (block.timestamp % 6));
            newVisitor.xPosition = uint8(1 + (block.timestamp % 10));
            newVisitor.yPosition = uint8(1 + (block.timestamp % 10));

            pools[newTokenId].visitors.push(newVisitor);
        }

        mintedCount[msg.sender]++;
        _tokenIds.increment();
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        string memory baseUrl = "https://wow-summer-pool-nft.gurt.agency/";
        string memory query = string(abi.encodePacked("?config=", uint2str(pools[tokenId].configuration), "&color=", uint2str(pools[tokenId].color))); // Add more query parameters as needed

        return string(abi.encodePacked(baseUrl, query));
    }

    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length - 1;
        while (_i != 0) {
            bstr[k--] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
}
