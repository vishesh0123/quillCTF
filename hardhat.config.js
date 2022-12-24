require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "goerli",
  solidity: "0.8.7",
  networks: {
    goerli: {
      url: `${process.env.PROVIDER}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
