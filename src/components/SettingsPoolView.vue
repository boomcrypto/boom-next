<template>
  <q-card flat class="boom-bg">
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
        :options="fpOptions"
      />
      <div class="text-caption col q-pt-sm q-pl-sm">
        Note: You can change this anytime, even if you're not delegating. Your
        preference change will only impact *future* payouts from Friedger Pool.
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useSettingsStore } from "src/stores/settings";

const settingsStore = useSettingsStore();

const fpOptions = ref([
  { label: "Bitcoin", value: "btc" },
  { label: "xBTC", value: "xbtc" },
  { label: "STX", value: "stx" },
]);
const payout = ref("btc");
</script>
