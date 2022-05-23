import fs from 'fs';
import process from 'process';
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import dotenv from 'dotenv';
dotenv.config()

const basePath = process.cwd();

async function main (filePaths) {
  const token = process.env.IPFS_STORAGE_TOKEN;
  console.log(process, "token");

  const storage = new Web3Storage({ token })
  const files = []

  for (const path of filePaths) {
    console.log(path, "path");
    const pathFiles = await getFilesFromPath(path)
    files.push(...pathFiles)
  }

  console.log(`Uploading ${files.length} files`);
  const cid = await storage.put(files);
  console.log('Content added with CID:', cid);
  return cid;
}


(async () => {
// General metadata for Ethereum
  const namePrefix = "Your Collection";
  const description = "Remember to replace this description";
  const cid = await main([`./buildIPFS/images/`]);
  const baseUri = `ipfs://${cid}/images`;
  console.log('Lookin URL is ', `https://dweb.link/ipfs/${cid}/images/`)

// read json data
  let rawData = fs.readFileSync(`${basePath}/buildIPFS/json/_metadata.json`);
  let data = JSON.parse(rawData);

  data.forEach((item) => {
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.image = `${baseUri}/${item.edition}.png`;
    fs.writeFileSync(
      `${basePath}/buildIPFS/json/${item.edition}`,
      JSON.stringify(item, null, 2)
    );
  });

fs.writeFileSync(
  `${basePath}/buildIPFS/json/_metadata.json`,
  JSON.stringify(data, null, 2)
);

console.log(`Updated baseUri for images to ===> ${baseUri}`);
console.log(`Updated description for images to ===> ${description}`);
console.log(`Updated name prefix for images to ===> ${namePrefix}`);

const cidJSON = await main([`./buildIPFS/json/`]);
console.log('JSON CID is:', cidJSON);
console.log('Lookin URL for JSON CID is: ', `https://dweb.link/ipfs/${cidJSON}/json`)
console.log('--------------------------------------------------------------');
console.log('In Contract use this URL type: ', `ipfs://${cidJSON}/json/`);

  fs.writeFile('ipfsUrl.txt', `ipfs://${cidJSON}/json/`, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });
})();
