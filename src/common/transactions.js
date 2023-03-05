import { openSTXTransfer } from "@stacks/connect";
import Big from "big.js";
import { appDetails } from "./constants";
import { cvToHex, cvToString, uintCV } from "@stacks/transactions";
/**
 *
 * @param {*} options
 * @returns boolean
 * https://connect.stacks.js.org/interfaces/_stacks_connect.STXTransferBase
 * https://connect.stacks.js.org/interfaces/_stacks_connect.RegularOptionsBase
 * amount can be a string???????? wtfffff
 */

export async function transferSTX(options) {
  // const { recipient, amount, memo } = options;
  // const amountMicroStx = new Big(amount * 1000000)
  console.log("stacksTransfer", options);
  return await openSTXTransfer(options);
}

export async function transferBTC(options) {
  console.log("btcTransfer", options);
}

export async function transferToken(options) {
  console.log("tokenTransfer", options);
}

export async function openRevokeStx() {
  const functionName = "revoke-delegate-stx";
  const functionArgs = [];
  const popup = await openContractCall({
    contractAddress: BOOM_CONFIG.POX_CONTRACT_ADDRESS,
    contractName: "pox",
    functionName,
    functionArgs,
    onFinish: async (data) => {
      this.submitting = false;
      this.submitted = !!data.txId;
      this.txId = data.txId;
      const functionArgNames = [];
      let pendingTxn = {
        sender_address: this.account.address,
        contract_call: {
          contract_id: `${this.poxAddress}.${this.poxName}`,
          function_name: functionName,
          function_args: functionArgs.map((cv, i) => {
            return {
              hex: cvToHex(cv),
              repr: cvToString(cv),
              name: functionArgNames[i],
              type: cv.type,
            };
          }),
        },
        tx_id: data.txId,
        tx_status: "pending",
        txRaw: data.txRaw,
        network: this.networkString,
        tx_type: "contract_call",
      };
      try {
        console.log("added");
      } catch (e) {
        console.log(e);
      }
    },
  });
}

export async function openDelegateStx(options) {
  const { amount, address } = options;

  if (amount < 40) {
    alert("Amount must be at least 40 STX");
    return;
  }
  const functionName = "stack-stx";
  // amount-ustx
  // pox-addr
  // start-burn-ht
  // lock-period
  const poxAddr = poxAddrCVFromBitcoin("33WSGLeVoEpuZDjB54HKZ1y5YsERELoVNq");
  const functionArgs = [
    uintCV(amount * 1000000),
    poxAddr,
    uintCV(779300),
    uintCV(1),
  ];
  const popup = await openContractCall({
    contractAddress: "SP000000000000000000002Q6VF78",
    contractName: "pox",
    functionName,
    functionArgs,
    onFinish: async (data) => {
      this.submitting = false;
      this.submitted = !!data.txId;
      if (data.txId) {
        this.$root.$emit("transaction-success", {
          tx_id: data.txId,
          fee_rate: 359,
          sender_address: this.account.address,
          tx_status: "pending",
          tx_type: "contract_call",
          contract_call: {
            contract_id: `${contractAddress}.${contractName}`,
            function_name: functionName,
            function_args: functionArgs.map((cv, i) => {
              return {
                hex: cvToHex(cv),
                repr: cvToString(cv),
                name: functionArgs[i],
                type: cv.type,
              };
            }),
          },
        });
      }
    },
  });
}
