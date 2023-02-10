<template>
  <q-item
    v-ripple
    clickable
    tag="a"
    :href="link"
    target="_blank"
    rel="noreferrer"
    class="q-px-none"
  >
    <q-item-section side>
      <q-spinner-puff v-if="showPending" color="accent" size="16px" />
      <img v-else :src="contractIcon" height="16px" />
    </q-item-section>
    <q-item-section>
      <q-item-label
        class="wallet-transaction-description-1"
        :style="$q.dark.isActive ? {color: 'white !important'} : {}"
      >
        {{ labels.top
        }}<span v-if="failed" class="error">{{ statusLabel }}</span
        ><span v-if="!failed">{{ statusLabel }}</span></q-item-label
      >
      <q-item-label
        class="wallet-transaction-description-2"
        :style="$q.dark.isActive ? {color: 'white !important'} : {}"
      >
        {{ txId }}
      </q-item-label>
    </q-item-section>
    <q-item-section side :class="$q.dark.isActive ? 'text-white' : ''">
      {{ labels.side }}
    </q-item-section>
  </q-item>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {BOOM_CONFIG} from 'src/boom.config';
import {ellipsedHash, mintSeriesFuncArguments} from 'src/helpers/transactions';
import {getTxnType, TxnType} from 'src/models/txn_types';
import {isOldBoomAssetClass, isNewBoomAssetClass} from 'src/helpers/assets';
import {cvToJSON, hexToCV, uintCV} from '@stacks/transactions';

export default {
  name: 'TxnContractCall',
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
      labels: {
        top: '',
        side: '',
      },
      contractIcon: '/images/function.svg',
      statusLabel: '',
      showPending: false,
      failed: false,
      txnType: {},
    };
  },
  computed: {
    ...mapState('wallet', ['account']),
    ...mapGetters('wallet', ['sip10contracts']),

    link() {
      if (this.txnType === TxnType.payout) {
        return `https://sendstx.com/txid/${this.txn.tx_id}`;
      } else {
        return `${BOOM_CONFIG.EXPLORER_URL}${this.txn.tx_id}?chain=${BOOM_CONFIG.network}`;
      }
    },

    txId() {
      return ellipsedHash(this.txn.tx_id);
    },
  },
  mounted() {
    this.txnType = getTxnType(this.txn.contract_call.function_name);
    const cname = this.txn.contract_call.contract_id.split('.')[1];

    switch (this.txnType) {
      case TxnType.mint:
        if (
          isOldBoomAssetClass(this.txn.contract_call.contract_id) ||
          isNewBoomAssetClass(this.txn.contract_call.contract_id)
        ) {
          const {contractId, contractName, name, uris} =
            mintSeriesFuncArguments(this.txn);
          if (uris.length > 1) {
            this.labels = {top: `Created NFTs`, side: uris.length};
          } else {
            this.labels = {top: `Created NFT`, side: 1};
          }
        } else {
          this.labels = {top: `Created NFT(s)`, side: ''};
        }
        if (this.txn.tx_status !== 'success') {
          this.contractIcon = '/images/fail-nft-create.svg';
        } else {
          this.contractIcon = '/images/nft-create.svg';
        }
        break;
      case TxnType.transfer:
        const recipient = this.txn.contract_call.function_args.find(
          (arg) => arg.name === 'recipient',
        );
        if (this.sip10contracts.includes(this.txn.contract_call.contract_id)) {
          const amtArg = this.txn.contract_call.function_args.find(
            (arg) => arg.name === 'amount',
          );
          const [txnContractAddress, txnContractName] =
            this.txn.contract_call.contract_id.split('.');
          const currentToken = BOOM_CONFIG.tokenList.find(
            (token) =>
              token.contractAddress === txnContractAddress &&
              token.contractName === txnContractName,
          );
          const amount =
            parseInt(hexToCV(amtArg.hex).value) / currentToken.denomination;

          let amountString = '';
          // sip-010 token transfer
          if (recipient.repr === this.account.address) {
            // this is a transfer to me
            amountString = `+ ${amount}`;
            this.labels = {
              top: `Received ${currentToken.name}`,
              side: amountString,
            };
            this.contractIcon = '/images/receive-transactions.svg';
          } else {
            // this is a transfer to someone else
            amountString = `- ${amount}`;
            this.labels = {
              top: `Sent ${currentToken.name}`,
              side: amountString,
            };
            this.contractIcon = '/images/send-transactions.svg';
          }
        } else {
          // nft or other transfer
          if (recipient.repr === this.account.address) {
            // this is a transfer to me
            this.labels = {top: 'Received NFT', side: ''};
            this.contractIcon = '/images/receive-transactions.svg';
          } else {
            // this is a transfer to someone else
            this.labels = {top: 'Sent NFT', side: ''};
            this.contractIcon = '/images/send-transactions.svg';
          }
        }
        break;
      case TxnType.payout:
        this.contractIcon = '/images/function.svg';
        this.labels = {top: 'Boombox Payout', side: ''};
        break;
      default:
        this.labels = {
          top: `Contract call ${this.txn.contract_call.function_name}`,
          side: '',
        };
        if (this.txn.tx_status !== 'success') {
          this.contractIcon = '/images/fail-function.svg';
        } else {
          this.contractIcon = '/images/function.svg';
        }
    }
    switch (this.txn.tx_status) {
      case 'pending':
        this.showPending = true;
        this.statusLabel = ' Pending';
        break;
      case 'abort_by_response':
      case 'failed':
        this.statusLabel = ' Failed';
        this.failed = true;
        break;
      default:
    }
  },
  methods: {},
};
</script>

<style scoped>
.wallet-transaction-description-1 {
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  /* identical to box height, or 114% */
  letter-spacing: 0.39px;
  color: #27261e;
}
.wallet-transaction-description-2 {
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 117% */
  letter-spacing: 0.36px;
  color: #27261e;
}
/*.error {*/
/*  color: #f5006a;*/
/*}*/
</style>
