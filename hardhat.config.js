require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
const dotenv = require('dotenv')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("ether_accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

//Configure dotenv
dotenv.config({ path: '.env' })

task("web3_accounts", "Prints accounts", async (_, { web3 }) => {
  console.log(await web3.eth.getAccounts());
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const PRIVATE_KEY = process.env.PRIVATE_KEY
const RPC_URL = process.env.RPC_URL

module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [ PRIVATE_KEY ]
    }
  }
};
