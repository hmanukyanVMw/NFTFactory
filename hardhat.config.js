/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle');

const ALCHEMY_URL = 'https://eth-rinkeby.alchemyapi.io/v2/VQu1SPhPXOGss4gbh_NuIPcRvadikkpo';
const PRIVATE_KEY = '59a9abbbc73ae5f2206eda3c24e30aa7ccc28bababcb82b3f83a51a9329f4449';
const PRIVATE_KEY_SECONDARY = 'df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e';

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
      accounts: [`0x${PRIVATE_KEY}`, `0x${PRIVATE_KEY_SECONDARY}`]
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 1337,
    },
  }
};
