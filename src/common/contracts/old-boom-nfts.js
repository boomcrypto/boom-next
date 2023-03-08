import { SmartContractsApi } from "@stacks/blockchain-api-client";
import { cvToHex, cvToJSON, hexToCV, uintCV } from "@stacks/transactions";
import { resolveBns } from "../utils";

const contractApi = new SmartContractsApi();

export const oldBoomNfts = {
  contractId: "SP1K1A1PMGW2ZJCNF46NWZWHG8TS1D23EGH1KNK60.boom-nfts",
  title: "Boom NFT",
  getMetadata: async (assetId) => {
    const resultEntry = await contractApi.getContractDataMapEntry({
      contractAddress: "SP1K1A1PMGW2ZJCNF46NWZWHG8TS1D23EGH1KNK60",
      contractName: "boom-nfts",
      mapName: "meta",
      key: cvToHex(uintCV(assetId)),
      proof: 0,
    });
    if (resultEntry.data === "0x09") {
      console.log("old boom nfts asset not found: ", assetId);
      return {
        name: "Not found",
        image: "/appicons/unknown.svg",
        seriesName: "Not found",
        creator: "Not found",
        mimeType: "Not found",
        hash: "Not found",
      };
    } else {
      const resultData = hexToCV(resultEntry.data);
      const meta = cvToJSON(resultData.value);
      const creator = await resolveBns(meta.value["creator"].value);

      return {
        name: `${meta.value["series-name"].value} #${meta.value.number.value}`,
        image: meta.value.uri.value,
        properties: {
          collection: `${meta.value["series-name"].value}`,
          creator: creator,
          "mime-type": `${meta.value["mime-type"].value}`,
          hash: `${meta.value["hash"].value}`,
        },
      };
    }
  },
};
