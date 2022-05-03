// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTFactory is ERC721Enumerable, Ownable, ERC721Burnable {
    string public baseURI;
    uint256 public cost = 0.01 ether;

    mapping(address => uint8) private _accountsNFTCount;

    event Log(address sender, string message);
    event Received(address caller, uint amount, string message);
    event Refunded(address sender, uint amount);

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        emit Log(msg.sender, "constructor has called");
        baseURI = "ipfs://QmaggY9Pq8CZNN4xRQKRAQKhAvtEzto2ndNXsqotsDyPM3/";
    }

    function mint(address _to) public payable {
        if (_accountsNFTCount[msg.sender] < 10) {
            ++_accountsNFTCount[msg.sender];
            require(msg.value == 0, "balance should be 0");
        } else {
            ++_accountsNFTCount[msg.sender];
            require(msg.value >= cost, "Min Amount mast be greater then cost");
        }
        _safeMint(_to, totalSupply() + 1);
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setCost(uint256 _cost) public onlyOwner {
        cost = _cost;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function withdraw() external onlyOwner {
        require(address(this).balance > 0, "balance should be greater 0");
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Failed withdraw process");
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
                                    internal
                                    override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
