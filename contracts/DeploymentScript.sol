// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MiningLicenseContract.sol";
import "./EnvironmentalComplianceContract.sol";
import "./LaborComplianceContract.sol";
import "./SupplyChainTrackingContract.sol";
import "./MasterComplianceContract.sol";

contract EthicalMineDeployment {
    MiningLicenseContract public licenseContract;
    EnvironmentalComplianceContract public environmentalContract;
    LaborComplianceContract public laborContract;
    SupplyChainTrackingContract public supplyChainContract;
    MasterComplianceContract public masterContract;
    
    event SystemDeployed(
        address licenseContract,
        address environmentalContract,
        address laborContract,
        address supplyChainContract,
        address masterContract
    );
    
    function deployEthicalMineSystem() external {
        // Deploy individual contracts
        licenseContract = new MiningLicenseContract();
        environmentalContract = new EnvironmentalComplianceContract();
        laborContract = new LaborComplianceContract();
        supplyChainContract = new SupplyChainTrackingContract();
        
        // Deploy master contract
        masterContract = new MasterComplianceContract(
            address(licenseContract),
            address(environmentalContract),
            address(laborContract),
            address(supplyChainContract)
        );
        
        emit SystemDeployed(
            address(licenseContract),
            address(environmentalContract),
            address(laborContract),
            address(supplyChainContract),
            address(masterContract)
        );
    }
    
    function getContractAddresses() external view returns (
        address license,
        address environmental,
        address labor,
        address supplyChain,
        address master
    ) {
        return (
            address(licenseContract),
            address(environmentalContract),
            address(laborContract),
            address(supplyChainContract),
            address(masterContract)
        );
    }
}
