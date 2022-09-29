//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import "hardhat/console.sol";


contract Campaign {
    address public manager;
    uint minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    Request[] public requests;

    struct Request {
      string description;
      uint value;
      address recipient;
      bool complete;
      uint approvalCount;
      mapping (address => bool) approvals;
    }

    uint requestsIndex;
    //state variable for request struct
    mapping (uint => Request) mapRequests;

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
       require(msg.value > minimumContribution, 'some eth is required to be an approver');
       approvers[msg.sender] = true;
       approversCount++;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
      //use this approach when you have a map field in a struct.
       requestsIndex++;


       Request storage request = mapRequests[requestsIndex];
       request.description = description;
       request.value = value;
       request.recipient = recipient;
       request.complete = false;
       request.approvalCount = 0;

       requests.push();

       //pushing requst into the requests array.
       console.log("Request %s", requests[0].description);
    }

    function approveRequest(uint index) public {
      Request storage request = requests[index];
      require(approvers[msg.sender], 'Not an approver');
      require(!request.approvals[msg.sender], 'Address has already approved');

      request.approvals[msg.sender] = true;
      request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
      Request storage request = requests[index];

      require(!request.complete, "request has been completed");
      require(request.approvalCount > (approversCount / 2));

      //send the money to the recipient address.
      payable(request.recipient).transfer(request.value);

      request.complete = true;
    }
}
