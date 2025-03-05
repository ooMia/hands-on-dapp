// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {HelloWorld} from "src/HelloWorld.sol";

contract CounterScript is Script {
    HelloWorld public world;

    function run() public {
        vm.startBroadcast(vm.envUint("ANVIL_PRIVATE_KEY"));

        world = new HelloWorld();
        world.setName("World");
        require(isStringEqual(world.getName(), "World"), "setName failed");
        console.log(msg.sender);

        vm.stopBroadcast();
    }

    function isStringEqual(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}
