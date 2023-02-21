const { web3 } = require('hardhat');
const contractData = require('../config')
const assert = require('assert');

let accounts;
let factory
let campaign

beforeEach(async () => {
    const { abi, bytecode } = await contractData('CampaignFactory')
    accounts = await web3.eth.getAccounts()

    factory = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: [100] })
    .send({ from: accounts[0], gas: '10000000' })

    //deploying campaign contract
    await factory.methods.deployContract('100').send({ from: accounts[0]})
    const [ address ] = await factory.methods.getAllDeployedContracts().call({ from: accounts[0] })
    
    const campaignData = await contractData('Campaign')
    //Get instance of campaign contract
    campaign = new web3.eth.Contract(campaignData.abi, address)
})

describe("Campaign contract", async () => {

      it("deploys a factory and campaign: ", async () => {
         assert.ok(factory.options.address)
         assert.ok(campaign.options.address)
      })


      it("marks called as the campaign manager", async () => {
         const manager = await campaign.methods.manager().call()
         assert.equal(accounts[0], manager)
      })

      it("allow people to contribute money and marks them as approvers", async () => {
         await campaign.methods.contribute().send({from: accounts[1], value: '200'})
         const isContributor = await campaign.methods.approvers(accounts[1]).call()
         assert(isContributor)
      })

      it("requires a minium contribution", async () => {
          try {
            await campaign.methods.contribute().send({value: '5', from: accounts[1]})
            assert(false)
         } catch (error) {
            assert(error)
          }
      })

      it("allows a manager to make a payment request", async () => {
        await campaign.methods.createRequest('Buy Mac M1 chip', '100', accounts[1]).send({from: accounts[0], gas: '1000000'})
        const request =  await campaign.methods.requests(0).call()
        console.log(request);
        assert.equal('Buy Mac M1 chip', request.description)
      })

      it("processes requests", async () => {
         //convet ether to wei
        await campaign.methods.contribute().send({from: accounts[0], value: web3.utils.toWei('10', 'ether')})
        await campaign.methods.createRequest('Buy Iphone 14 pro max', web3.utils.toWei('5', 'ether'), accounts[1]).send({from: accounts[0], gas: '1000000'})

        await campaign.methods.approveRequest(0).send({from: accounts[0], gas: '1000000'})
        await campaign.methods.finalizeRequest(0).send({from: accounts[0], gas: '1000000'})

        //get balance of an address
        let balance = await web3.eth.getBalance(accounts[1])
        //convert to ether
        balance = web3.utils.fromWei(balance, 'ether')
        balance = parseFloat(balance)

        console.log(balance);
        assert(balance > 104)
      })
})

