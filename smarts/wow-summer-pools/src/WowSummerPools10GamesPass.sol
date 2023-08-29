// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts/contracts/utils/Counters.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract WowSummerPools10GamesPass is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant PRICE = 0.000333 ether;

    address[] public allowedContracts;
    address public owner;

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        return "https://nft.gurt.agency/wow-summer-pools/10-games-pass.json";
    }

    modifier onlyAllowedContracts() {
        require(isAllowedContract(msg.sender), "Caller not allowed");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() ERC721("WOW Summer Pools 10 Games Pass", "WSP10GP") {
        owner = msg.sender;
        _tokenIds.increment();
    }


    function requirePermissions(address spender, uint256 tokenId) public virtual {
        require(_isApprovedOrOwner(spender, tokenId), "Address has no permissions for token");
    }

    function setAllowedContracts(address[] memory contracts) public onlyOwner {
        allowedContracts = contracts;
    }

    function isAllowedContract(address contractAddress) public view returns (bool) {
        for (uint i = 0; i < allowedContracts.length; i++) {
            if (allowedContracts[i] == contractAddress) return true;
        }
        return false;
    }

    function burn(uint256 tokenId) public onlyAllowedContracts {
        _burn(tokenId);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function withdraw() public onlyOwner {
        (bool success,) = payable(owner).call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }

    function mint(uint256 quantity) public payable {
        require(quantity > 0, "Cannot mint less then 1");
        require(totalSupply() + quantity <= MAX_SUPPLY, "ERC721: Exceeds maximum supply");
        require(msg.value >= PRICE * quantity, "ERC721: Insufficient payment");
        for (uint256 i = 0; i < quantity; i++) {
            _mint(msg.sender, _tokenIds.current());
            _tokenIds.increment();
        }
    }
}
