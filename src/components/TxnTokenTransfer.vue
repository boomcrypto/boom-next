<template>
  <q-item
    v-ripple
    clickable
    tag="a"
    :href="`${explorer_url}${txn.tx_id}?chain=${network}`"
    target="_blank"
    rel="noreferrer"
    class="q-px-none" :class="$q.dark.isActive ? 'bg-dark':''"
  >
    <q-item-section side>
      <img
        :src="
          sendReceiveIcon === 'out'
            ? failed
              ? '/images/fail-send-transactions.svg'
              : '/images/send-transactions.svg'
            : '/images/receive-transactions.svg'
        "
        height="16px"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label class="transfer-title" :style="$q.dark.isActive ? {color: 'white !important'} : {}"
        >{{ txnLabel }}<span v-if="failed" class="error">{{ status }}</span
        ><span v-if="!failed">{{ status }}</span>
      </q-item-label>
      <q-item-label class="transfer-address" :style="$q.dark.isActive ? {color: 'white !important'} : {}">
        {{ `${sendReceiveLabel} ${destinationAddressLabel}` }}
      </q-item-label>
      <!-- <q-item-label class="transfer-address">
        {{ memoLabel }}
      </q-item-label> -->
    </q-item-section>
    <q-item-section side class="transfer-amount"  :style="$q.dark.isActive ? {color: 'white !important'} : {}">
      {{ `${txnTransferSign} ${txn.token_transfer.amount / 1000000}` }} STX
    </q-item-section>
  </q-item>
</template>

<script>
import {mapState} from 'vuex';
import * as timeago from 'timeago.js';
import {ellipsedHash} from 'src/helpers/transactions';
import {BOOM_CONFIG} from 'src/boom.config';

export default {
  name: 'TxnTokenTransfer',
  props: {
    txn: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      sendReceiveLabel: '',
      txnLabel: '',
      sent: false,
      received: false,
      sendReceiveIcon: '',
      txnTransferSign: '',
      hover: false,
    };
  },
  computed: {
    ...mapState('wallet', ['account']),
    memoLabel() {
      return Buffer.from(
        this.txn.token_transfer.memo.replace('0x', ''),
        'hex',
      ).toString('utf8');
    },
    destinationAddressLabel() {
      return ellipsedHash(this.txn.token_transfer.recipient_address);
    },
    explorer_url() {
      return BOOM_CONFIG.EXPLORER_URL;
    },
    network() {
      return BOOM_CONFIG.network;
    },
    failed() {
      switch (this.txn.tx_status) {
        case 'success':
          return false;
        case 'pending':
          return false;
        case 'abort_by_response':
          return true;
        default:
          return true;
      }
    },
    status() {
      switch (this.txn.tx_status) {
        case 'success':
          return '';
        case 'pending':
          return ' Pending';
        case 'abort_by_response':
          return ' Failed';
        default:
          return ` ${this.txn.tx_status}`;
      }
    },
  },
  mounted() {
    if (this.txn.sender_address === this.account.address) {
      this.sendReceiveIcon = 'out';
      this.txnLabel = 'Send STX';
      this.sendReceiveLabel = 'to: ';
      this.txnTransferSign = '-';
    } else {
      this.sendReceiveIcon = 'in';
      this.txnLabel = 'Receive STX';
      this.sendReceiveLabel = 'from: ';
      this.txnTransferSign = '+';
    }
    if (!this.txn.block_hash) {
      this.txnLabel += ' pending';
    }
  },
  methods: {
    /**
     *
     */
    transactionDescription() {
      let when = timeago.format(this.txn.burn_block_time * 1000);
      let txnDesc = '' + when;
      if (this.txn.sender_address === this.account.address) {
        txnDesc +=
          'you sent ' +
          this.txn.token_transfer.recipient_address +
          ' ' +
          this.txn.token_transfer.amount +
          ' STX.';
      } else {
        txnDesc += 'you recevied ' + this.txn.token_transfer.amount + ' STX.';
      }
      return this.txn.sender_address;
    },
  },
};
</script>

<style scoped>
/*.transfer-title {*/
/*  font-family: 'IBM Plex Sans';*/
/*  font-style: normal;*/
/*  font-weight: 600;*/
/*  font-size: 14px;*/
/*  line-height: 16px;*/
/*  !* identical to box height, or 114% *!*/
/*  letter-spacing: 0.39px;*/
/*  color: #27261e;*/
/*}*/
/*.transfer-address {*/
/*  font-family: 'IBM Plex Sans';*/
/*  font-style: normal;*/
/*  font-weight: normal;*/
/*  font-size: 12px;*/
/*  line-height: 14px;*/
/*  !* identical to box height, or 117% *!*/
/*  letter-spacing: 0.36px;*/
/*  color: #27261e;*/
/*}*/
/*.transfer-amount {*/
/*  font-family: 'IBM Plex Sans';*/
/*  font-style: normal;*/
/*  font-weight: normal;*/
/*  font-size: 12px;*/
/*  line-height: 14px;*/
/*  !* identical to box height, or 117% *!*/
/*  text-align: right;*/
/*  letter-spacing: 0.36px;*/
/*  color: #27261e;*/
/*}*/
/*.error {*/
/*  color: #f5006a;*/
/*}*/
</style>
