// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IMiningCompliance.sol";

contract MiningLicenseContract is IMiningCompliance {
    mapping(address => MiningLicense) public minerLicenses;
    mapping(string => address) public licenseToMiner;
    mapping(address => bool) public authorizedAuditors;
    
    address public regulator;
    uint256 public constant LICENSE_DURATION = 365 days * 5; // 5 years
    
    modifier onlyRegulator() {
        require(msg.sender == regulator, "Only regulator can perform this action");
        _;
    }
    
    modifier onlyAuthorizedAuditor() {
        require(authorizedAuditors[msg.sender], "Only authorized auditors");
        _;
    }
    
    modifier validLicense(address miner) {
        require(
            minerLicenses[miner].expiryDate > block.timestamp &&
            minerLicenses[miner].status == ComplianceStatus.APPROVED,
            "Invalid or expired license"
        );
        _;
    }
    
    constructor() {
        regulator = msg.sender;
    }
    
    function issueLicense(
        address miner,
        string memory licenseId,
        Country country,
        string[] memory certifications
    ) external onlyRegulator {
        require(minerLicenses[miner].issuedDate == 0, "License already exists");
        
        minerLicenses[miner] = MiningLicense({
            licenseId: licenseId,
            miner: miner,
            country: country,
            issuedDate: block.timestamp,
            expiryDate: block.timestamp + LICENSE_DURATION,
            status: ComplianceStatus.APPROVED,
            certifications: certifications
        });
        
        licenseToMiner[licenseId] = miner;
        emit ComplianceUpdated(miner, ComplianceStatus.APPROVED);
    }
    
    function suspendLicense(address miner, string memory reason) external onlyRegulator {
        require(minerLicenses[miner].issuedDate != 0, "License does not exist");
        minerLicenses[miner].status = ComplianceStatus.SUSPENDED;
        emit ViolationReported(miner, reason);
        emit ComplianceUpdated(miner, ComplianceStatus.SUSPENDED);
    }
    
    function renewLicense(address miner) external onlyRegulator {
        require(minerLicenses[miner].issuedDate != 0, "License does not exist");
        minerLicenses[miner].expiryDate = block.timestamp + LICENSE_DURATION;
        minerLicenses[miner].status = ComplianceStatus.APPROVED;
        emit ComplianceUpdated(miner, ComplianceStatus.APPROVED);
    }
    
    function addAuthorizedAuditor(address auditor) external onlyRegulator {
        authorizedAuditors[auditor] = true;
    }
    
    function getLicenseStatus(address miner) external view returns (ComplianceStatus) {
        if (minerLicenses[miner].expiryDate <= block.timestamp) {
            return ComplianceStatus.REJECTED; // Expired
        }
        return minerLicenses[miner].status;
    }
}
