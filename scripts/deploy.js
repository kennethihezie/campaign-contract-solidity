const contractData = require('../config')

const deploy = async () => {
    const { abi, bytecode } = await contractData('CampaignFactory')
    const accounts = await web3.eth.getAccounts()
    
    const result = await new web3.eth.Contract(abi)
         .deploy({ data: bytecode })
         .send({ gas: '10000000', from: accounts[0] })
    console.log('Contracts deployed at: ' + result.options.address);
}

// Deployed at: 0x1f410C7A23b2bcFd32c22439Fbb626a2271075f7
deploy()