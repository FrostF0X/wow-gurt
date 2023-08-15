// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts/contracts/utils/Counters.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract WowSummerPool is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant TOTAL_SUPPLY = 69333;

    address[] public allowedContracts;
    address public owner;

    mapping(uint256 => Pool) private pools;

    struct Pool {
        string[] guys;
    }

    modifier onlyAllowedContracts() {
        require(isAllowedContract(msg.sender), "Caller not allowed");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() ERC721("WOW Summer Pools", "WSP") {
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

    function getPoolGuys(uint256 tokenId) public view returns (string[] memory) {
        return pools[tokenId].guys;
    }

    function removeLastGuy(uint256 fromPool) public onlyAllowedContracts returns (string memory) {
        require(pools[fromPool].guys.length > 0, "No guys to pop from the source pool");

        string memory removed = pools[fromPool].guys[pools[fromPool].guys.length - 1];
        pools[fromPool].guys.pop();
        _setTokenURI(fromPool, generateTokenURI(fromPool, getPoolGuys(fromPool)));
        return removed;
    }

    function addGuy(uint256 toPool, string memory guy) public onlyAllowedContracts {
        pools[toPool].guys.push(guy);
        _setTokenURI(toPool, generateTokenURI(toPool, getPoolGuys(toPool)));
    }

    function burn(uint256 pool) public onlyAllowedContracts {
        _burn(pool);
        delete pools[pool].guys;
    }

    function _baseURI() override internal view virtual returns (string memory) {
        return "https://nft.gurt.agency/pool";
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function withdraw() public onlyOwner {
        (bool success,) = payable(owner).call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }

    function mintMany(address to, uint256 count) public payable {
        require(count > 0, "Cannot mint less then 1");
        uint256 price = 0;
        uint256 startToken = _tokenIds.current();
        for (uint256 i = 0; i < count; i++) {
            price += getPrice(startToken + i);
        }
        require(msg.value >= price, "Ether sent is not sufficient.");
        for (uint256 i = 0; i < count; i++) {
            mint(to);
        }
    }

    function mint(address to) public payable {
        uint256 newTokenId = _tokenIds.current();
        require(newTokenId <= TOTAL_SUPPLY, "No more NFTs available for minting.");

        uint256 price = getPrice(newTokenId);
        require(msg.value >= price, "Ether sent is not sufficient.");

        pools[newTokenId].guys.push('pepe');
        pools[newTokenId].guys.push('bored');
        pools[newTokenId].guys.push('foxe');

        _mint(to, newTokenId);
        _setTokenURI(newTokenId, generateTokenURI(newTokenId, getPoolGuys(newTokenId)));

        _tokenIds.increment();
    }

    function generateTokenURI(uint256 tokenId, string[] memory guys) private pure returns (string memory) {
        return string(abi.encodePacked("?seed=", Strings.toString(tokenId), "&guys=", joinWithDelimiter(guys, ',')));
    }

    function joinWithDelimiter(string[] memory strArray, string memory delimiter) public pure returns (string memory) {
        if (strArray.length == 0) {
            return "";
        }
        uint256 totalLength = 0;
        for (uint256 i = 0; i < strArray.length; i++) {
            totalLength += bytes(strArray[i]).length;
        }
        totalLength += bytes(delimiter).length * (strArray.length - 1);
        bytes memory result = new bytes(totalLength);

        uint256 k = 0;
        for (uint256 i = 0; i < strArray.length; i++) {
            for (uint256 j = 0; j < bytes(strArray[i]).length; j++) {
                result[k++] = bytes(strArray[i])[j];
            }
            if (i < strArray.length - 1) {
                for (uint256 j = 0; j < bytes(delimiter).length; j++) {
                    result[k++] = bytes(delimiter)[j];
                }
            }
        }

        return string(result);
    }


    function getPrice(uint256 currentId) public pure returns (uint256) {
        if (currentId >= 65000) {
            return 0.01 ether;
        } else if (currentId >= 60000) {
            return 0.007 ether;
        } else if (currentId >= 50000) {
            return 0.003 ether;
        } else if (currentId >= 40000) {
            return 0.001 ether;
        } else if (currentId >= 30000) {
            return 0.0007 ether;
        } else if (currentId >= 20000) {
            return 0.0003 ether;
        } else if (currentId >= 10000) {
            return 0.0001 ether;
        } else if (currentId >= 5000) {
            return 0.00007 ether;
        } else if (currentId >= 1000) {
            return 0.00003 ether;
        } else {
            return 0.00001 ether;
        }
    }
}
