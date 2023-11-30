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

// Deployed at: 0x613ec2803dE92731be522e662D39c7863DA4d608
deploy()