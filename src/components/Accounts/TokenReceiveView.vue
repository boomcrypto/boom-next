<script setup>
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
import { useUserStore } from "@stores/user";
import { useWalletStore } from "@stores/wallet";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import { copyToClipboard } from "quasar";

const $q = useQuasar();
const userStore = useUserStore();
const walletStore = useWalletStore();

const currentToken = computed(() => {
  return walletStore.tokens.find(
    (account) => account.id === selectedTokenId.value
  );
});

const stacksQROptions = {
  color: { dark: "#A748CB", light: "#ffffff" },
  errorCorrectionLevel: "Q",
  width: 300,
};

const bitcoinQROptions = {
  color: { dark: "#FA8D22", light: "#ffffff" },
  errorCorrectionLevel: "Q",
  width: 300,
};

const ordinalQROptions = {
  color: { dark: "#c90b69", light: "#ffffff" },
  errorCorrectionLevel: "Q",
  width: 300,
};

const qrOptions = ref(stacksQROptions);

const selectedTokenId = ref(null);
const address = ref("stacks");
const stacksWarningMsg = ref(
  "Only send Stacks or SIP-10 compatible tokens to this address. Always verify addresses. Not responsible for any loss of assets."
);
const bitcoinWarningMsg = ref(
  "Only send Bitcoin to this address. Always verify addresses. Not responsible for any loss of assets."
);
const ordinalWarningMsg = ref(
  "Only send Bitcoin Ordinals to this address. Always verify addresses. Not responsible for any loss of assets."
);

const warningMsg = ref(stacksWarningMsg);

function updateQR(val) {
  if (val === "bitcoin") {
    address.value = userStore.cardinalAddress;
    qrOptions.value = bitcoinQROptions;
    warningMsg.value = bitcoinWarningMsg;
  } else if (val === "ordinal") {
    address.value = userStore.ordinalAddress;
    qrOptions.value = ordinalQROptions;
    warningMsg.value = ordinalWarningMsg;
  } else {
    address.value = userStore.stxAddress;
    qrOptions.value = stacksQROptions;
    warningMsg.value = stacksWarningMsg;
  }
}

function handleCopyToCb(address) {
  copyToClipboard(address)
    .then(() => {
      $q.notify({
        message: "Address copied to clipboard",
        color: "positive",
        position: "top",
        timeout: 2000,
      });
    })
    .catch(() => {
      $q.notify({
        message: "Error copying address to clipboard",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    });
}
</script>
<template>
  <q-card flat class="bg-transparent">
    <div class="q-mb-md row justify-between">
      <span class="text-h5 q-mr-sm q-pt-xs">Receive: </span>
      <q-btn-group push>
        <q-btn
          no-caps
          push
          color="accent"
          label="Stacks"
          icon="img:/tokens/stacks_icon.svg"
          @click="updateQR('stacks')"
        />
        <q-separator color="white" inset vertical />
        <q-btn
          no-caps
          push
          color="accent"
          label="Bitcoin"
          icon="img:/tokens/bitcoin_icon.svg"
          @click="updateQR('bitcoin')"
        />
        <q-separator color="white" inset vertical />
        <q-btn
          no-caps
          push
          color="accent"
          label="Ordinal"
          icon="img:/tokens/ordinals.svg"
          @click="updateQR('ordinal')"
        />
      </q-btn-group>
    </div>
    <q-card-section class="q-pa-none text-center boom-bg">
      <figure class="qrcode" style="margin: auto">
        <vue-qrcode
          value="https://github.com/fengyuanchen"
          tag="svg"
          :options="qrOptions"
        ></vue-qrcode>
        <img
          class="qrcode__image"
          src="/icons/icon-128x128.png"
          alt="Boom Logo"
        />
      </figure>
    </q-card-section>
    <q-card-section
      class="address text-center q-pt-none text-caption"
      @click="handleCopyToCb(address)"
      ><div>{{ address }} <img src="/appicons/copy.svg" /></div>
    </q-card-section>
    <q-card-section class="text-caption text-grey-8 q-pt-none text-center"
      >{{ warningMsg }}
    </q-card-section>
  </q-card>
</template>
<style scoped>
.qrcode {
  display: inline-block;
  font-size: 0;
  margin-bottom: 0;
  position: relative;
  background: #fafafa;
}

.qrcode__image {
  background-color: #fafafa;
  border: 0.25rem solid #fafafa;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  height: 15%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 15%;
}
</style>
