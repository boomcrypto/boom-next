import { NamesApi, Configuration } from "@stacks/blockchain-api-client";
import { c32addressDecode, versions } from "c32check";
import { BOOM_CONFIG } from "src/config";

const apiConfig = new Configuration({ basePath: BOOM_CONFIG.API_BASE_PATH });
const bnsApi = new NamesApi(apiConfig);

/**
 * returns the bns name owned by the address if any, otherwise, the address only.
 */
export async function getNameOrAddress(address) {
  try {
    const result = await bnsApi.getNamesOwnedByAddress({
      blockchain: "stacks",
      address,
    });
    return result.length ? result[0] : address;
  } catch (e) {
    console.log(e);
    return address;
  }
}

/**
 *
 * @param {string} name A BNS name
 * @returns the address that currently owns the name
 */
export async function nameToAddress(name) {
  try {
    const info = await bnsApi.getNameInfo({ name });
    return info.address;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

/**
 *
 * @param {string} input
 * @returns
 */
export async function recipientInputToAddress(input) {
  if (validAddress(input)) {
    return input;
  } else {
    const inputName = input.toUpperCase();
    const inputNameSuffix = inputName.split(".")[1];
    if (
      inputNameSuffix !== "ID" &&
      namespaces[BOOM_CONFIG.network].indexOf(inputNameSuffix) >= 0
    ) {
      const address = await nameToAddress(input);
      return address;
    } else {
      return "";
    }
  }
}

export function validAddress(input) {
  try {
    const [version] = c32addressDecode(input);
    return Object.values(versions[BOOM_CONFIG.network]).indexOf(version) >= 0;
  } catch (e) {
    return false;
  }
}

export function validAddressOrName(input, namespaces) {
  if (input) {
    try {
      const [version] = c32addressDecode(input);
      return Object.values(versions[BOOM_CONFIG.network]).indexOf(version) >= 0;
    } catch (e) {
      // TODO improve name check, e.g. validate namespace
      const nameParts = input.split(".");
      return (
        nameParts.length > 0 &&
        namespaces.indexOf(nameParts[nameParts.length - 1]) >= 0
      );
    }
  }
  return true;
}

export const namespaces = {
  testnet: [
    "APP",
    "BLOCKSTACK",
    "BTC",
    "GRAPHITE",
    "HELLOWORLD",
    "ID",
    "MINER",
    "MINING",
    "PODCAST",
    "STACKING",
    "STACKS",
    "STRESS-TEST",
    "STX",
  ],
  mainnet: [
    "APP",
    "BLOCKSTACK",
    "BTC",
    "GRAPHITE",
    "HELLOWORLD",
    "ID",
    "MINER",
    "MINING",
    "PODCAST",
    "STACKING",
    "STACKS",
    "STX",
  ],
};
