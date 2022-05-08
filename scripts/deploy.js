// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const NFTFactory = await hre.ethers.getContractFactory("NFTFactory");

  const nftFactory = await NFTFactory.deploy(
    process.env.NFT_FACTORY_NAME,
    process.env.NFT_FACTORY_SYMBOL,
    process.env.NFT_FACTORY_BASE_URL
  );

  await nftFactory.deployed();

  const dataNFTFactory = {
    address: nftFactory.address,
    abi: JSON.parse(nftFactory.interface.format('json'))
  };
  fs.writeFileSync('./src/NFTFactory.deployed.json', JSON.stringify(dataNFTFactory));

  console.log("NFTFactory deployed to:", nftFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
