// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IMiningCompliance.sol";

contract SupplyChainTrackingContract is IMiningCompliance {
    struct MineralBatch {
        string batchId;
        address miner;
        MineralType mineralType;
        uint256 quantity; // in kg
        uint256 extractionDate;
        Country originCountry;
        string gpsCoordinates;
        bool ethicallySourced;
        address[] supplyChainActors;
        string[] certifications;
    }
    
    struct TransferRecord {
        address from;
        address to;
        uint256 timestamp;
        string location;
        string transportMethod;
        bool qualityVerified;
    }
    
    mapping(string => MineralBatch) public mineralBatches;
    mapping(string => TransferRecord[]) public transferHistory;
    mapping(address => bool) public authorizedActors;
    
    address public supplyChainRegulator;
    
    event BatchCreated(string indexed batchId, address indexed miner, MineralType mineralType);
    event BatchTransferred(string indexed batchId, address indexed from, address indexed to);
    event QualityVerified(string indexed batchId, address indexed verifier);
    
    modifier onlySupplyChainRegulator() {
        require(msg.sender == supplyChainRegulator, "Only supply chain regulator");
        _;
    }
    
    modifier onlyAuthorizedActor() {
        require(authorizedActors[msg.sender], "Not authorized supply chain actor");
        _;
    }
    
    constructor() {
        supplyChainRegulator = msg.sender;
        authorizedActors[msg.sender] = true;
    }
    
    function createMineralBatch(
        string memory batchId,
        address miner,
        MineralType mineralType,
        uint256 quantity,
        Country originCountry,
        string memory gpsCoordinates,
        string[] memory certifications
    ) external onlyAuthorizedActor {
        require(bytes(mineralBatches[batchId].batchId).length == 0, "Batch already exists");
        
        address[] memory initialActors = new address[](1);
        initialActors[0] = miner;
        
        mineralBatches[batchId] = MineralBatch({
            batchId: batchId,
            miner: miner,
            mineralType: mineralType,
            quantity: quantity,
            extractionDate: block.timestamp,
            originCountry: originCountry,
            gpsCoordinates: gpsCoordinates,
            ethicallySourced: true, // Will be verified by compliance checks
            supplyChainActors: initialActors,
            certifications: certifications
        });
        
        emit BatchCreated(batchId, miner, mineralType);
    }
    
    function transferBatch(
        string memory batchId,
        address to,
        string memory location,
        string memory transportMethod
    ) external onlyAuthorizedActor {
        require(bytes(mineralBatches[batchId].batchId).length > 0, "Batch does not exist");
        
        // Add transfer record
        transferHistory[batchId].push(TransferRecord({
            from: msg.sender,
            to: to,
            timestamp: block.timestamp,
            location: location,
            transportMethod: transportMethod,
            qualityVerified: false
        }));
        
        // Update supply chain actors
        mineralBatches[batchId].supplyChainActors.push(to);
        
        emit BatchTransferred(batchId, msg.sender, to);
    }
    
    function verifyQuality(string memory batchId) external onlyAuthorizedActor {
        require(bytes(mineralBatches[batchId].batchId).length > 0, "Batch does not exist");
        
        // Update the latest transfer record
        TransferRecord[] storage transfers = transferHistory[batchId];
        if (transfers.length > 0) {
            transfers[transfers.length - 1].qualityVerified = true;
        }
        
        emit QualityVerified(batchId, msg.sender);
    }
    
    function getBatchHistory(string memory batchId) external view returns (
        MineralBatch memory batch,
        TransferRecord[] memory transfers
    ) {
        return (mineralBatches[batchId], transferHistory[batchId]);
    }
    
    function authorizeActor(address actor) external onlySupplyChainRegulator {
        authorizedActors[actor] = true;
    }
    
    function revokeActorAuthorization(address actor) external onlySupplyChainRegulator {
        authorizedActors[actor] = false;
    }
    
    function markAsUnethical(string memory batchId, string memory reason) external onlySupplyChainRegulator {
        mineralBatches[batchId].ethicallySourced = false;
        emit ViolationReported(mineralBatches[batchId].miner, reason);
    }
}
