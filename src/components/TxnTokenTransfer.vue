<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar :icon="`img:${icon}`" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ header }}</q-item-label>
      <q-item-label>{{ transferCaption }}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-item-label>{{ valueIndicator }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { defineProps, toRefs, ref, onMounted } from "vue";
import { useUserStore } from "@stores/user";
import { resolveBns } from "src/common/utils";

const userStore = useUserStore();

const props = defineProps({
  tx: {
    type: Object,
    required: true,
  },
});

const denomination = 1000000;
const { tx } = toRefs(props);
const { tx_id, fee_rate, tx_status, sender_address, token_transfer } = toRefs(
  tx.value
);
const icon = ref("");
const transferCaption = ref("");
const valueIndicator = ref("");
const header = ref("");

onMounted(async () => {
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
});
</script>
