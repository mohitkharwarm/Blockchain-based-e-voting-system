pragma solidity >=0.4.22 <0.9.0;
contract Election{
    //Structure of Candidates
    struct candidate{
        uint id;
        string name;
        uint voteCount;
    }

    //Number of candidates
    uint public count=0; 
    mapping(uint => candidate) public candidates;

    //Making one address as admin to control the addition of candidates
    constructor() public{
       admin=msg.sender;
    }
    modifier onlyadmin(){
       require(msg.sender==admin);
       _;
    }
    address admin;
    // Function to add candidate by the Admin
    function addperson(string memory _name)public onlyadmin{
       count+=1;
       candidates[count]=candidate(count,_name,0);
    }
   // Store accounts that have voted
    mapping(address => bool) public voters;
    
      // voted event
    event votedEvent (
        uint indexed _candidateId
    );
    
    function vote (uint _candidateId) public {
        //to check wether the voter is valid or not.
        require(!voters[msg.sender]);

        // condition for a valid candidate
        require(_candidateId > 0 && _candidateId <= count);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}
