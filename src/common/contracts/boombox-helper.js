import {
  Configuration,
  SmartContractsApi,
} from "@stacks/blockchain-api-client";
import {
  cvToHex,
  cvToJSON,
  hexToCV,
  uintCV,
  tupleCV,
  cvToString,
} from "@stacks/transactions";
import { BOOM_CONFIG } from "src/config";

const apiConfig = new Configuration({
  basePath: BOOM_CONFIG.API_BASE_PATH,
});
const contractApi = new SmartContractsApi(apiConfig);

export async function getBoomboxAmountUstx(boombox, assetId) {
  try {
    const mapEntry = await contractApi.getContractDataMapEntry({
      contractAddress: boombox.contractAddress,
      contractName: boombox.contractName,
      mapName: "meta",
      key: cvToHex(uintCV(assetId)),
      proof: 0,
    });
    if (mapEntry.data === "0x09") {
      return null;
    } else {
      const resultData = hexToCV(mapEntry.data);
      const meta = cvToJSON(resultData.value);
      return meta.value["stacked-ustx"].value.value;
    }
  } catch (e) {
    console.error("getBoomboxAmountUstx", e, boombox, assetId);
    return null;
  }
}

export function amountUstxToText(amountUstx) {
  return (amountUstx / 1000000).toLocaleString({
    style: "currency",
    currency: "STX",
  });
}

export async function getBoomboxMetadata(boombox, assetId) {
  const amountUstx = await getBoomboxAmountUstx(boombox, assetId);
  if (amountUstx < 0) {
    return boombox;
  } else {
    const amountText = amountUstxToText(amountUstx);
    return {
      title: `${amountText} ${boombox.title}`,
      image: boombox.image,
      seriesName: boombox.seriesName,
      seriesId: -99,
      assetName: boombox.assetName,
    };
  }
}

export async function getBoomboxAdminAmountUstx(assetId, nftId) {
  try {
    const meta = await contractApi.getContractDataMapEntry({
      contractAddress: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      contractName: "boombox-admin-v3",
      mapName: "meta",
      key: cvToHex(tupleCV({ id: uintCV(assetId), "nft-id": uintCV(nftId) })),
      proof: 0,
    });
    if (meta.data === "0x09") {
      return null;
    } else {
      const resultData = hexToCV(meta.data);
      const metaJSON = cvToJSON(resultData.value);
      return metaJSON.value["stacked-ustx"].value.value;
    }
  } catch (e) {
    console.log("getBoomboxAdminAmountUstx error", e, assetId, nftId);
    return null;
  }
}
