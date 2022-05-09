import hre from 'hardhat';
import fs from 'fs';
import dotenv from 'dotenv';
import process from "process";

dotenv.config();
const basePath = process.cwd();


(async () => {
  try {
    await fs.readFile(`${basePath}/ipfs1155Url.txt`, 'utf8', async (err, baseURLLeague) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('ArmenianLeagueTickets is: ', baseURLLeague);
      const ArmenianLeagueTickets = await hre.ethers.getContractFactory("ArmenianLeagueTickets");

      const armenianLeagueTickets = await ArmenianLeagueTickets.deploy();

      await armenianLeagueTickets.deployed();
      const dataArmenianLeagueTicketsFactory = {
        address: armenianLeagueTickets.address,
        baseUrl: baseURLLeague,
        abi: JSON.parse(armenianLeagueTickets.interface.format('json'))
      };
      fs.writeFileSync('./src/ArmenianLeagueTicketsFactory.deployed.json',
        JSON.stringify(dataArmenianLeagueTicketsFactory));

      console.log("ArmenianLeagueTicketsFactory deployed to:", dataArmenianLeagueTicketsFactory.address);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

