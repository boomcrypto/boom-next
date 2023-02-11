<template>
  <q-page class="row q-pa-sm q-col-gutter-md justify-around">
    <div class="col-12" :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'">
      <q-card class="boom-border no-shadow fit" bordered>
        <q-card-section class="row items-center">
          <q-icon name="settings" size="md" />
          <div class="text-h6 q-ml-sm">Settings</div>
        </q-card-section>
        <div class="text-body1 text-bold q-ml-sm">Network</div>
        <q-card-section class="row items-center">
          Network:
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
          Stacks API URL:
          <q-input
            outlined
            dense
            class="q-pl-sm"
            type="text"
            v-model="apiUrl"
            @keyup.enter="handleUpdateAPI"
          />
        </q-card-section>
        <div class="text-body1 text-bold q-ml-sm">Friedger Pool</div>
        <q-card-section>
          <q-option-group
            v-model="payout"
            class="boom-border col-2"
            outline
            no-caps
            unelevated
            color="accent"
            text-color="accent"
            :options="[
              { label: 'xBTC', value: 'xbtc' },
              { label: 'STX', value: 'stx' },
            ]"
          />
          <div class="text-caption col q-pt-sm q-pl-sm">
            Note: You can change this anytime, even if you're not delegating.
            Your preference change will only impact *future* payouts.
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useSettingsStore } from "src/stores/settings";

const settingsStore = useSettingsStore();

const selectedNetwork = ref("mainnet");
const options = ref(["mainnet", "testnet"]);
const fpOptions = ref(["stx", "xbtc"]);
const apiUrl = ref(settingsStore.apiURL);
const payout = ref("xbtc");

function updateHandleAPI() {
  console.log("updateHandleAPI");
}

function handleUpdateNetwork() {
  console.log("handleUpdateNetwork");
}
</script>
