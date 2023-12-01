//SPDX-License-Identifier: Unlicense
pragma solidity >= 0.4.22 <0.9.0;
import './Campaign.sol';

contract CampaignFactory {
  address payable[] private deployedContracts;

  function createCampaign(uint minimumContribution) public returns(address) {
      // This deploy the campaign contract on the blockchain
      address newCampaignAddress = address(new Campaign(msg.sender, minimumContribution));
      deployedContracts.push(payable(newCampaignAddress));

      return address(newCampaignAddress);
  }

  function getAllDeployedContracts() public view returns(address payable[] memory) {
    return deployedContracts;
  }
}