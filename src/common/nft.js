import BOOM_CONFIG from "../config";

export const BOOM_CONTRACT_ID = `${BOOM_CONFIG.BOOM_NFTS_CONTRACT_ADDRESS}.${BOOM_CONFIG.BOOM_NFTS_CONTRACT_NAME}`;

export function isBadgeAssetClass(contractId) {
  return contractId === BOOM_CONFIG.BADGES_CONTRACT_ID;
}

export function isBNSAssetClass(contractId) {
  return contractId === BOOM_CONFIG.BNS_CONTRACT_ID;
}

export function isBoomAssetClass(contractId) {
  return BOOM_CONFIG.boomNFTContracts.includes(contractId);
}

export function isStacksArtAssetClass(contractId) {
  return stacksArtContracts.includes(contractId);
}

export function isCIDAssetClass(contractId) {
  return BOOM_CONFIG.CIDContracts.includes(contractId);
}

export function isBoomBoxAssetClass(contractId) {
  return (
    BOOM_CONFIG.boomboxContracts.findIndex(
      (contract) => contract.contractId === contractId
    ) >= 0
  );
}
