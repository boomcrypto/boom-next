<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  acct: Object,
});

const acct = ref(props.acct);

const formattedVal = computed(() => {
  if (acct.value) {
    return Number.parseFloat(acct.value.value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  } else {
    return Number.parseFloat(0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
});
</script>

<template>
  <q-item class="flex full-width">
    <q-item-section avatar>
      <q-avatar size="40px">
        <img
          :src="acct.icon"
          style="border: 1px solid rgba(196, 196, 196, 0.3)"
        />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class="wallet-multi-asset-type-text">{{
        acct.name
      }}</q-item-label>
      <q-item-label class="wallet-multi-asset-text-symbol text-uppercase">{{
        acct.symbol
      }}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <!-- <div class="column flex"> -->
      <q-item-label class="wallet-multi-asset-type-text"
        >{{ formattedVal }}
      </q-item-label>
      <q-item-label class="wallet-multi-asset-text-symbol">{{
        acct.balance
      }}</q-item-label>
      <!-- </div> -->
    </q-item-section>
  </q-item>
</template>
