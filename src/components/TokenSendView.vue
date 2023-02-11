<script setup>
import { ref, computed } from "vue";
// import { useNavStore } from "../stores/nav";
// import { tokens } from "../constants/tokens";
// import {
//   recipientInputToAddress,
//   validAddress,
//   validAddressOrName,
// } from "src/utils/bns";

// const navStore = useNavStore();
const amount = ref(null);
const recipient = ref(null);
const memo = ref(null);

// const selectedAccount = navStore.selectedAccount;

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
  <div style="height: 69vh">
    <q-card flat>
      <q-card-section class="text-center">
        <div class="text-h6">Send STX</div>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="amount"
          rounded
          outlined
          dense
          type="number"
          placeholder="Amount"
        >
          <template #before> Amount: </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="recipient"
          rounded
          outlined
          dense
          type="text"
          placeholder="Recipient"
        >
          <template #before> Recipient: </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="memo"
          rounded
          outlined
          dense
          type="text"
          placeholder="Required by most exchanges"
        >
          <template #before> Memo: </template>
        </q-input>
      </q-card-section>
      <q-card-actions class="row q-mt-lg">
        <div class="col-6">
          <q-btn outline color="accent" label="Cancel" no-caps />
        </div>
        <q-btn
          class="col-sm-6 col-xs-12"
          rounded
          unelevated
          color="accent"
          label="Confirm and Send"
          no-caps
        />
      </q-card-actions>
    </q-card>
  </div>
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
