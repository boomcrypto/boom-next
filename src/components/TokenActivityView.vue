<script setup>
import { ref, toRef, computed } from "vue";
import { storeToRefs } from "pinia";
import { TransactionTypes } from "@common/constants";
import { useTxnStore } from "@stores/transactions";
import TxnContractCall from "./TxnContractCall.vue";
import TxnContractDeploy from "./TxnContractDeploy.vue";
import TxnTokenTransfer from "./TxnTokenTransfer.vue";
import TxnCoinbase from "./TxnCoinbase.vue";
import { useNavStore } from "@stores/nav";
import { supportedTokens } from "@common/constants";

const txnStore = useTxnStore();
const navStore = useNavStore();

const cids = computed(() => {
  const cids = [];
  supportedTokens.forEach((token) => {
    const [contract_id] = token.contractAddress + "." + token.contractName;
    cids.push(contract_id);
  });
  return cids;
});

const currentAccount = () => {
  return navStore.selectedAccount.value;
};

const { items, transactionsByDay } = storeToRefs(txnStore);

const days = computed(() => Object.keys(transactionsByDay.value));
</script>
<template>
  <q-scroll-area style="height: 71vh; overflow-x: hidden" v-if="items.length">
    <div v-for="day in days" :key="day">
      <div class="txn-date">{{ day }}</div>
      <template v-for="tx in transactionsByDay[day]" :key="tx.tx_id">
        <TxnTokenTransfer
          v-if="
            tx.tx_type === TransactionTypes.TOKEN_TRANSFER ||
            (tx.contract_call?.function_name === 'transfer' &&
              cids.includes(tx.contract_call?.contract_id))
          "
          :tx="tx"
        />
        <TxnContractCall
          v-else-if="
            tx.tx_type === TransactionTypes.CONTRACT_CALL &&
            tx.contract_call.function_name !== 'transfer'
          "
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

<style scoped></style>
