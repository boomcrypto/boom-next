<template>
  <div>
    <q-item-label
      class="txn-list-header q-py-xs"
      :class="$q.dark.isActive ? 'text-white' : ''"
      >{{ displayDay }}</q-item-label
    >
    <q-card flat class="boom-card">
      <div
        v-for="txn in txns"
        :key="`${displayDay}-${txn.tx_id}`"
        class="q-mb-xs"
      >
        <txn-token-transfer
          v-if="txn.tx_type === 'token_transfer'"
          :class="$q.dark.isActive ? 'bg-dark' : ''"
          :txn="txn"
        ></txn-token-transfer>
        <txn-contract-call
          v-if="txn.tx_type === 'contract_call'"
          :txn="txn"
          :class="$q.dark.isActive ? 'bg-dark' : ''"
        ></txn-contract-call>
      </div>
    </q-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import TxnTokenTransfer from './TxnTokenTransfer';
import TxnContractCall from './TxnContractCall';
import {date} from 'quasar';

export default {
  name: 'TransactionItem',
  components: {
    TxnTokenTransfer,
    TxnContractCall,
  },
  props: {
    txns: {
      type: Array,
      default: () => [],
    },
    day: {
      type: String,
      default: '12-31-1899',
    },
  },
  data() {
    return {};
  },
  computed: {
    displayDay() {
      return date.formatDate(this.day, 'MMMM D, YYYY');
    },
  },
  methods: {},
};
</script>

<style scoped>
/*.txn-list-header {*/
/*  font-family: 'IBM Plex Sans';*/
/*  font-style: normal;*/
/*  font-weight: normal;*/
/*  font-size: 12px;*/
/*  line-height: 14px;*/
/*  !* identical to box height, or 117% *!*/
/*  letter-spacing: 0.39px;*/
/*  color: #27261e;*/
/*}*/
</style>
