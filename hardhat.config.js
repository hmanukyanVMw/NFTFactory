/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle');

const INFURA_URL = 'https://rinkeby.infura.io/v3/72dbb560e8c6414a8193cbc80ddeb9d5';
const PRIVATE_KEY = '59a9abbbc73ae5f2206eda3c24e30aa7ccc28bababcb82b3f83a51a9329f4449';

module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
