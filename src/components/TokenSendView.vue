<script setup>
import { ref, computed } from "vue";
import { useNavStore } from "../stores/nav";
import { stacksTransfer } from "@common/transactions";
import Big from "big.js";

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

const currentAccount = navStore.getActiveAccount;
console.log("currentAccount", currentAccount);

async function handleConfirmAndSend() {
  const tx = await stacksTransfer({
    recipient: recipient.value,
    amount: amount.value,
    memo: memo.value,
  });
  console.log(tx);
}

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
  const regex = /^([0-9]{1,9})\.?([0-9]{0,6})$/;
  return regex.test(value);
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
  const valueUSTX = new Big(parseInt(value)) * currentAccount.denomination;
  console.log("valueUSTX", valueUSTX);
  return (
    new Big(parseInt(value)) * currentAccount.denomination <=
    currentAccount.value.balance - currentAccount.value.locked
  );
};

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
  <q-card flat class="boom-bg">
    <q-card-section>
      <div class="row items-center">
        <q-form class="q-gutter-md full-width">
          <q-input
            v-model="amount"
            rounded
            outlined
            dense
            class="rounded_input full-width"
            placeholder="Amount"
            :rules="[
              (val) => isValidAmount(val) || 'Not a valid amount',
              (val) => isLessThanMax(val) || 'Amount must be greater than 0',
            ]"
            lazy-rules
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
          <q-btn
            outline
            color="accent"
            rounded
            label="Clear"
            type="reset"
            no-caps
          />
          <q-btn
            rounded
            unelevated
            class="boom-button boom-button-text"
            label="Confirm and Send"
            no-caps
            @click="handleConfirmAndSend"
          />
        </q-form>
      </div>
    </q-card-section>
    <!-- <q-card-actions class="row q-mt-lg" align="between">
    </q-card-actions> -->
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
