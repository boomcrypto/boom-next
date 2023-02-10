<script setup>
import { mapGetters } from "vuex";
import { ref, defineProps } from "vue";

const props = defineProps({
  acct: Object,
});

const acct = ref(props.acct);
const values = ref({});

const value = computed(() => {
  return acct.value.value || 0;
});

const name = computed(() => {
  return acct.value.name.value || "";
});

const symbol = computed(() => {
  return acct.value.symbol.value || "";
});

const icon = computed(() => {
  return acct.value.icon.value || "/images/tokens/generic_token_bg.png";
});

const balance = computed(() => {
  return acct.value.balance.value || 0;
});

const denomination = computed(() => {
  return acct.value.denomination.value || 1;
});

const formattedVal = computed(() => {
  return Number.parseFloat(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
});
</script>

<template>
  <q-item class="flex full-width">
    <q-item-section avatar>
      <q-avatar size="40px">
        <img :src="icon" style="border: 1px solid rgba(196, 196, 196, 0.3)" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class="wallet-multi-asset-type-text">{{
        name
      }}</q-item-label>
      <q-item-label class="wallet-multi-asset-text-symbol text-uppercase">{{
        symbol
      }}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <!-- <div class="column flex"> -->
      <q-item-label class="wallet-multi-asset-type-text"
        >{{ formattedVal }}
      </q-item-label>
      <q-item-label class="wallet-multi-asset-text-symbol">{{
        balance
      }}</q-item-label>
      <!-- </div> -->
    </q-item-section>
  </q-item>
</template>
