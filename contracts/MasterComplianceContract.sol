// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MiningLicenseContract.sol";
import "./EnvironmentalComplianceContract.sol";
import "./LaborComplianceContract.sol";
import "./SupplyChainTrackingContract.sol";

contract MasterComplianceContract {
    MiningLicenseContract public licenseContract;
    EnvironmentalComplianceContract public environmentalContract;
    LaborComplianceContract public laborContract;
    SupplyChainTrackingContract public supplyChainContract;
    
    mapping(address => uint256) public complianceScores;
    mapping(string => bool) public approvedBatches;
    
    event ComplianceScoreUpdated(address indexed miner, uint256 score);
    event BatchApproved(string indexed batchId);
    event BatchRejected(string indexed batchId, string reason);
    
    constructor(
        address _licenseContract,
        address _environmentalContract,
        address _laborContract,
        address _supplyChainContract
    ) {
        licenseContract = MiningLicenseContract(_licenseContract);
        environmentalContract = EnvironmentalComplianceContract(_environmentalContract);
        laborContract = LaborComplianceContract(_laborContract);
        supplyChainContract = SupplyChainTrackingContract(_supplyChainContract);
    }
    
    function checkFullCompliance(
        address miner,
        uint256 tonnageProduced
    ) external view returns (bool compliant, string memory reason, uint256 score) {
        uint256 totalScore = 0;
        
        // Check license compliance (25 points)
        if (licenseContract.getLicenseStatus(miner) == IMiningCompliance.ComplianceStatus.APPROVED) {
            totalScore += 25;
        } else {
            return (false, "Mining license not valid", totalScore);
        }
        
        // Check environmental compliance (25 points)
        (bool envCompliant, string memory envReason) = environmentalContract.checkEnvironmentalCompliance(miner, tonnageProduced);
        if (envCompliant) {
            totalScore += 25;
        } else {
            return (false, envReason, totalScore);
        }
        
        // Check labor compliance (25 points)
        (bool laborCompliant, string memory laborReason) = laborContract.checkLaborCompliance(miner);
        if (laborCompliant) {
            totalScore += 25;
        } else {
            return (false, laborReason, totalScore);
        }
        
        // Supply chain integrity (25 points)
        // This would require additional checks based on batch history
        totalScore += 25; // Simplified for this example
        
        return (totalScore >= 75, "Full compliance verified", totalScore);
    }
    
    function approveBatchForExport(
        string memory batchId,
        address miner,
        uint256 tonnageProduced
    ) external returns (bool approved) {
        (bool compliant, string memory reason, uint256 score) = this.checkFullCompliance(miner, tonnageProduced);
        
        complianceScores[miner] = score;
        emit ComplianceScoreUpdated(miner, score);
        
        if (compliant) {
            approvedBatches[batchId] = true;
            emit BatchApproved(batchId);
            return true;
        } else {
            emit BatchRejected(batchId, reason);
            return false;
        }
    }
    
    function getComplianceScore(address miner) external view returns (uint256) {
        return complianceScores[miner];
    }
    
    function isBatchApproved(string memory batchId) external view returns (bool) {
        return approvedBatches[batchId];
    }
}
