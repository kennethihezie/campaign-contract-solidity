const { web3 } = require('hardhat');
const { abi, bytecode } = require('../config')
const assert = require('assert');


let accounts;
let campaignContract

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    campaignContract = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: [100] })
    .send({ from: accounts[0], gas: '1000000' })
})

describe("Campaign contract", async () => {
      it("Campaign contract deployed", async () => {
        assert.ok(campaignContract.options.address)
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

