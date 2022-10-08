//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import './Campaign.sol';

contract CampaignFactory {
  address[] public deployedContracts;

  function deployContract(uint minimumContribution) public payable returns(address) {
      //This deploy the campaign contract on the blockchain
      Campaign newCampaign = new Campaign(msg.sender, minimumContribution);
      deployedContracts.push(address(newCampaign));

      return address(newCampaign);
  }

  function getAllDeployedContracts() public view returns(address[] memory contracts) {
    return deployedContracts;
  }
}