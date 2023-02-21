<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar :icon="`img:${icon}`" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="txn-header">{{ header }}</q-item-label>
      <q-item-label class="txn-detail">{{ contractCaption }}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-item-label class="txn-value">{{ valueIndicator }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { toRefs, ref, onMounted } from "vue";
import { shortAddress } from "src/common/utils";

const props = defineProps({
  tx: {
    type: Object,
    required: true,
  },
});

const denomination = 1000000;
const { tx } = toRefs(props);
const { tx_id, fee_rate, tx_status, contract_call } = toRefs(tx.value);
const icon = ref("");
const contractCaption = ref("");
const valueIndicator = ref("");
const header = ref("");
const [contractAddress, contractName] =
  contract_call.value.contract_id.split(".");
const shortAddr = shortAddress(contractAddress);

onMounted(async () => {
  icon.value = "/appicons/txn-contract-call.svg";
  contractCaption.value = `${shortAddr}.${contractName}`;
  const valueFormat = parseFloat(fee_rate.value / denomination).toFixed(6);
  valueIndicator.value = `-${valueFormat} STX`;
  header.value = `Contract Call: ${contract_call.value.function_name}`;
});
</script>
<style scoped></style>
