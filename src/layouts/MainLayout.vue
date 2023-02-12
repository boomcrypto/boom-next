<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white" height-hint="52px">
      <q-toolbar>
        <q-toolbar-title class="text-grey-10 text-weight-bold">
          Boom
          <q-icon name="img:appicons/bolt.png" size="16px" />
          Desktop
        </q-toolbar-title>
        <StacksConnectWallet />
      </q-toolbar>
      <q-toolbar inset>
        <q-tabs
          v-model="tab"
          stretch
          class="text-purple q-mx-auto"
          @update="updateNav()"
        >
          <q-route-tab name="accounts" label="Accounts" to="/" no-caps />
          <q-route-tab
            name="nfts"
            label="Collections"
            to="/collections"
            no-caps
          />
          <q-route-tab name="utils" label="Utils" to="/utils" no-caps />
          <q-route-tab name="chat" label="Chat" to="/chat" no-caps />
          <q-route-tab
            name="settings"
            label="Settings"
            to="/settings"
            no-caps
          />
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from "vue";
import { userSession } from "../boot/stacks";
import { useNavStore } from "../stores/nav";
import StacksConnectWallet from "../components/StacksConnectWallet.vue";

const navStore = useNavStore();

function updateNav() {
  navStore.setNav(tab);
}

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
</style>
