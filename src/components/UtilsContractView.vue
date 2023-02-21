<template>
  <q-card flat class="boom-bg">
    <q-list bordered>
      <q-item
        clickable
        v-ripple
        v-for="contract in deployedContracts"
        :key="contract.tx_id"
      >
        <q-item-section avatar>
          <q-icon color="primary" name="bluetooth" />
        </q-item-section>
        <q-item-section>contract name goes here</q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useTxnStore } from "@stores/txn";
import { storeToRefs } from "pinia";

const txnStore = useTxnStore();

const { deployedContracts } = storeToRefs(txnStore);
console.log(deployedContracts.value);
</script>
