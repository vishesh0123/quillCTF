# quillCTF solutions

Try running some of the following tasks:
Make sure to install all required node modules and Create .env file with PROVIDER and PRIVATE_KEY

1. To Execute Attck Script for RoadClosed :

```shell
  npx run scripts/RoadClosed.js --network goerli
```

2. Tests for VIP_Bank

```shell
  npx hardhat node

  npx hardhat test test/VIP_Bank.js --network hardhat
```

3. Execute Script to find hash

```shell
  npx run scripts/Confidential.js
```
