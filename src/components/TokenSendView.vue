<script setup>
import { ref, computed, onMounted } from "vue";
import { useNavStore } from "@stores/nav";
import { useWalletStore } from "@stores/wallet";
import { transferSTX, transferBTC, transferToken } from "@common/transactions";
import Big from "big.js";

// import { tokens } from "common/constants";
// import {
//   recipientInputToAddress,
//   validAddress,
//   validAddressOrName,
// } from "src/utils/bns";

const navStore = useNavStore();
const walletStore = useWalletStore();

const amount = ref(null);
const recipient = ref(null);
const memo = ref(null);
const invoice = ref(null);

const selectedToken = ref(null);

async function handleConfirmAndSend() {
  const token = walletStore.tokens.find(
    (token) => token.id === selectedToken.value
  );

  if (token.symbol === "STX") {
    await handleTransferSTX();
  } else if (token.symbol === "BTC") {
    await handleTransferBTC();
  } else {
    await handleTransferToken();
  }
}

onMounted(() => {
  console.log("walletStore", walletStore);
  console.log("walletStore.tokens", walletStore.tokens);
  console.log("walletStore.tokens[0]", walletStore.tokens[0]);
  console.log("walletStore.tokens[0].id", walletStore.tokens[0].id);
  selectedToken.value = walletStore.tokens[0].id;
});

async function handleTransferSTX() {
  const amtUSTX = amount.value * currentAccount.value.denomination;
  const tx = await stacksTransfer({
    recipient: recipient.value,
    amount: amount.value,
    memo: memo.value,
  });
}

async function handleTransferBTC() {
  const amtUSTX = amount.value * currentAccount.value.denomination;
  const tx = await bitcoinTransfer({
    recipient: recipient.value,
    amount: amount.value,
    memo: memo.value,
  });
}

async function handleTransferToken() {
  const amtUSTX = amount.value * currentAccount.value.denomination;
  const tx = await tokenTransfer({
    recipient: recipient.value,
    amount: amount.value,
    memo: memo.value,
    token: selectedToken.value,
  });
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
  console.log("currentAccount", currentAccount.value);
  console.log("valueUSTX", valueUSTX);
  console.log("currentAccount.value.balance", currentAccount.value.balance);
  console.log("currentAccount.value.locked", currentAccount.value.locked);

  return (
    new Big(parseInt(value)) * currentAccount.value.denomination <=
    currentAccount.value.balance - currentAccount.value.locked
  );
};

const tokenOpts = computed(() => {
  return walletStore.tokens.map((token) => {
    return {
      label: token.name,
      value: token.id,
      icon: token.icon,
    };
  });
});

function handleClear() {
  amount.value = null;
  recipient.value = null;
  memo.value = null;
}

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
      <q-select
        v-model="selectedToken"
        :options="tokenOpts"
        dense
        outlined
        emit-value
        option-label="label"
        option-value="value"
        class="full-width"
        dropdown-icon="img:/appicons/chevron-down.png"
      >
        <template #no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
            class="q-pa-none text-dark"
          >
            <q-item-section avatar>
              <q-icon :name="`img:${scope.opt.icon}`" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <template #selected-item>
          <q-item>
            <q-item-section avatar>
              <q-icon :name="`img:${selectedToken.icon}`" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ selectedToken.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-card-section>

    <q-card-section>
      <q-input
        v-model="amount"
        rounded
        outlined
        dense
        class="rounded_input full-width q-mb-md"
        placeholder="Amount"
        :rules="[
          (val) => isValidAmount(val) || 'Not a valid amount',
          (val) =>
            isLessThanMax(val) || 'Amount must be less than your balance',
        ]"
        lazy-rules
      >
      </q-input>
      <q-input
        v-model="recipient"
        rounded
        outlined
        class="rounded_input full-width q-mb-md"
        dense
        type="text"
        placeholder="Recipient"
        hint="Enter a BNS name, address, or scan a QR code"
      >
      </q-input>
      <q-input
        v-model="memo"
        rounded
        outlined
        dense
        class="rounded_input full-width q-mb-lg"
        type="text"
        placeholder="Memo - Optional, but required by most exchanges"
      >
      </q-input>
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
        <q-btn
          rounded
          unelevated
          class="boom-button boom-button-text"
          label="Confirm and Send"
          no-caps
          @click="handleConfirmAndSend"
        />
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
