/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "rinkeby",
  paths: {
    artifacts: "./src/artifacts",
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/VQu1SPhPXOGss4gbh_NuIPcRvadikkpo",
      accounts: [`0x${'59a9abbbc73ae5f2206eda3c24e30aa7ccc28bababcb82b3f83a51a9329f4449'}`]
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 1337,
    },
  },
  etherscan: {
    apiKey: "NNCF3K536PGUC28CGJUXA7WYXHS8SGNQ82"
  }
};
