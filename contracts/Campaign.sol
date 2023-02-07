//SPDX-License-Identifier: Unlicense
pragma solidity >= 0.4.22 <0.9.0;


contract Campaign {
    address public manager;
    uint minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    Request[] public requests;
    mapping (address => bool) public approverState;

    struct Request {
      string description;
      uint value;
      address recipient;
      bool complete;
      uint approvalCount;
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

   constructor(address owner, uint minimum){
       manager = owner;
       minimumContribution = minimum;
    }

   function contribute() public payable {
       //msg.value is the amount in wei user is sending
       require(msg.value > minimumContribution, 'some eth is required to be an approver');
       approvers[msg.sender] = true;
       approversCount++;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted {
      Request memory request =  Request({
        description: description,
        value: value,
        recipient: recipient,
        complete: false,
        approvalCount: 0
      });

      requests.push(request);
      approverState[recipient] = false;
    }

    function approveRequest(uint index) public {
      Request storage request = requests[index];
      require(approvers[msg.sender], 'Not an approver');
      require(!approverState[msg.sender], 'Address has already approved');

      approverState[msg.sender] = true;
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
