<template>
  <q-card flat class="boom-bg">
    <div class="text-body1 text-bold q-ml-sm">Network</div>
    <q-card-section class="row items-center">
      <q-select
        outlined
        dense
        class="q-pl-sm"
        color="accent"
        v-model="selectedNetwork"
        :options="options"
        @update="handleUpdateNetwork"
      />
    </q-card-section>
    <q-card-section>
      <q-input
        v-model="apiUrl"
        outlined
        dense
        class="q-pl-sm"
        type="text"
        placeholder="Custom API URL"
        @keyup.enter="handleUpdateAPI"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, storeToRef } from "vue";
import { useNetworkStore } from "@stores/network";

const networkStore = useNetworkStore();

const selectedNetwork = ref("mainnet");
const options = ref(["mainnet", "testnet"]);
const { apiUrl } = storeToRef(networkStore);

function handleUpdateAPI() {
  console.log("updateHandleAPI");
}

function handleUpdateNetwork(e) {
  console.info("event", e);
  if (selectedNetwork.value === "mainnet") {
    networkStore.setNetwork("mainnet");
  } else {
    networkStore.setNetwork("testnet");
  }
}
</script>
