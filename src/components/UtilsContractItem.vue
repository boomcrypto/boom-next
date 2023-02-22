<template>
  <q-item clickable v-ripple>
    <q-item-section avatar>
      <q-icon
        name="img:/appicons/txn-contract-deploy.svg"
        v-if="tx_status === 'success'"
      />
      <q-icon name="img:/appicons/txn-contract-deploy-fail.svg" v-else />
    </q-item-section>
    <q-item-section>{{ contractName }}</q-item-section>
    <q-item-section
      ><q-chip class="" :label="`Deployed: ${deployDate}`" />
    </q-item-section>
    <q-item-section
      ><q-chip :label="`Block: ${contract.block_height}`" />
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
