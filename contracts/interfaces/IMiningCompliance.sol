// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IMiningCompliance {
    enum ComplianceStatus { PENDING, APPROVED, REJECTED, SUSPENDED }
    enum MineralType { COBALT, COPPER, GOLD, DIAMOND, TANTALUM, TIN, TUNGSTEN }
    enum Country { DRC, NAMIBIA, ZAMBIA, ANGOLA }
    
    struct MiningLicense {
        string licenseId;
        address miner;
        Country country;
        uint256 issuedDate;
        uint256 expiryDate;
        ComplianceStatus status;
        string[] certifications;
    }
    
    struct EnvironmentalData {
        uint256 carbonFootprint; // in kg CO2
        uint256 waterUsage; // in liters
        uint256 wasteGenerated; // in kg
        bool rehabilitationPlan;
        string environmentalCertificate;
        uint256 lastAuditDate;
    }
    
    struct LaborCompliance {
        uint256 totalWorkers;
        uint256 minAge;
        bool safetyTrainingCompleted;
        bool fairWagesCompliant;
        string[] safetyIncidents;
        uint256 lastSafetyAudit;
    }
    
    event ComplianceUpdated(address indexed miner, ComplianceStatus status);
    event ViolationReported(address indexed miner, string violationType);
    event AuditCompleted(address indexed miner, uint256 auditDate);
}
