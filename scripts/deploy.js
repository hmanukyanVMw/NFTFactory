// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  // const Greeter = await hre.ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, Hardhat!");
  const NFTFactory = await hre.ethers.getContractFactory("NFTFactory");
  const nftFactory = await NFTFactory.deploy("Hovo", "Hakob!");

  // await greeter.deployed();
  await nftFactory.deployed();


    // console.log("greeter.address is a: ", greeter.address);
    // const dataGreeter = {
    //     address: greeter.address,
    //     abi: JSON.parse(greeter.interface.format('json'))
    // };

    const dataNFTFactory = {
        address: nftFactory.address,
        abi: JSON.parse(nftFactory.interface.format('json'))
    };
    // fs.writeFileSync('./src/Token.deployed.json', JSON.stringify(dataGreeter));
    fs.writeFileSync('./src/NFTFactory.deployed.json', JSON.stringify(dataNFTFactory));

  // console.log("Greeter deployed to:", greeter.address);
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
