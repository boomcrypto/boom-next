<script setup>
import { ref, computed } from "vue";
import BoomButton from "./BoomButton.vue";

const cycles = ref(1);
const payout = ref("xbtc");
const amount = ref(null);
const accept = ref(false);
const loading = ref(false);

// const fpDelegationAddress = ref({
//   1: { length: 1, address: "SP1K1A1PMGW2ZJCNF46NWZWHG8TS1D23EGH1KNK60" },
//   2: { length: 3, address: "SP3K3ZEQVE1E914TFPFMT3A7M53MNMWZCFVQCQB0H" },
//   3: { length: 6, address: "SP6K6QNYFYF57K814W4SHNGG23XNYYE1B8NV0G1Y" },
//   4: { length: 12, address: "SP700C57YJFD5RGHK0GN46478WBAM2KG3A4MN2QJ" },
// });

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
</script>

<template>
  <q-card flat class="">
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
            <q-icon name="img:/appicons/receive-black.svg" />
            STX, xBTC
          </div>
          <div class="col">
            <q-icon name="img:/appicons/time-black.svg" />
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
        outlined class="rounded_input"
        dense
        type="number"
        maxlength="17"
        placeholder="Amount"
        no-error-icon
        bottom-slots
        :error="!amountIsNull && !validAmount"
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
            round
            icon="img:/images/clear-x-gray.svg"
            @click.stop="amount = null"
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
    <q-card-actions align="between">
      <q-btn outline color="accent" class="q-ml-sm" rounded label="Cancel" no-caps @click="handleClose"/>
      <BoomButton
        :disabled="!accept"
        :loading="loading" :rounded="true"
        title="Delegate to Friedger Pool"
        @click="handleStack"
      />
    </q-card-actions>
  </q-card>
</template>
