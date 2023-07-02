<template>
  <q-tabs indicator-color="transparent">
    <q-route-tab
      no-caps
      class="webbyTab"
      active-class="text-accent activeTab"
      to="/wallet"
      :icon="walletIcon"
      label="Home"
    />
    <q-route-tab
      no-caps
      class="webbyTab"
      active-class="activeTab text-accent"
      to="/nfts"
      :icon="nftIcon"
      label="NFTs"
    />
    <q-route-tab
      no-caps
      class="webbyTab"
      active-class="activeTab text-accent"
      to="/settings"
      :icon="settingsIcon"
      label="Settings"
    />
  </q-tabs>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const walletIcon = computed(() => {
  return route.path.startsWith("/wallet")
    ? "img:/images/wallet-active.svg"
    : "img:/images/wallet-inactive.svg";
});
const nftIcon = computed(() => {
  if (route.path.startsWith("/nfts")) {
    return "img:/images/nfts-active.svg";
  } else {
    return "img:/images/nfts-inactive.svg";
  }
});
const settingsIcon = computed(() => {
  return route.path.startsWith("/profile")
    ? "img:/images/settings-active.svg"
    : "img:/images/settings-inactive.svg";
});
</script>

<style scoped>
.webbyTab {
  max-width: 120px !important;
}
.subtext {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #ada6b5;
}
.headingtext {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #fafafa;
}
</style>
