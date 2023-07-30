// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


interface WowGurtPass {
    function burnDrop(address account) external;
}

contract WowGurt is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    uint256 private constant MAX_NFT_SUPPLY = 9999;
    Counters.Counter private _tokenIds;
    mapping(string => bool) private _tokenURIs;
    address private serverAddress;
    WowGurtPass private passContract;

    event NewWowMinted(uint256 tokenId, address recipient, string tokenURI);

    constructor(address _serverAddress) ERC721("WowGurt", "WGURT") {
        serverAddress = _serverAddress;
        _tokenIds.increment();
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function withdraw() public onlyOwner {
        (bool success,) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }

    function decodeInput(bytes memory encodedData) public pure returns (string memory) {
        string memory str = abi.decode(encodedData, (string));
        return str;
    }

    function mintNFT(address recipient, bytes memory input, bytes memory signature) public payable returns (uint256) {
        require(recoverSigner(string(input), signature) == serverAddress, "Unauthorized mint attempt.");
        (string memory baseTokenURI) = this.decodeInput(input);
        uint256 tokenId = _tokenIds.current();

        require(_tokenIds.current() <= MAX_NFT_SUPPLY, "No more NFTs available for minting.");
        require(!_tokenURIs[baseTokenURI], "NFT with same tokenURI already exists.");
        _tokenURIs[baseTokenURI] = true;

        string memory tokenURI = string.concat(string.concat(baseTokenURI, '&tokenId='), Strings.toString(tokenId));

        uint256 price = getPrice(tokenId);
        require(msg.value >= price, "Ether sent is not sufficient.");

        _tokenIds.increment();
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit NewWowMinted(tokenId, recipient, tokenURI);

        return tokenId;
    }

    function mintNFTFromDrop(address recipient, bytes memory input, bytes memory signature) public payable returns (uint256) {
        require(recoverSigner(string(input), signature) == serverAddress, "Unauthorized mint attempt.");
        (string memory baseTokenURI) = this.decodeInput(input);
        uint256 tokenId = _tokenIds.current();

        require(_tokenIds.current() <= MAX_NFT_SUPPLY, "No more NFTs available for minting.");
        require(!_tokenURIs[baseTokenURI], "NFT with same tokenURI already exists.");
        _tokenURIs[baseTokenURI] = true;

        string memory tokenURI = string.concat(string.concat(baseTokenURI, '&tokenId='), Strings.toString(tokenId));

        require(passContract.burnDrop(recipient), "Failed to burn drop token");

        _tokenIds.increment();
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit NewWowMinted(tokenId, recipient, tokenURI);

        return tokenId;
    }

    function setPassContractAddress(address passContactAddress) public onlyOwner {
        passContact = ITarget(passContactAddress);
    }

    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }

    function recoverSigner(string memory message, bytes memory sig) internal pure returns (address) {
        // The message header; we will fill in the length next
        string memory header = "\x19Ethereum Signed Message:\n000000";
        uint256 lengthOffset;
        uint256 length;
        assembly {
        // The first word of a string is its length
            length := mload(message)
        // The beginning of the base-10 message length in the prefix
            lengthOffset := add(header, 57)
        }
        // Maximum length we support
        require(length <= 999999);
        // The length of the message's length in base-10
        uint256 lengthLength = 0;
        // The divisor to get the next left-most message length digit
        uint256 divisor = 100000;
        // Move one digit of the message length to the right at a time
        while (divisor != 0) {
            // The place value at the divisor
            uint256 digit = length / divisor;
            if (digit == 0) {
                // Skip leading zeros
                if (lengthLength == 0) {
                    divisor /= 10;
                    continue;
                }
            }
            // Found a non-zero digit or non-leading zero digit
            lengthLength++;
            // Remove this digit from the message length's current value
            length -= digit * divisor;
            // Shift our base-10 divisor over
            divisor /= 10;

            // Convert the digit to its ASCII representation (man ascii)
            digit += 0x30;
            // Move to the next character and write the digit
            lengthOffset++;
            assembly {
                mstore8(lengthOffset, digit)
            }
        }
        // The null string requires exactly 1 zero (unskip 1 leading 0)
        if (lengthLength == 0) {
            lengthLength = 1 + 0x19 + 1;
        } else {
            lengthLength += 1 + 0x19;
        }
        // Truncate the tailing zeros from the header
        assembly {
            mstore(header, lengthLength)
        }
        // Perform the elliptic curve recover operation
        bytes32 check = keccak256(abi.encodePacked(header, message));
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);
        return ecrecover(check, v, r, s);
    }

    function splitSignature(bytes memory sig) internal pure returns (uint8 v, bytes32 r, bytes32 s) {
        require(sig.length == 65);

        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }

        return (v, r, s);
    }

    function getPrice(uint256 currentId) public pure returns (uint256) {
        if (currentId >= 9000) {
            return 10000 ether;
        } else if (currentId >= 8000) {
            return 5000 ether;
        } else if (currentId >= 7000) {
            return 2000 ether;
        } else if (currentId >= 6000) {
            return 1000 ether;
        } else if (currentId >= 5000) {
            return 500 ether;
        } else if (currentId >= 4000) {
            return 200 ether;
        } else if (currentId >= 3000) {
            return 100 ether;
        } else if (currentId >= 2000) {
            return 50 ether;
        } else if (currentId >= 1000) {
            return 20 ether;
        } else {
            return 10 ether;
        }
    }
}
