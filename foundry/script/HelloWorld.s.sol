// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {HelloWorld} from "src/HelloWorld.sol";

contract CounterScript is Script {
    uint256 secret;
    address admin;
    HelloWorld public world;

    function setUp() public {
        secret = vm.envUint("PRIVATE_KEY"); // .env: PRIVATE_KEY=0x1234...
        admin = vm.rememberKey(secret);
        require(secret != 0 && admin != address(0), "check .env");
    }

    function run() public {
        vm.startBroadcast();

        world = new HelloWorld();
        world.setName("World");
        console.log(string(abi.encodePacked("Hello, ", world.getName(), "!")));

        vm.stopBroadcast();
    }
}
