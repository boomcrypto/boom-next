<template>
  <q-layout view="lHh Lpr lFf">
    <q-header height-hint="52px">
      <q-toolbar>
        <q-toolbar-title class="text-grey-10 text-weight-bold">
          Boom
          <q-icon name="img:appicons/bolt.png" size="16px" />
          Desktop
        </q-toolbar-title>
        <div
          class="row bg-grey-3 text-dark cursor-pointer"
          style="height: 36px; border-radius: 50px"
          @click="handleLoginLogout"
        >
          <span class="text-body1 q-pa-sm text-bold">{{ buttonMsg }}</span>
          <img :src="buttonIcon" height="36px" />
        </div>
      </q-toolbar>
      <q-toolbar inset>
        <q-tabs v-model="tab" shrink class="text-purple q-mx-auto">
          <q-tab name="accounts" label="Accounts" />
          <q-tab name="nfts" label="Collections" />
          <q-tab name="utils" label="Utils" />
          <q-tab name="settings" label="Settings" />
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
// import EssentialLink from "components/EssentialLink.vue";
import { userSession, profile } from "../boot/stacks";

console.log("profile: ", profile);

const buttonMsg = computed(() =>
  userSession.isUserSignedIn() ? "Logout" : "Login"
);

const buttonIcon = computed(() =>
  userSession.isUserSignedIn() ? "/appicons/avatar.png" : "/appicons/login.svg"
);

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
