const storage = `
pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT

contract {{ContractName}} {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
`;

export default storage;
