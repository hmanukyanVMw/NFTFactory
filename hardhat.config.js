/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle');

const ALCHEMY_URL = 'https://eth-rinkeby.alchemyapi.io/v2/VQu1SPhPXOGss4gbh_NuIPcRvadikkpo';
const PRIVATE_KEY = '59a9abbbc73ae5f2206eda3c24e30aa7ccc28bababcb82b3f83a51a9329f4449';

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: ALCHEMY_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 1337,
    },
  }
};
