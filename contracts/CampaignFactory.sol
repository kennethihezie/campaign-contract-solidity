//SPDX-License-Identifier: Unlicense
pragma solidity >= 0.4.22 <0.9.0;
import './Campaign.sol';

contract CampaignFactory {
  address[] private deployedContracts;

  function deployContract(uint minimumContribution) public returns(address) {
      //This deploy the campaign contract on the blockchain
      address newCampaignAddress = address(new Campaign(msg.sender, minimumContribution));
      deployedContracts.push(newCampaignAddress);

      return address(newCampaignAddress);
  }

  function getAllDeployedContracts() public view returns(address[] memory) {
    return deployedContracts;
  }
}