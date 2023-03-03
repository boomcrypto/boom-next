<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-grey-5" height-hint="52px">
      <q-toolbar>
        <q-toolbar-title class="text-grey-10 text-weight-bold">
          Boom
          <q-icon name="img:appicons/bolt.png" size="16px" />
          <span v-if="$q.screen.gt.xs">Desktop </span>
        </q-toolbar-title>
        <StacksConnectButton />
      </q-toolbar>
      <q-toolbar inset>
        <q-tabs
          v-model="tab"
          outside-arrows
          class="q-mx-auto menu-header"
          @update="updateNav()"
        >
          <q-route-tab name="accounts" to="/" no-caps>
            <div class="text-bold text-h5">Accounts</div>
          </q-route-tab>
          <q-route-tab name="nfts" to="/collectibles" no-caps>
            <div class="text-bold text-h5">Collectibles</div>
          </q-route-tab>
          <q-route-tab name="utils" to="/utils" no-caps>
            <div class="text-bold text-h5">Tools</div>
          </q-route-tab>
          <q-route-tab name="settings" to="/settings" no-caps>
            <div class="text-bold text-h5">Settings</div>
          </q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div
        class="full-width bg-grey-5"
        style="
          height: 150px;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
        "
      ></div>
      <router-view style="margin-top: -145px" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from "vue";
import { userSession } from "../boot/stacks";
import StacksConnectButton from "../components/StacksConnectButton.vue";

const tab = ref("accounts");

const linksList = [
  {
    icon: "src/assets/icons/dashboard.svg",
    title: "Dashboard",
    caption: "View your dashboard",
    link: "/",
  },
  {
    icon: "src/assets/icons/boombox-filter-gray.svg",
    title: "Get a Boombox",
    link: "/earn/boombox/List",
    caption: "Get a Boombox",
  },
  {
    icon: "src/assets/icons/collectibles-inactive.svg",
    title: "Collectibles",
    caption: "View your collectibles",
    link: "/nfts",
  },
  {
    icon: "src/assets/icons/list.svg",
    title: "Activity",
    caption: "View your txns",
    link: "/activity",
  },
  {
    icon: "src/assets/icons/mint-inactive.svg",
    title: "Mint",
    link: "/mint",
    caption: "/mintmobile",
  },
  {
    icon: "src/assets/icons/stacking.svg",
    title: "Earn",
    link: "/earn",
    caption: "/earn",
  },
  {
    icon: "src/assets/icons/swap-inactive.svg",
    title: "Swap",
    link: "/swap",
    caption: "/swap",
  },
  {
    icon: "src/assets/icons/handyman.svg",
    title: "Utils",
    link: "/utils",
    caption: "/utils",
  },
  {
    icon: "src/assets/icons/settings-inactive.svg",
    title: "Settings",
    link: "/settings",
    caption: "/settings",
  },
];
</script>
<style scoped>
.boom-button {
  background: radial-gradient(
    171.19% 151.33% at -35.42% -28.71%,
    #f26ab2 28.65%,
    #b64fc6 77.69%,
    #a748cb 100%
  );
  box-shadow: 0 8px 16px -8px rgba(167, 72, 203, 0.5);
  border-radius: 100px;
  min-width: 94px;
  color: #fafafa;
}
.tabname {
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #0e0a0a;
  font-weight: 600;
}
</style>
