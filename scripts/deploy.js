const contractData = require('../config')

const deploy = async () => {
    const { abi, bytecode } = await contractData('CampaignFactory')
    const accounts = await web3.eth.getAccounts()
    
    const result = await new web3.eth.Contract(abi)
         .deploy({ data: bytecode })
         .send({ gas: '10000000', from: accounts[0] })

    console.log('Contracts deployed at: ' + result.options.address);
}

// npx hardhat run scripts/deploy.js --network sepolia

// Deployed at: 0x3b25194228E6a836487952C87d50d664A4E8DE34
deploy()