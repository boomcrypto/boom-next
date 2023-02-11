<template>
  <q-page class="row q-pa-sm q-col-gutter-md justify-around">
    <div class="col-12" :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'">
      <q-card class="boom-border no-shadow fit" bordered>
        <q-card-section class="row items-center">
          <q-icon name="settings" size="md" />
          <div class="text-h6 q-ml-sm">Settings</div>
        </q-card-section>
        <q-card-section class="row items-center">
          <q-select
            rounded
            outlined
            dense
            v-model="selectedNetwork"
            :options="options"
            label="Network"
            @update="handleUpdateNetwork"
          >
            <template #before> Network: </template>
          </q-select>
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            rounded
            dense
            type="text"
            v-model="apiUrl"
            @keyup.enter="handleUpdateAPI"
          >
            <template #before> API URL: </template>
          </q-input>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useSettingsStore } from "src/stores/settings";

const settingsStore = useSettingsStore();

const selectedNetwork = ref(null);
const options = ref(["mainnet", "testnet"]);

function updateHandleAPI() {
  console.log("updateHandleAPI");
}

function handleUpdateNetwork() {
  console.log("handleUpdateNetwork");
}
</script>
