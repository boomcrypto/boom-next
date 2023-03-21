<script setup>
import { ref, computed, onMounted } from "vue";
import BoomButton from "../BoomButton.vue";
import { useWalletStore } from "@stores/wallet";

const walletStore = useWalletStore();

const cycles = ref(1);
const payout = ref("xbtc");
const amount = ref(null);
const accept = ref(false);
const loading = ref(false);
const selectedTokenId = ref(null);

const currentToken = computed(() => {
  return walletStore.tokens.find(
    (account) => account.id === selectedTokenId.value
  );
});

function fnMarkerLabel(val) {
  switch (val) {
    case 2:
      return "3";
    case 3:
      return "6";
    case 4:
      return "12";
    default:
      return "1";
  }
}

// const calculatedDelegationAddress = computed(() => {
//   return fpDelegationAddress.value[cycles].address;
// });
const calculatedDelegationAddress = computed(() => {
  return "SP1K1A1PMGW2ZJCNF46NWZWHG8TS1D23EGH1KNK60";
});

/**
 *
 * @param {*} value
 *
 * @returns {boolean}
 *
 * returns true if value is a number
 * less than 1000000000 with 6 decimal places
 * and greater than 0
 *
 */
const isValidAmount = (value) => {
  if (value > 0) {
    const regex = /^([0-9]{1,9})\.?([0-9]{0,6})$/;
    return regex.test(value);
  } else {
    return true;
  }
};

/**
 *
 * @param {*} value
 * @returns {boolean}
 *
 * returns true if amount is less
 * than the account balance
 *
 */
const isLessThanMax = (value) => {
  if (value.length > 0) {
    const valueUSTX =
      new Big(parseInt(value)) * currentToken.value.denomination;

    return (
      new Big(parseInt(value)) * currentToken.value.denomination <=
      currentToken.value.balance - currentToken.value.locked
    );
  } else {
    return true;
  }
};

const availableBalance = computed(() => {
  if (currentToken.value) {
    return (
      (currentToken.value.balance - currentToken.value.locked) /
      currentToken.value.denomination
    );
  } else {
    return 0;
  }
});

function setMaxAmount() {
  amount.value = availableBalance.value;
}

function handleClear() {
  amount.value = "";
  cycles.value = "";
  accept.value = false;
}

onMounted(() => {
  selectedTokenId.value = walletStore.tokens[0].id;
});
</script>

<template>
  <q-card flat class="boom-bg">
    <q-item class="q-px-none">
      <q-item-section avatar>
        <div class="row no-wrap">
          <q-icon
            round
            size="lg"
            text-color="black"
            style="border: 1px solid #ccc; border-radius: 50%; padding: 8px"
          >
            <img src="/tokens/frie.jpg" />
          </q-icon>
        </div>
      </q-item-section>
      <q-item-section class="q-px-none">
        <q-item-label class="text-h6 text-bold"> Freidger Pool</q-item-label>
        <q-item-label class="text-grey-9 row">
          <div class="col-3">
            <q-icon name="img:/appicons/lock-black.svg" />
            STX
          </div>
          <div class="col">
            <q-icon name="img:/appicons/receive-purple.svg" />
            STX, xBTC
          </div>
          <div class="col">
            <q-icon name="img:/appicons/time-purple.svg" />
            1,3,6,12
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>
    <div class="text-bold">Number of Cycles:</div>
    <q-card-section class="q-pb-none">
      <q-slider
        v-model="cycles"
        :min="1"
        :max="4"
        :step="1"
        color="accent"
        markers
        :marker-labels="fnMarkerLabel"
      />
      <div class="text-caption">
        Delegation address: {{ calculatedDelegationAddress }}
      </div>
    </q-card-section>
    <q-card-section>
      <q-input
        id="Amount"
        v-model="amount"
        rounded
        outlined
        class="rounded_input"
        dense
        maxlength="17"
        placeholder="Amount"
        no-error-icon
        bottom-slots
        :error="!isLessThanMax || !isValidAmount"
        error-message="Invalid amount"
      >
        <template #prepend> </template>
        <template #append>
          <q-chip
            v-if="!amount"
            color="primary"
            text-color="accent"
            dense
            square
            clickable
            label="Max"
            class="bg-primary"
            @click="setMaxAmount"
          />
          <q-btn
            v-else
            unelevated
            size="sm"
            round
            icon="img:/appicons/clear-x.svg"
            class="bg-primary"
            @click.stop="handleClear"
          />
        </template>
        <template #hint>
          <div class="row justify-between">
            <div>
              Available balance:
              <span class="strong">{{ availableBalance }} STX</span>
            </div>
          </div>
        </template>
      </q-input>
      <p>
        New delegations are closed 200 blocks prior to the next reward cycle.
        Payouts are 100 blocks after the end of the reward cycle.
      </p>
      <p>
        Once the contract call is approved by you, you cannot unlock or change
        your commitment before the start of the cycle.
      </p>

      <q-toggle
        v-model="accept"
        color="accent"
        label="I understand how Stacking delegation works and want to proceed"
      />
    </q-card-section>
    <div class="row justify-between q-mb-md">
      <q-btn
        outline
        color="accent"
        class="q-px-lg"
        rounded
        label="Clear"
        no-caps
        @click="handleClear"
      />
      <BoomButton
        :disabled="!accept"
        :loading="loading"
        :rounded="true"
        title="Delegate to Friedger Pool"
        @click="handleStack"
      />
    </div>
  </q-card>
</template>
