const { web3 } = require('hardhat');
const contractData = require('../config')
const assert = require('assert');

let accounts;
let campaignContractFactory
let campaignContract

beforeEach(async () => {
    const { abi, bytecode } = await contractData('CampaignFactory')
    accounts = await web3.eth.getAccounts()

    campaignContractFactory = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: [100] })
    .send({ from: accounts[0], gas: '10000000' })
})

describe("Campaign contract", async () => {

      it("CampaignFactory contract deployed", async () => {
         assert.ok(campaignContractFactory.options.address)
      })

      it("Create Campaign", async () => {
        const deployCampaignContract = await campaignContractFactory.methods.deployContract('100').send({ from: accounts[0] })
        const deployedContractAddress = await campaignContractFactory.methods.getAllDeployedContracts().call({ from: accounts[0] })
        
        //Get instance of campaign contract
        const { abi } = await contractData('Campaign')
        campaignContract = new web3.eth.Contract(abi, deployedContractAddress[0])
        assert.ok(campaignContract)
     })

     it("Get deployed campaign address", async () => {
        const deployedCampaignContract = await campaignContract.options.address
        assert.ok(deployedCampaignContract)
      })

      it("Get all deployed campaign address", async () => {
         const deployedContractAddress = await campaignContractFactory.methods.getAllDeployedContracts().call({ from: accounts[0] })
         assert.ok(deployedContractAddress)
      })

      it("contribute to campaign", async () => {
         // const contribute = await 
      })

      it("create request", async () => {

      })

      it("approve request", async () => {
        
      })

      it("finalize request", async () => {
        
      })
})

