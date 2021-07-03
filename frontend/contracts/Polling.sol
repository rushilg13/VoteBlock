pragma solidity ^0.8.0;

contract Polling{

    struct Option {
        uint id;
        string name;
        uint votesRecieved;
    }

    mapping (uint => Option) public options;

    uint public optionsCount;

    function addOption(string _name) private{

        optionsCount++;
        options[optionsCount] = new Option(optionsCount,_name,0);
    }

    function Polling() public{
        addOption("Red");
        addOption("Blue");
    }


}



