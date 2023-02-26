import { openSTXTransfer } from "@stacks/connect";
import Big from "big.js";
import { appDetails } from "./constants";

/**
 *
 * @param {*} options
 * @returns boolean
 * https://connect.stacks.js.org/interfaces/_stacks_connect.STXTransferBase
 * https://connect.stacks.js.org/interfaces/_stacks_connect.RegularOptionsBase
 * amount can be a string???????? wtfffff
 */

export async function stacksTransfer(options) {
  // const { recipient, amount, memo } = options;
  // const amountMicroStx = new Big(amount * 1000000)
  console.log("stacksTransfer", options);
  return await openSTXTransfer(options);
}
