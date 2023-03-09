import { BOOM_CONFIG } from "../config";
import { toCommonURL } from "@common/utils";
import { oldBoomNfts } from "./contracts/old-boom-nfts";
import { newBoomNfts } from "./contracts/new-boom-nfts";
import { hexToCV } from "@stacks/transactions";
import Big from "big.js";
import { merge } from "lodash-es";
import NFT from "src/models/NFT";
import {
  getBoomboxAdminAmountUstx,
  getBoomboxAmountUstx,
} from "./contracts/boombox-helper";
import axios from "axios";

export const BOOM_CONTRACT_ID = `${BOOM_CONFIG.BOOM_NFTS_CONTRACT_ADDRESS}.${BOOM_CONFIG.BOOM_NFTS_CONTRACT_NAME}`;

export function isBadgeAssetClass(contractId) {
  return contractId === BOOM_CONFIG.BADGES_CONTRACT_ID;
}

export function isBNSAssetClass(contractId) {
  return contractId === BOOM_CONFIG.BNS_CONTRACT_ID;
}

export function isOldBoomAssetClass(contractId) {
  return BOOM_CONFIG.BOOM_NFT_V1.includes(contractId);
}

export function isBoomAssetClass(contractId) {
  return BOOM_CONFIG.BOOM_NFT_V2.includes(contractId);
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
/*
 * This function is not to be used for BNS NFTs or
 * any other nft types that have non-numeric assetIds
 */
export function destructAssetClass(nftTxn) {
  const { block_height, recipient, sender, tx_id, asset_identifier } = nftTxn;
  const [contractId, assetName] = asset_identifier.split("::");
  const [contractAddress, contractName] = contractId.split(".");
  const assetIdCV = hexToCV(nftTxn.value.hex);
  let assetId;
  if (assetIdCV.type === 1) {
    assetId = new Big(assetIdCV.value).toNumber();
  } else {
    assetId = -999;
  }
  return {
    block_height,
    recipient,
    sender,
    tx_id,
    contractId,
    assetName,
    contractAddress,
    contractName,
    assetId,
  };
}

// all "construct" functions must return a NFT object
export async function constructOldBoomNFT(nft) {
  const {
    block_height,
    recipient,
    sender,
    tx_id,
    contractId,
    assetName,
    contractAddress,
    contractName,
    assetId,
  } = destructAssetClass(nft);

  try {
    const res = await oldBoomNfts.getMetadata(assetId);
    const { name, seriesId, image } = res;
    const displayImage = toCommonURL(image);
    const meta = {
      name,
      image: displayImage,
      seriesId,
      contractId,
      assetName,
      contractAddress,
      contractName,
      assetId,
      properties: {
        collection: name,
      },
      userActions: {
        transfer: {
          functionName: "transfer",
          contractId: contractId,
          functionArgs: [
            {
              id: assetId,
              sender,
              recipient,
            },
          ],
        },
        burn: {
          functionName: "burn",
          contractId,
          functionArgs: [
            {
              id: assetId,
            },
          ],
        },
      },
    };
    return new NFT(merge(meta, nft));
  } catch (e) {
    console.info("constructBoomNFT error:", nft, e);
    return new NFT({
      name: contractName,
      image: "/appicons/unknown.svg",
      description: `Error in getMetadta: ${e}`,
      contractId,
      contractName,
      block_height,
      recipient,
      sender,
      tx_id,
      assetName,
      assetId,
      seriesId: -99,
    });
  }
}

export async function constructNewBoomNFT(nft) {
  const { block_height, recipient, sender, tx_id, asset_identifier } = nft;
  const { contractId, assetName } = destructAssetClass(nft);
  const [contractAddress, contractName] = contractId.split(".");
  const assetIdCV = hexToCV(nft.value.hex);
  const assetId = new Big(assetIdCV.value).toNumber();

  let title, image, seriesId;
  try {
    const res = await newBoomNfts.getMetadata(contractId, assetId);
    const meta = {
      name: res.title,
      image: res.image,
      collection: res.seriesName,
      seriesId: res.seriesId,
      properties: {
        "collection-size": res.count,
        creator: res.creator,
        hash: res.hash,
        "mime-type": res.mimeType,
      },
      contractId,
      assetName,
      contractAddress,
      contractName,
      assetId,
    };
    return new NFT(merge(meta, nft));
  } catch (e) {
    return new NFT({
      name: contractName,
      image: "/appicons/unknown.svg",
      description: `Error in getMetadta: ${e}`,
      contractId,
      contractName,
      block_height,
      recipient,
      sender,
      tx_id,
      assetName,
      assetId,
      seriesId: -99,
    });
  }
}

export async function constructBoomboxNFT(nft) {
  const { contractId, assetName, contractAddress, contractName } =
    destructAssetClass(nft);
  const assetIdCV = hexToCV(nft.value.hex);
  const assetId = new Big(assetIdCV.value).toNumber();

  let boombox = BOOM_CONFIG.BOOMBOX_CONTRACTS.find(
    (bb) => bb.contractId === contractId
  );
  boombox.contractAddress = contractAddress;
  boombox.contractName = contractName;
  boombox.assetName = assetName;
  boombox.assetId = assetId;

  let meta = boombox;

  // let {
  //   assetName,
  //   burnBlockExpiry,
  //   stacksBlockPayout,
  //   pool,
  //   poolUrl,
  //   adminId,
  //   rewardCycleStart,
  //   numberOfCycles,
  //   poxRewardAddress,
  //   name,
  //   image,
  //   description,
  //   userActions,
  //   owner,
  //   collection,
  //   animation_url,
  //   file_type,
  //   displayClass,
  //   asset_type,
  //   properties,
  //   attributes,
  // } = boombox;

  let amountUstx, title;

  const newBBArr = [
    "bb-24",
    "b-26",
    "b-28",
    "b-30",
    "b-32",
    "b-34",
    "b-36",
    "b-38",
    "b-40",
    "b-42",
    "b-44",
    "b-46",
    "b-48",
    "b-50",
    "b-52",
    "b-54",
  ];

  meta.image = toCommonURL(meta.image, assetId);
  try {
    if (newBBArr.includes(assetName)) {
      amountUstx = await getBoomboxAdminAmountUstx(meta.adminId, assetId);
    } else {
      amountUstx = await getBoomboxAmountUstx(boombox, assetId);
    }

    if (amountUstx !== null) {
      const stxAmount = amountUstx / 1000000;
      title = `${stxAmount} STX ${name}`;
    }
    meta.name = title;
  } catch (e) {
    console.log("Error constructBoomboxNFT: ", e, contractId, assetId, nft);
  } finally {
    return new NFT(merge(meta, nft));
  }
}

export async function constructStacksArtNFT(nft) {
  const { contractId, assetName } = destructAssetClass(nft);
  const [contractAddress, contractName] = contractId.split(".");
  const assetIdCV = hexToCV(nft.value.hex);
  const assetId = new Big(assetIdCV.value).toNumber();

  let displayClass = "";
  let meta = {};
  switch (contractName) {
    case "stacks-punks-v3":
      // stacks punks
      meta = {
        name: `Stacks Punk #${assetId}`,
        image: `https://www.stackspunks.com/assets/punks/punk${assetId}.png`,
        assetName: "stacks-punks",
        seriesId: null,
        seriesCreator: "StacksPunks",
        seriesName: "Stacks Punks",
        displayClass: "punks",
        contractId,
        contractName,
        contractAddress,
        assetName,
        assetId,
        userActions: {
          transfer: {
            functionName: "transfer",
            contractId: contractId,
            assetId: assetId,
          },
        },
      };
      break;
    case "stacks-pops":
      // ipfs.io/ipfs/QmPAenbtyzFXCYWnmbcp1gRoJeH229nr4y37Gb32ePLSv6/10.png
      // example from mardi
      meta = {
        name: `Stacks Pops #${assetId}`,
        image: `https://cloudflare-ipfs.com/ipfs/QmPAenbtyzFXCYWnmbcp1gRoJeH229nr4y37Gb32ePLSv6/${assetId}.png`,
        assetName: "stacks-pops",
        seriesId: null,
        seriesCreator: "axopoa.stx",
        seriesName: "Stacks Pops",
        contractId,
        contractName,
        contractAddress,
        assetName,
        assetId,
        userActions: {
          transfer: {
            functionName: "transfer",
            contractId: contractId,
            assetId: assetId,
          },
        },
      };
      break;
    case "phases-of-satoshi":
      meta = {
        name: `Phases of Satoshi #${assetId}`,
        image: `https://placeholder.via.com/200x200`,
        assetName: "phases-of-satoshi",
        seriesId: null,
        seriesCreator: "phases",
        seriesName: "Phases of Satoshi",
        contractId,
        contractName,
        contractAddress,
        assetName,
        assetId,
        userActions: {
          transfer: {
            functionName: "transfer",
            contractId: contractId,
            assetId: assetId,
          },
        },
      };
      break;
    default:
      meta = {
        name: "Stacks Arts",
        image: "/images/wow.jpg",
        assetName: "--stacks-arts--",
        seriesId: null,
        seriesCreator: "Stacks Arts",
        seriesName: "Stacks Arts",
        contractId,
        contractName,
        contractAddress,
        assetName,
        assetId,
        userActions: {
          transfer: {
            functionName: "transfer",
            contractId: contractId,
            assetId: assetId,
          },
        },
      };
  }

  return new NFT(merge(meta, nft));
}

export async function constructFreePunkNFT(nft) {
  const { contractId, assetName } = destructAssetClass(nft);
  const [contractAddress, contractName] = contractId.split(".");
  const assetIdCV = hexToCV(nft.value.hex);
  const assetId = new Big(assetIdCV.value).toNumber();

  const meta = {
    name: `Free Punk #${assetId}`,
    image: `https://punks.fra1.cdn.digitaloceanspaces.com/assets/punks/punk${assetId}.png`,
    creator: "Unknown",
    collection: "Free Punks",
    contractId,
    contractAddress,
    contractName,
    assetName,
    assetId,
    displayClass: "punks",
    userActions: {
      transfer: {
        functionName: "transfer",
        contractId: contractId,
        assetId: assetId,
      },
    },
    properties: {
      "collection-size": 10000,
    },
  };

  return new NFT(merge(meta, nft));
}

export async function constructNFT(nft) {
  const { contractId, assetName, contractAddress, contractName } =
    destructAssetClass(nft);
  const assetIdCV = hexToCV(nft.value.hex);
  const assetId = new Big(assetIdCV.value).toNumber();

  try {
    let {
      title,
      name,
      image,
      description,
      attributes,
      properties,
      collection,
      price,
      size,
      asset_type,
      video,
      animation_url,
      audio,
    } = await getMetadataFromTokenUri(contractAddress, contractName, assetId);

    if (properties === undefined) {
      properties = {};
    }
    if (attributes === undefined) {
      attributes = [];
    }
    if (description === undefined) {
      description = "";
    }

    if (price) properties.price = price;
    if (size) properties.size = size;
    if (asset_type) properties.asset_type = asset_type;
    // const owner = await getOwner(contractId, assetId);
    // const { name: assetName } = await getNonFungibleToken(
    //   contractAddress,
    //   contractName
    // );
    if (image) {
      if (isCIDAssetClass(contractId)) {
        image = "https://cloudflare-ipfs.com/ipfs/" + image;
      }
      image = toCommonURL(image);
    }
    const meta = {
      name,
      image,
      description,
      attributes,
      properties,
      contractId,
      contractName,
      assetName,
      assetId,
      collection: collection || assetName,
      userActions: {
        transfer: {
          functionName: "transfer",
          contractId,
          assetId: assetId,
        },
      },
      animation_url: animation_url || video || audio,
    };
    return new NFT(merge(meta, nft));
  } catch (e) {
    console.log(
      `Error constructNFT: , contractId: ${contractId}\n assetId: ${assetId}\n nft: ${nft}\n\n${e}`
    );
    return nft;
  }
}

export async function constructBnsNFT(nft) {
  const { block_height, recipient, sender, tx_id, asset_identifier } = nft;
  const [contractId, assetName] = asset_identifier.split("::");
  const [contractAddress, contractName] = contractId.split(".");
  const assetIdCV = hexToCV(nft.value.hex);
  const bnsname = new TextDecoder().decode(assetIdCV.data.name.buffer);
  const bnsnamespace = new TextDecoder().decode(
    assetIdCV.data.namespace.buffer
  );
  const properties = {
    name: `${bnsname}.${bnsnamespace}`,
  };

  const meta = {
    name: `${bnsname}.${bnsnamespace}`,
    image: "/images/tokens/metaverse_big-bitcoin.png",
    contractId,
    assetName,
    contractName,
    contractAddress,
    collection: "BNS",
    properties,
    userActions: {},
  };

  return new NFT(merge(meta, nft));
}

export async function constructBadgeNFT(nft) {
  const { contractId, assetName } = destructAssetClass(nft);
  const [contractAddress, contractName] = contractId.split(".");
  const assetIdCV = hexToCV(nft.value.hex);
  const assetId = new Big(assetIdCV.value).toNumber();
  const result = await getContractMetadata(contractId, assetName);

  const { uri, title } = result;
  if (BOOM_CONFIG.network === "testnet") {
    console.log({ uri, title, result });
  }

  const name = `Stacks 2.0 Launch Badge #${assetId}`;

  const meta = {
    name,
    image: uri,
    collection: title,
    contractId,
    contractName,
    contractAddress,
    assetName,
    assetId,
    userActions: {},
    properties: {},
    attributes: [],
  };

  return new NFT(merge(meta, nft));
}

async function getMetadataFromTokenUri(contractAddress, contractName, assetId) {
  const url = `${process.env.API_TOKEN_URI}?contractAddress=${contractAddress}&contractName=${contractName}&assetId=${assetId}`;
  let result = {};
  console.log("url", url);
  try {
    const res = await axios.get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    // const res = await fetch(url, {
    //   method: "GET",
    //   mode: "no-cors", // no-cors, *cors, same-origin
    // });
    const data = await res.data;
    if (data.ok) {
      result = await axios.get(data.result);
      return await result.data;
    } else {
      console.log("getMetadataFromTokenUri failed", res.data);
      return result;
    }
  } catch (e) {
    console.log(
      "get-token-uri failed",
      contractAddress,
      contractName,
      assetId,
      e
    );
    return {
      name: `${contractAddress}.${contractName} #${assetId}`,
      image: "/appicons/unknown.svg",
      description: "Error loading ...",
    };
  }
}
