import { c32addressDecode, versions } from "c32check";
import axios from "axios";

/**
 * returns the bns name owned by the address if any, otherwise, the address only.
 */
export async function getNameOrAddress(address) {
  try {
    const url = `https://api.hiro.so/v1/addresses/stacks/${address}`;
    const { data } = await axios.get(url);
    if (data["names"] && data["names"].length > 0) {
      return data["names"][0];
    }
  } catch (e) {
    console.log(e);
  } finally {
    return shortAddress(address);
  }
}

/**
 *
 * @param {string} name A BNS name
 * @returns the address that currently owns the name
 */
export async function nameToAddress(name) {
  try {
    const url = `https://api.hiro.so/v1/names/${name}`;
    const { data } = await axios.get(url);
    console.log("nameToAddress", data);
    return data.address;
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
    console.log("valid address");
    return {
      ok: true,
      data: input,
    };
  } else if (validName(input)) {
    console.log("valid name");
    const address = await nameToAddress(input);
    return {
      ok: true,
      data: address,
    };
  } else {
    console.log("invalid address or name");
    return {
      ok: false,
      error: "Invalid address or name",
    };
  }
}

export function shortAddress(address) {
  return `${address.substring(0, 5)}...${address.substring(
    address.length,
    address.length - 5
  )}`;
}

export function validName(name) {
  const [namePart, domainPart] = name.split(".");
  return (
    namePart &&
    domainPart &&
    namespaces["mainnet"].includes(domainPart.toUpperCase) >= 0
  );
}

export function validAddress(address) {
  try {
    const [version] = c32addressDecode(address);
    return Object.values(versions["mainnet"]).indexOf(version) >= 0;
  } catch (e) {
    console.info("Found issue validating address: ", e);
    return false;
  }
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
