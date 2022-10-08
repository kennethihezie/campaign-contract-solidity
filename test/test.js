const { web3 } = require('hardhat');
const { abi, bytecode } = require('../config')
const assert = require('assert');


let accounts;
let campaignContractFactory

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    campaignContractFactory = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: [100] })
    .send({ from: accounts[0], gas: '10000000' })
})

describe("Campaign contract", async () => {

      it("CampaignFactory contract deployed", async () => {
         assert.ok(campaignContractFactory.options.address)
      })

      it("Campaign contract deployed", async () => {
        const deployCampaignContract = await campaignContractFactory.methods.deployContract('100').send({ from: accounts[0] })
        console.log("contract address: ", deployCampaignContract);
     })

      it("Get deployed contracts address", async () => {
         const deployedContractAddress = await campaignContractFactory.methods.getAllDeployedContracts().call({ from: accounts[0] })
         console.log("addresses: ", deployedContractAddress);
      })

      it("contribute to campaign", async () => {

      })

      it("create request", async () => {

      })

      it("approve request", async () => {
        
      })

      it("finalize request", async () => {
        
      })
})

