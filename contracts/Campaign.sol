//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Campaign {
    struct Request {
      string description;
      uint value;
      address recipient;
      bool complete;
    }

   address public manager;
   uint minimumContribution;
   address[] public approvers;
   Request[] public requests;

   modifier restricted(){
        require(msg.sender == manager);
        _;
   }

   constructor(uint minimum){
       manager = msg.sender;
       minimumContribution = minimum;
    }

   function contribute() public payable {
       //msg.value is the amount in wei user is sending
       require(msg.value > minimumContribution);
       approvers.push(msg.sender);
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
       Request memory request = Request({
         description: description,
         value: value,
         recipient: recipient,
         complete: false
       });

       //You can use the syntax above to initiliaze the struct or use the below
       //Request(description, value, recipient, false);...but the above is recommended

       requests.push(request);
    }

   function getAllApprovers() public view returns(address[] memory data){
       return approvers;
   }
}
