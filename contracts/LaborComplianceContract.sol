// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IMiningCompliance.sol";

contract LaborComplianceContract is IMiningCompliance {
    mapping(address => LaborCompliance) public laborRecords;
    mapping(address => mapping(uint256 => string)) public incidentReports;
    mapping(address => uint256) public incidentCounts;
    
    uint256 public constant MINIMUM_AGE = 18;
    uint256 public constant MAX_INCIDENTS_PER_YEAR = 3;
    uint256 public constant SAFETY_AUDIT_FREQUENCY = 180 days; // 6 months
    
    address public laborRegulator;
    
    event SafetyIncidentReported(address indexed miner, string incident);
    event SafetyTrainingCompleted(address indexed miner, uint256 workers);
    event LaborViolation(address indexed miner, string violation);
    
    modifier onlyLaborRegulator() {
        require(msg.sender == laborRegulator, "Only labor regulator");
        _;
    }
    
    constructor() {
        laborRegulator = msg.sender;
    }
    
    function updateLaborCompliance(
        address miner,
        uint256 totalWorkers,
        uint256 minAge,
        bool safetyTrainingCompleted,
        bool fairWagesCompliant
    ) external onlyLaborRegulator {
        require(minAge >= MINIMUM_AGE, "Minimum age violation");
        
        laborRecords[miner] = LaborCompliance({
            totalWorkers: totalWorkers,
            minAge: minAge,
            safetyTrainingCompleted: safetyTrainingCompleted,
            fairWagesCompliant: fairWagesCompliant,
            safetyIncidents: new string[](0),
            lastSafetyAudit: block.timestamp
        });
        
        if (safetyTrainingCompleted) {
            emit SafetyTrainingCompleted(miner, totalWorkers);
        }
        
        emit AuditCompleted(miner, block.timestamp);
    }
    
    function reportSafetyIncident(
        address miner,
        string memory incident
    ) external onlyLaborRegulator {
        uint256 currentCount = incidentCounts[miner];
        incidentReports[miner][currentCount] = incident;
        incidentCounts[miner]++;
        
        emit SafetyIncidentReported(miner, incident);
        
        // Check if incidents exceed threshold
        if (incidentCounts[miner] > MAX_INCIDENTS_PER_YEAR) {
            emit LaborViolation(miner, "Excessive safety incidents");
        }
    }
    
    function checkLaborCompliance(address miner) external view returns (bool compliant, string memory reason) {
        LaborCompliance memory data = laborRecords[miner];
        
        // Check if safety audit is recent
        if (block.timestamp - data.lastSafetyAudit > SAFETY_AUDIT_FREQUENCY) {
            return (false, "Safety audit overdue");
        }
        
        // Check minimum age compliance
        if (data.minAge < MINIMUM_AGE) {
            return (false, "Child labor detected");
        }
        
        // Check safety training
        if (!data.safetyTrainingCompleted) {
            return (false, "Safety training not completed");
        }
        
        // Check fair wages
        if (!data.fairWagesCompliant) {
            return (false, "Fair wage standards not met");
        }
        
        // Check incident count
        if (incidentCounts[miner] > MAX_INCIDENTS_PER_YEAR) {
            return (false, "Excessive safety incidents");
        }
        
        return (true, "Labor compliance verified");
    }
    
    function resetIncidentCount(address miner) external onlyLaborRegulator {
        incidentCounts[miner] = 0;
    }
}
