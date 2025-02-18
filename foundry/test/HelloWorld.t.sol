// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {HelloWorld, NameUnset, Register} from "src/HelloWorld.sol";
import {stdError} from "forge-std/StdError.sol";

contract CounterTest is Test {
    HelloWorld public world;

    function setUp() public {
        world = new HelloWorld();
        world.setName("World");
    }

    function testFuzz_SetName(string calldata _name) public {
        vm.expectEmitAnonymous();
        emit Register(address(this), _name);
        world.setName(_name);
        assertEq(world.getName(), _name);
    }

    function test_RevertWhen_NameNotSet() public {
        HelloWorld newWorld = new HelloWorld();
        vm.expectRevert(NameUnset.selector);
        newWorld.getName();
    }
}
