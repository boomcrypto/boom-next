<template>
  <q-scroll-area style="height: 71vh; overflow-x: hidden" v-if="items.length">
    <div v-for="day in days" :key="day">
      <div class="text-bold text-headline q-mb-md">{{ day }}</div>
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
      <!-- <q-item
        class="boom-card q-my-sm"
      >
        <q-item-section side>
          <q-avatar icon="img:/appicons/send-purple.svg"> </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-bold">Send</q-item-label>
          <q-item-label class="text-body1 ellipsis transaction_max_width"
            >{{ tx.tx_id }}
          </q-item-label>
        </q-item-section>
        <q-item-section top class="col-1">
          <q-item-label class="q-mt-sm text-weight-bold">Amount</q-item-label>
          <q-item-label class="q-mt-sm">Amount</q-item-label>
        </q-item-section>
        <q-item-section top class="col-1 q-pl-sm">
          <q-item-label class="q-mt-sm text-weight-bold">Fee</q-item-label>
          <q-item-label class="q-mt-sm">{{ tx.fee_rate }}</q-item-label>
        </q-item-section>
      </q-item> -->
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
