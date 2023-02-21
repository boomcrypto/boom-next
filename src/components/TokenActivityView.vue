<template>
  <q-scroll-area style="height: 71vh; overflow-x: hidden" v-if="items.length">
    <div v-for="day in days" :key="day">
      <div class="txn-date">{{ day }}</div>
      <template v-for="tx in transactionsByDay[day]" :key="tx.tx_id">
        <TxnTokenTransfer
          v-if="tx.tx_type === TransactionTypes.TOKEN_TRANSFER"
          :tx="tx"
        />
        <TxnContractCall
          v-else-if="tx.tx_type === TransactionTypes.CONTRACT_CALL"
          :tx="tx"
        />
        <TxnContractDeploy
          v-else-if="tx.tx_type === TransactionTypes.SMART_CONTRACT"
          :tx="tx"
        />
        <TxnCoinbase
          v-else-if="tx.tx_type === TransactionTypes.COINBASE"
          :tx="tx"
        />
      </template>
    </div>
  </q-scroll-area>
  <div class="row justify-center items-center" v-else>
    <div>
      <q-img
        src="/appicons/transaction-empty-state.svg"
        :ratio="16 / 9"
        spinner-color="primary"
        spinner-size="82px"
        size="200px"
        contain
      />
      <div>
        No transactions yet! Get started by:
        <ul>
          <li>Buy some Stacks, then ...</li>
          <li>Mint your first 1 of 1 collectible</li>
          <li>Get a Boombox</li>
          <li>Start Stacking</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { TransactionTypes } from "@common/constants";
import { useTxnStore } from "@stores/transactions";
import TxnContractCall from "./TxnContractCall.vue";
import TxnContractDeploy from "./TxnContractDeploy.vue";
import TxnTokenTransfer from "./TxnTokenTransfer.vue";
import TxnCoinbase from "./TxnCoinbase.vue";

const txnStore = useTxnStore();

const { items, transactionsByDay } = storeToRefs(txnStore);

const days = computed(() => Object.keys(transactionsByDay.value));
</script>

<style scoped></style>
