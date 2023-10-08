// SPDX-License-Identifier: MIT
// ProxyAdmin
// GNSTradingCallbacksV6_4_1
// GNSNftRewardsV6_4_1
// Borrowing fees
// gDAI
// GNSReferralsV6_2
// GNSPairInfosV6_1
// GNSPairsStorageV6
// GNSTradingStorageV5
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

// Kept for backwards compatibility with older versions of Hardhat and Truffle plugins.
contract AdminUpgradeabilityProxy is TransparentUpgradeableProxy {
    constructor(address logic, address admin, bytes memory data) payable TransparentUpgradeableProxy(logic, admin, data) {}
}
