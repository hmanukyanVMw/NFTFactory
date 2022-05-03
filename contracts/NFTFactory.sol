// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTFactory is ERC721Enumerable, Ownable {
    string public baseURI;
    uint256 public cost = 0.01 ether;

    mapping(address => uint8) private _accountsFreeNFTCount;

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

    modifier checkCost() {
        require(msg.value >= cost, "Min Amount mast be greater then cost");
        _;
    }

    function mintForOwner() public payable checkCost onlyOwner {
        if (_accountsFreeNFTCount[msg.sender] < 10) {
            ++_accountsFreeNFTCount[msg.sender];
            (bool success, ) = payable(msg.sender).call{value: msg.value}("");

            require(success, "Failed to Refund ETH");
            emit Refunded(msg.sender, cost);
        }
        _safeMint(owner(), totalSupply() + 1);
    }

    function mint(address _to) public payable checkCost {
        if (_accountsFreeNFTCount[msg.sender] < 10) {
            ++_accountsFreeNFTCount[msg.sender];
            (bool success, ) = payable(msg.sender).call{value: msg.value}("");

            emit Refunded(msg.sender, cost);
        }
        _safeMint(_to, totalSupply() + 1);
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setCost(uint256 _cost) public {
        cost = _cost;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function withdraw() external onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os, "Failed withdraw process");
    }

}
