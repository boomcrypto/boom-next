<template>
  <q-item
    tag="a"
    :href="stacksExplorerLinkTx(tx_id)"
    rel="noreferrer"
    target="_blank"
  >
    <q-item-section top avatar>
      <q-avatar :icon="`img:${icon}`" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="txn-header">{{ header }}</q-item-label>
      <q-item-label class="txn-detail" lines="2">{{
        deployDetails
      }}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-item-label class="txn-value">{{ valueIndicator }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { defineProps, toRefs, onMounted, ref } from "vue";
import { stacksExplorerLinkTx } from "src/common/utils";

const props = defineProps({
  tx: {
    type: Object,
    required: true,
  },
});

const { tx } = toRefs(props);
const { tx_id, fee_rate, tx_status, smart_contract } = toRefs(tx.value);
const icon = "/appicons/txn-contract-deploy.svg";
const header = "Contract Deploy";
const denomination = 1000000;
const deployDetails = ref("");
const valueIndicator = ref("");

onMounted(() => {
  const valueFormat = parseFloat(fee_rate.value / denomination).toFixed(6);
  valueIndicator.value = `-${valueFormat} STX`;
  deployDetails.value = smart_contract.value.contract_id;
});
</script>
