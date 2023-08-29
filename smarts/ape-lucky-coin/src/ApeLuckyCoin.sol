// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts/contracts/utils/Counters.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract ApeLuckyCoin is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant TOTAL_SUPPLY = 1e9;
    uint256 public constant PRICE = 1e18;
    string public baseUri;

    IERC20 public apeCoinContract;
    address public owner;


    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() ERC721("Ape Lucky Coin", "ALC") {
        owner = msg.sender;
        setBaseUri("https://nft.gurt.agency/ape-lucky-coin/");
        _tokenIds.increment();
    }


    function requirePermissions(address spender, uint256 tokenId) public virtual {
        require(_isApprovedOrOwner(spender, tokenId), "Address has no permissions for token");
    }

    function setBaseUri(string memory newBaseUri) public onlyOwner {
        baseUri = newBaseUri;
    }

    function setApeCoinContract(address newApeCoinContract) public onlyOwner {
        apeCoinContract = IERC20(newApeCoinContract);
    }

    function _baseURI() override internal view virtual returns (string memory) {
        return baseUri;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function withdraw() public onlyOwner {
        apeCoinContract.transfer(msg.sender, apeCoinContract.balanceOf(address(this)));
    }

    function mint(address to, uint256 amount) public payable {
        require(amount > 0, "Cannot mint less then 1");
        require(_tokenIds.current() + amount - 1 <= TOTAL_SUPPLY, "No more NFTs available for minting.");

        uint256 price = amount * PRICE;
        require(apeCoinContract.transferFrom(msg.sender, address(this), price), "Payment failed");

        for (uint256 i = 0; i < amount; i++) {
            _mint(to, _tokenIds.current());
            _tokenIds.increment();
        }
    }

}
