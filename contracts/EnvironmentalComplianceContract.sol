// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IMiningCompliance.sol";

contract EnvironmentalComplianceContract is IMiningCompliance {
    mapping(address => EnvironmentalData) public environmentalRecords;
    mapping(address => uint256) public carbonCredits;
    
    // Environmental thresholds (adjustable by regulator)
    uint256 public maxCarbonFootprintPerTon = 1000; // kg CO2 per ton
    uint256 public maxWaterUsagePerTon = 5000; // liters per ton
    uint256 public auditFrequency = 90 days;
    
    address public environmentalRegulator;
    
    modifier onlyEnvironmentalRegulator() {
        require(msg.sender == environmentalRegulator, "Only environmental regulator");
        _;
    }
    
    constructor() {
        environmentalRegulator = msg.sender;
    }
    
    function updateEnvironmentalData(
        address miner,
        uint256 carbonFootprint,
        uint256 waterUsage,
        uint256 wasteGenerated,
        bool rehabilitationPlan,
        string memory environmentalCertificate
    ) external onlyEnvironmentalRegulator {
        environmentalRecords[miner] = EnvironmentalData({
            carbonFootprint: carbonFootprint,
            waterUsage: waterUsage,
            wasteGenerated: wasteGenerated,
            rehabilitationPlan: rehabilitationPlan,
            environmentalCertificate: environmentalCertificate,
            lastAuditDate: block.timestamp
        });
        
        emit AuditCompleted(miner, block.timestamp);
    }
    
    function checkEnvironmentalCompliance(
        address miner,
        uint256 tonnageProduced
    ) external view returns (bool compliant, string memory reason) {
        EnvironmentalData memory data = environmentalRecords[miner];
        
        // Check if audit is recent
        if (block.timestamp - data.lastAuditDate > auditFrequency) {
            return (false, "Environmental audit overdue");
        }
        
        // Check carbon footprint per ton
        if (data.carbonFootprint > maxCarbonFootprintPerTon * tonnageProduced) {
            return (false, "Carbon footprint exceeds limits");
        }
        
        // Check water usage per ton
        if (data.waterUsage > maxWaterUsagePerTon * tonnageProduced) {
            return (false, "Water usage exceeds limits");
        }
        
        // Check rehabilitation plan
        if (!data.rehabilitationPlan) {
            return (false, "No rehabilitation plan in place");
        }
        
        return (true, "Environmental compliance verified");
    }
    
    function awardCarbonCredits(address miner, uint256 credits) external onlyEnvironmentalRegulator {
        carbonCredits[miner] += credits;
    }
    
    function updateThresholds(
        uint256 newCarbonLimit,
        uint256 newWaterLimit,
        uint256 newAuditFreq
    ) external onlyEnvironmentalRegulator {
        maxCarbonFootprintPerTon = newCarbonLimit;
        maxWaterUsagePerTon = newWaterLimit;
        auditFrequency = newAuditFreq;
    }
}
