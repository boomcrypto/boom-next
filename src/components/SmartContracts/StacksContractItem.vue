<template>
  <q-item
    clickable
    v-ripple
    class="q-mb-sm"
    :class="tx_status === 'success' ? 'boom-card' : 'fail-card'"
    style="height: 60px"
  >
    <q-item-section avatar>
      <q-icon
        name="img:/appicons/txn-contract-deploy.svg"
        v-if="tx_status === 'success'"
      />
      <q-icon name="img:/appicons/txn-contract-deploy-fail.svg" v-else />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-h6">{{ contractName }} </q-item-label>
      <q-item-label>
        <q-chip class="" :label="`Deployed: ${deployDate}`" />
        <q-chip :label="`Block: ${contract.block_height}`" />
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-icon flat round dense name="img:/appicons/chevron-right.svg" />
    </q-item-section>
  </q-item>
</template>

<script setup>
import { toRefs, computed } from "vue";
import { stacksExplorerLinkTx } from "src/common/utils";

const props = defineProps({
  contract: {
    type: Object,
    required: true,
  },
});
const { contract } = toRefs(props);

const { smart_contract, tx_id, tx_status } = contract.value;

const [contractAddress, contractName] = smart_contract.contract_id.split(".");
const code = smart_contract.source_code;

const deployDate = computed(() =>
  new Date(contract.value.burn_block_time * 1000).toLocaleDateString()
);
</script>
