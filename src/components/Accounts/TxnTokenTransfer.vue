<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar :icon="`img:${icon}`" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="txn-header">{{ header }}</q-item-label>
      <q-item-label class="txn-detail">{{ transferCaption }}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-item-label class="txn-value">{{ valueIndicator }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { toRefs, ref, onMounted } from "vue";
import { useUserStore } from "@stores/user";
import { resolveBns } from "src/common/utils";
import { supportedTokens } from "@common/constants";
import { TransactionTypes } from "@common/constants";
import { hexToCV } from "@stacks/transactions";

const userStore = useUserStore();

const props = defineProps({
  tx: {
    type: Object,
    required: true,
  },
});

const { tx } = toRefs(props);
const icon = ref("");
const transferCaption = ref("");
const valueIndicator = ref("");
const header = ref("");

onMounted(async () => {
  if (tx.value.tx_type === TransactionTypes.TOKEN_TRANSFER) {
    handleSTXTransfer(tx);
  } else {
    handleContractCall(tx);
  }
});

async function handleSTXTransfer(tx) {
  const denomination = 1000000;
  const { tx_id, fee_rate, tx_status, sender_address, token_transfer } = toRefs(
    tx.value
  );

  if (sender_address.value === userStore.getPrincipal) {
    icon.value = "/appicons/txn-token-transfer-send.svg";
    const addr = await resolveBns(token_transfer.value.recipient_address);
    transferCaption.value = `To: ${addr}`;
    const valueFormat = parseFloat(
      token_transfer.value.amount / denomination
    ).toFixed(2);
    valueIndicator.value = `-${valueFormat} STX`;
    header.value = "Sent STX";
  } else {
    icon.value = "/appicons/txn-token-transfer-receive.svg";
    const addr = await resolveBns(sender_address.value);
    transferCaption.value = `From: ${addr}`;
    const valueFormat = parseFloat(
      token_transfer.value.amount / denomination
    ).toFixed(2);
    valueIndicator.value = `+${valueFormat} STX`;
    header.value = "Received STX";
  }
}

// Stacks does not show incoming sip-10 tokens as a transation
// for the recipeint.  So, by definittion, this is a transfer out (Send)
async function handleContractCall(tx) {
  const { tx_id, fee_rate, tx_status, contract_call } = toRefs(tx.value);
  const { contract_id, function_name, function_args } = contract_call.value;
  const [amount, sender, recipient, memo] = function_args;
  const amt = parseInt(hexToCV(amount.hex).value);
  console.log("contract_call", contract_call.value);
  console.log("contract_id", contract_id);

  const token = supportedTokens.find((t) => {
    const cid = t.assetIdentifier.split("::")[0];
    return cid === contract_id;
  });
  console.log("token", token);
  icon.value = "/appicons/txn-token-transfer-send.svg";
  const addr = await resolveBns(recipient.repr);
  console.log("addr", addr);
  transferCaption.value = `To: ${addr}`;
  const valueFormat = (amt / token.denomination).toFixed(2);
  valueIndicator.value = `-${valueFormat} ${token.symbol || "SIP-10"}`;
  header.value = `Sent ${token.symbol || "SIP-10"}`;
}
</script>
