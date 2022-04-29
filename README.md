# Basic Sample NFT Factory full stack Project

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/script.js
npx hardhat help
```

- How to Run NFTFactory project
  - You can do 2 way.
    - 1 Local running 
      - Create Nodes and copy one of secret keys and 
          import in Metamask as a local account. You will get 10000Ether.
        ```shell
          npx hardhat node
        ```
      - deploy Contract and use import NFTFactory from "...(/NFTFactory.json)... 
        this import for creating `new ethers.Contract`
        ```shell
          node scripts/script.js
        ```

        - 2 Running using Remix 
            - Create account in ALCHEMY, choose Remix option and copy `ALCHEMY_URL`
       
            - In Metamask choose Rinkeby test network and choose one of networks, go to
              `account details -> Export Private key` copy and past in hardhat config this way  
              this import for creating `new ethers.Contract`
              ```shell
                rinkeby: {
                  url: ALCHEMY_URL,
                  accounts: [`0x${PRIVATE_KEY}`]
                },
              ```
            - deploy Contract and use import NFTFactoryWithAddress from "...(/NFTFactory.deployed.json)...
              this import for creating `new ethers.Contract`
        ```shell
          node scripts/script.js
        ```  
