import "../lib/seadrop/src/ERC721PartnerSeaDrop.sol";

contract WowGurtDrop is ERC721PartnerSeaDrop {
    address public wowGurtAddress;

    constructor(address _wowGurtAddress) ERC721PartnerSeaDrop('WowDrop1', 'WGURTDROP', ['0x00005EA00Ac477B1030CE78506496e8C2dE24bf5']) {
        wowGurtAddress = _wowGurtAddress;
    }

    function setWowGurtContractAddress(address wowGurtContractAddress) public onlyOwner {
        wowGurtAddress = wowGurtContractAddress;
    }

    function mint(address recipient, uint256 amount) external onlyOwner {
        _mint(recipient, amount);
    }

    function burnDrop(address account) external returns (bool) {
        require(msg.sender == wowGurtAddress, "Only WowGurt contract can burn tokens for minting");
        _burn(account, 1);
        return true;
    }
}
