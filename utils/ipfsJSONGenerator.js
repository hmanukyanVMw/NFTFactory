const basePath = process.cwd();
const fs = require("fs");

// General metadata for Ethereum
const namePrefix = "Your Collection";
const description = "Remember to replace this description";
const baseUri = "ipfs://QmSbPaPQqbHYEs4x5f3rsyxbHBFTYLVf8qJd9HqAuywbyK";

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

data.forEach((item) => {
  item.name = `${namePrefix} #${item.edition}`;
  item.description = description;
  item.image = `${baseUri}/${item.edition}.png`;
  fs.writeFileSync(
    `${basePath}/build/json/${item.edition}`,
    JSON.stringify(item, null, 2)
  );
});

fs.writeFileSync(
  `${basePath}/build/json/_metadata.json`,
  JSON.stringify(data, null, 2)
);

console.log(`Updated baseUri for images to ===> ${baseUri}`);
console.log(`Updated description for images to ===> ${description}`);
console.log(`Updated name prefix for images to ===> ${namePrefix}`);

