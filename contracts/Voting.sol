pragma solidity ^0.5.0;

contract Voting {
 
  
  mapping (bytes32 => uint256) public votesReceived;
  
  bytes32[] public candidateList;

  constructor(bytes32[] memory candidateNames) public {
    candidateList = candidateNames;
  }

  
  function totalVotesFor(bytes32 candidate) view public returns (uint256) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  
  function voteForCandidate(bytes32 candidate) public {
    require(validCandidate(candidate));
    votesReceived[candidate] += 1;
  }

  function validCandidate(bytes32 candidate) view public returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }

   function showWinner() public view returns(bytes32){
        uint256 largest = 0; 
        uint256 i;
        bytes32 winner;

        for(i = 0; i < candidateList.length; i++){
            if(votesReceived[candidateList[i]] > largest) {
                largest = votesReceived[candidateList[i]];
                winner = candidateList[i];
            } 
        }
        return winner;
    }
}