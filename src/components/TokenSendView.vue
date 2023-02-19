<script setup>
import { ref, computed } from "vue";
import { useNavStore } from "../stores/nav";
// import { tokens } from "common/constants";
// import {
//   recipientInputToAddress,
//   validAddress,
//   validAddressOrName,
// } from "src/utils/bns";

const navStore = useNavStore();
const amount = ref(null);
const recipient = ref(null);
const memo = ref(null);
const invoice = ref(null);

const selectedAccount = navStore.selectedAccount;

// // const account = computed(() => {
// //   return tokens.find((t) => t.symbol === navStore.selectedAccount);
// // });
// const account = ref({
//   symbol: "STX",
//   balance: 200000000,
//   locked: 100000000,
//   denomination: 1000000,
//   name: "Stacks",
//   value: "25.00",
//   icon: "img:/tokens/Stacks_logo_full.webp",
// });

// const amountIsNull = computed(() => {
//   return amount.value === null;
// });

// const validAmount = computed(() => {
//   return (
//     amount.value > 0 &&
//     amount.value <= account.value.balance / account.value.denomination
//   );
// });

// const availableBalance = computed(() => {
//   return (
//     (account.value.balance - account.value.locked) / account.value.denomination
//   );
// });

// function handleCancel() {
//   amount.value = 0;
//   recipient.value = "";
//   memo.value = "";
// }

// function handleConfirmSend() {
//   console.log("handleConfirmSend");
// }

// function handleTransferMaxAmount() {
//   amount.value = availableBalance.value;
// }

// function handleResetRecipient() {
//   recipient.value = "";
// }

// function handleScan() {
//   console.log("handleScan");
// }
</script>
<template>
  <q-card
    flat
    class="boom-bg justify-center items-center"
    v-if="selectedAccount === 'SATS'"
  >
    <q-form class="q-gutter-md">
      <q-input
        v-model="invoice"
        rounded
        outlined
        dense
        class="rounded_input"
        type="text"
        label="Invoice"
      >
        <template #append>
          <q-chip
            v-if="!invoice"
            color="primary"
            text-color="accent"
            dense
            square
            clickable
            icon="img:/appicons/scan.svg"
            label="Scan"
            class="bg-primary"
            @click="handleScanLnInvoice"
          />
          <q-btn
            v-else
            unelevated
            round
            icon="img:/appicons/clear-x-gray.svg"
            @click.stop="amount = null"
          />
        </template>
      </q-input>
      <q-input
        v-model="memo"
        rounded
        outlined
        dense
        class="rounded_input"
        type="text"
        placeholder="Memo, optional"
      >
      </q-input>

      <div>chargeId:</div>
      <div>expires in:</div>
      <div>fee:</div>
    </q-form>
    <q-card-actions class="row q-mt-lg" align="between">
      <q-btn outline color="accent" rounded label="Cancel" no-caps />
      <q-btn
        rounded
        unelevated
        class="boom-button boom-button-text"
        label="Pay Now"
        no-caps
        :disabled="!amount"
      />
    </q-card-actions>
  </q-card>
  <q-card flat class="boom-bg" v-else>
    <q-card-section>
      <div class="row items-center q-col-gutter-lg">
        <q-input
          v-model="amount"
          rounded
          outlined
          dense
          class="rounded_input full-width"
          type="number"
          placeholder="Amount"
        >
        </q-input>
        <q-input
          v-model="recipient"
          rounded
          outlined
          class="rounded_input full-width"
          dense
          type="text"
          placeholder="Recipient"
        >
        </q-input>
        <q-input
          v-model="memo"
          rounded
          outlined
          dense
          class="rounded_input full-width"
          type="text"
          placeholder="Memo - Optional, but required by most exchanges"
        >
        </q-input>
      </div>
    </q-card-section>
    <q-card-actions class="row q-mt-lg" align="between">
      <q-btn outline color="accent" rounded label="Cancel" no-caps />
      <q-btn
        rounded
        unelevated
        class="boom-button boom-button-text"
        label="Confirm and Send"
        no-caps
      />
    </q-card-actions>
  </q-card>
</template>

<!-- <template>
  <div style="height: 69vh">
    <q-card flat>
      <q-card-section>
        <div class="text-h6">Send {{ selectedAccount }}</div>
      </q-card-section>
      <q-card-section>
        <q-form>
          <q-input
            id="Amount"
            v-model="amount"
            rounded
            outlined
            dense
            type="number"
            maxlength="17"
            placeholder="Amount"
            no-error-icon
            bottom-slots
            :error="!amountIsNull && !validAmount"
            error-message="Invalid amount"
          >
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
                @click="handleTransferMaxAmount"
              />
              <q-btn
                v-else
                unelevated
                round
                icon="img:/appicons/clear-x-gray.svg"
                @click.stop="amount = null"
              />
            </template>
            <template #hint>
              <div class="row justify-between">
                <div>
                  Available balance:
                  <span class="strong"
                    >{{ availableBalance }} {{ account.symbol }}</span
                  >
                </div>
              </div>
            </template>
          </q-input>

          <q-input
            v-model="recipient"
            dense
            type="text"
            placeholder="Recipient"
            no-error-icon
            class="q-mt-lg"
            bottom-slots
            :error="!validStacksAddressOrName"
            error-message="Invalid recipient"
            spellcheck="false"
          >
            <template #append>
              <q-btn
                v-if="recipient"
                unelevated
                round
                :icon="recipient ? 'img:/appicons/clear-x-gray.svg' : ''"
                :disable="!recipient"
                @click.stop="handleResetRecipient"
              />
              <q-btn
                v-else
                unelevated
                round
                icon="img:/images/qr-icon.svg"
                @click.stop="handleScanRecipient"
              />
            </template>
            <template #hint>
              <div class="wallet-send-label">
                STX Address or name:
                <span class="strong">SP... or name.btc</span>
              </div>
            </template>
          </q-input>

          <q-input
            id="Memo"
            v-model="memo"
            dense
            type="text"
            maxlength="17"
            placeholder="Memo (Optional)"
            no-error-icon
            class="q-mt-lg"
            bottom-slots
          >
            <template #append>
              <q-btn
                v-if="memo"
                unelevated
                round
                :icon="recipient ? 'img:/images/clear-x-gray.svg' : ''"
                :disable="!recipient"
                @click.stop="handleResetRecipient"
              />
              <q-btn
                v-else
                unelevated
                round
                icon="img:/images/qr-icon.svg"
                @click.stop="handleScanMemo"
              />
            </template>
            <template #hint>
              <div class="wallet-send-label">
                Must be provided when sending tokens to some exchanges.
              </div>
            </template>
          </q-input>
        </q-form>
      </q-card-section>

      <q-card-actions align="between">
        <q-btn flat color="accent" label="Cancel" @click="handleCancel" />

        <q-btn
          unelevated
          no-caps
          color="accent"
          :disable="amountIsNull || !validAmount"
          class="q-pa-sm webby-card-button"
          @click="handleConfirmSend"
        >
          <template #default>
            <div class="webby-button-text">Confirm and Send</div>
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template> -->
