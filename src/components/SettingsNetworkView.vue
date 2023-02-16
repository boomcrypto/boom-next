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
      >
        <template #before> Network: </template>
      </q-select>
    </q-card-section>
    <q-card-section>
      <q-input
        v-model="apiUrl"
        outlined
        dense
        class="q-pl-sm"
        type="text"
        :value="apiUrl"
        @keyup.enter="handleUpdateAPI"
      >
        <template #before> Stacks API URL: </template>
      </q-input>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { useSettingsStore } from "src/stores/settings";

const settingsStore = useSettingsStore();

const selectedNetwork = ref("mainnet");
const options = ref(["mainnet", "testnet"]);
const apiUrl = ref(settingsStore.apiURL);

function handleUpdateAPI() {
  console.log("updateHandleAPI");
}

function handleUpdateNetwork() {
  console.log("handleUpdateNetwork");
}
</script>
