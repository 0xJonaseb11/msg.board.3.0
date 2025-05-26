
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
* @author Sebera Jonas
* @title MessageBoard
* @dev A simple contract to store a message 
 */

contract MessageBoard {
    string private message;

    event MessageUpdated(string newMessage);

    function updateMessage(string memory _newMessage) public {
        message = _newMessage;
        emit MessageUpdated(_newMessage);
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function clearMessage() public {
        message = "";
        emit MessageUpdated("");
    }
}