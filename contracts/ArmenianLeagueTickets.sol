// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArmenianLeagueTickets is ERC1155, Ownable {
    string public name;
    string public symbol;
    uint public constant SHIRAK = 0;
    uint public constant BANANC = 1;
    uint public constant PYUNIC = 2;
    uint public constant ALASHKERT = 3;
    uint public constant ARARAT = 4;
    uint public constant REAL_MADRID = 5;
    uint public constant GANZASAR = 6;
    uint public constant LORI = 7;
    uint public constant MIKA = 8;
    uint public constant ULIC = 9;

    mapping(uint => string) public tokenURI;

    constructor() ERC1155("") {
        name = "ArmenianPremierLeague";
        symbol = "ArmenianPremierLeague";
    }

    function mint(address _to, uint _id, uint _amount) external onlyOwner {
        _mint(_to, _id, _amount, "");
    }

    function mintBatch(address _to, uint[] memory _ids, uint[] memory _amounts) external onlyOwner {
        _mintBatch(_to, _ids, _amounts, "");
    }

    function burn(uint _id, uint _amount) external {
        _burn(msg.sender, _id, _amount);
    }

    function burnBatch(uint[] memory _ids, uint[] memory _amounts) external {
        _burnBatch(msg.sender, _ids, _amounts);
    }

    function burnForMint(address _from, uint[] memory _burnIds, uint[] memory _burnAmounts, uint[] memory _mintIds, uint[] memory _mintAmounts) external onlyOwner {
        _burnBatch(_from, _burnIds, _burnAmounts);
        _mintBatch(_from, _mintIds, _mintAmounts, "");
    }

    function setURI(uint _id, string memory _uri) external onlyOwner {
        tokenURI[_id] = _uri;
        emit URI(_uri, _id);
    }

    function uri(uint _id) public override view returns (string memory) {
        return tokenURI[_id];
    }
}
