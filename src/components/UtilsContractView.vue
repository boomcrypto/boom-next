<template>
  <q-card flat class="boom-bg">
    <q-list bordered>
      <q-item
        clickable
        v-ripple
        v-for="contract in deployedContracts"
        :key="contract.tx_id"
        tag="a"
        :href="stacksExplorerLinkTx(contract.tx_id)"
        rel="noreferrer"
        target="_blank"
      >
        <q-item-section avatar>
          <q-icon
            name="img:/appicons/txn-contract-deploy.svg"
            v-if="contract.tx_status === 'success'"
          />
          <q-icon name="img:/appicons/txn-contract-deploy-fail.svg" v-else />
        </q-item-section>
        <q-item-section>{{
          contract.smart_contract.contract_id
        }}</q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useTxnStore } from "@stores/transactions";
import { storeToRefs } from "pinia";
import { stacksExplorerLinkTx } from "src/common/utils";

const txnStore = useTxnStore();

const { items, deployedContracts } = storeToRefs(txnStore);

console.log("items: ", items);
console.log("deployedContracts: ", deployedContracts);
</script>
