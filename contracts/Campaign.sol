//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;


contract Campaign {
   address public manager;
   uint minimumContribution;
   mapping(address => bool) public approvers;
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
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
       //use this approach when you have a map field in a struct.
       requestsIndex++;

       //pushing requst into the requests array.
       requests.push();

       Request storage request = mapRequests[requestsIndex];
       request.description = description;
       request.value = value;
       request.recipient = recipient;
       request.complete = false;
       request.approvalCount = 0;

       //check if the sender is an approver
       //  Request memory request = Request({
       //    description: description,
       //    value: value,
       //    recipient: recipient,
       //    complete: false,
       //    approvalCount: 0
       //  });

       //You can use the syntax above to initiliaze the struct or use the below
       //Request(description, value, recipient, false);...but the above is recommended
       //requests.push(request);
    }

    function approveRequest(uint index) public {
      Request storage request = requests[index];
      require(approvers[msg.sender], 'Not an approver');
      require(!request.approvals[msg.sender], 'Address has already approved');

      request.approvals[msg.sender] = true;
      request.approvalCount++;
    }

  //  function getAllApprovers() public view returns(mapping(address => bool) memory data){
  //      return approvers;
  //  }
}
