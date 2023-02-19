<template>
  <q-scroll-area style="height: 71vh">
    <div v-for="(day, index) in days" :key="index">
      <div class="text-bold text-caption q-my-md text-grey-6">{{ day }}</div>
      <q-item
        v-for="tx in items[day]"
        :key="tx.tx_id"
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
      </q-item>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { TransactionTypes } from "@common/constants";
import { useTxnStore } from "@stores/transactions";

const txnStore = useTxnStore();

const { items } = storeToRefs(txnStore);

const days = ref(Object.keys(items.value));
</script>
