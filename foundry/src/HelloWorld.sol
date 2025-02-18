// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.28;

error NameUnset();

event Register(address indexed _address, string _name) anonymous;

contract HelloWorld {
    mapping(address => string) public names;

    function setName(string calldata _name) external {
        names[msg.sender] = _name;
        emit Register(msg.sender, _name);
    }

    modifier handleUnset(address _address) {
        require(bytes(names[_address]).length > 0, NameUnset());
        _;
    }

    function getName() external view handleUnset(msg.sender) returns (string memory) {
        return names[msg.sender];
    }

    function getName(address _address) external view handleUnset(msg.sender) returns (string memory) {
        return names[_address];
    }
}
