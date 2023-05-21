<script setup>
import { ref } from "vue";
import StacksConnectButton from "../components/StacksConnectButton.vue";
import EssentialLink from "@components/EssentialLink.vue";

const tab = ref("accounts");
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const essentialLinks = [
  {
    icon: "img:/appicons/dashboard.svg",
    title: "Accounts",
    caption: "Accounts",
    link: "/",
  },
  {
    icon: "img:/appicons/collectibles-inactive.svg",
    title: "Collectibles",
    caption: "View your collectibles",
    link: "/collectibles",
  },
  {
    icon: "img:/appicons/boombox-filter-gray.svg",
    title: "Get a Boombox",
    link: "/earn/boombox/List",
    caption: "Get a Boombox",
  },
  {
    icon: "img:/appicons/smart-contract.svg",
    title: "Smart Contracts",
    link: "/smart-contracts",
    caption: "Smart Contracts",
  },
  {
    icon: "img:/appicons/handyman.svg",
    title: "Tools",
    link: "/tools",
    caption: "/tools",
  },
  {
    icon: "img:/appicons/settings-inactive.svg",
    title: "Settings",
    link: "/settings",
    caption: "/settings",
  },
  {
    icon: "img:/appicons/mint-inactive.svg",
    title: "Mint",
    link: "/mint",
    caption: "/mintmobile",
  },
  {
    icon: "img:/appicons/stacking.svg",
    title: "Earn",
    link: "/earn",
    caption: "/earn",
  },
  {
    icon: "img:/appicons/swap-inactive.svg",
    title: "Swap",
    link: "/swap",
    caption: "/swap",
  },
];
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-grey-5" height-hint="52px">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-grey-10 text-weight-bold">
          Boom
          <q-icon name="img:appicons/bolt.png" size="16px" />
          <span v-if="$q.screen.gt.xs">Desktop </span>
        </q-toolbar-title>
        <StacksConnectButton />
      </q-toolbar>
      <!-- <q-toolbar inset>
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
          <q-route-tab name="tools" to="/tools" no-caps>
            <div class="text-bold text-h5">Tools</div>
          </q-route-tab>
          <q-route-tab name="settings" to="/settings" no-caps>
            <div class="text-bold text-h5">Settings</div>
          </q-route-tab>
        </q-tabs>
      </q-toolbar> -->
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
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
