<script setup>
import { ref, computed, onMounted } from "vue";
import { useNavStore } from "@stores/nav";
import { useWalletStore } from "@stores/wallet";
import { transferSTX, transferBTC, transferToken } from "@common/transactions";
import { recipientInputToAddress } from "@common/bns";
import Big from "big.js";

// variables
const navStore = useNavStore();
const walletStore = useWalletStore();
const amount = ref(null);
const recipient = ref(null);
const memo = ref(null);
const selectedTokenId = ref(null);

// properties
const currentToken = computed(() => {
  return walletStore.tokens.find(
    (account) => account.id === selectedTokenId.value
  );
});

const tokenOpts = computed(() => {
  return walletStore.tokens.map((token) => {
    return {
      label: token.name,
      value: token.id,
      icon: token.icon,
    };
  });
});

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

const displaySymbol = computed(() => {
  if (currentToken.value) {
    return currentToken.value.symbol;
  } else {
    return "STX";
  }
});

// functions

// determines which transfer function to call
async function handleConfirmAndSend() {
  const token = walletStore.tokens.find(
    (token) => token.id === selectedTokenId.value
  );

  if (token.symbol === "STX") {
    await handleTransferSTX();
  } else if (token.symbol === "BTC") {
    await handleTransferBTC();
  } else {
    await handleTransferToken();
  }
}

// prep STX data & call the transfer function
async function handleTransferSTX() {
  const amtUSTX = amount.value * currentToken.value.denomination;
  const recipientAddr = await recipientInputToAddress(recipient.value);
  if (!recipientAddr) {
    throw new Error("Invalid recipient address");
    $q.notify({
      message: "Invalid recipient address",
      color: "warning",
      avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
      actions: [
        { label: "Dismiss", color: "dark", handler: () => handleClear },
      ],
    });
  } else {
    const tx = await transferSTX({
      recipient: recipientAddr.data,
      amount: amtUSTX,
      memo: memo.value,
    });
  }
}

// prep BTC data & call the transfer function
async function handleTransferBTC() {
  const amtUSTX = amount.value * currentToken.value.denomination;
  const tx = await transferBTC({
    recipient: recipient.value,
    amount: amount.value,
    memo: memo.value,
  });
}

// prep Token data & call the transfer function
async function handleTransferToken() {
  const amtUSTX = amount.value * currentToken.value.denomination;
  const tx = await transferToken({
    recipient: recipient.value,
    amount: amount.value,
    memo: memo.value,
    token: selectedTokenId.value,
  });
}

function setMaxAmount() {
  amount.value = availableBalance.value;
}

function handleClear() {
  amount.value = "";
  recipient.value = "";
  memo.value = "";
}

// lifecycle hooks

onMounted(() => {
  selectedTokenId.value = walletStore.tokens[0].id;
});

// validations
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
</script>
<template>
  <q-card flat class="boom-bg">
    <q-card-section>
      <q-select
        v-model="selectedTokenId"
        :options="tokenOpts"
        dense
        outlined
        emit-value
        option-label="label"
        option-value="value"
        dropdown-icon="img:/appicons/chevron-down.png"
      >
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
            class="text-dark q-py-none"
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
          <q-item class="q-py-none">
            <q-item-section avatar>
              <q-icon :name="`img:${currentToken.icon}`" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ currentToken.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-input
        v-model="amount"
        rounded
        outlined
        dense
        class="rounded_input full-width q-my-md"
        placeholder="Amount"
        :rules="[
          (val) => isValidAmount(val) || 'Not a valid amount',
          (val) =>
            isLessThanMax(val) || 'Amount must be less than your balance',
        ]"
        lazy-rules
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
              <span class="strong"
                >{{ availableBalance }} {{ displaySymbol }}</span
              >
            </div>
          </div>
        </template>
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
        :rules="[
          (val) => val.length <= 34 || 'Memo must be 34 characters or less',
        ]"
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
  </q-card>
</template>
