/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle');
require("dotenv").config();

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
      url: process.env.ALCHEMY_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`, `0x${process.env.PRIVATE_KEY_SECONDARY}`]
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 1337,
    },
  }
};
