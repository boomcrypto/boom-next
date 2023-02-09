<template>
  <q-page class="">
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="accounts">
        <Accounts />
      </q-tab-panel>
      <q-tab-panel name="nfts">
        <NFTs />
      </q-tab-panel>
      <q-tab-panel name="utils">
        <Utils />
      </q-tab-panel>
      <q-tab-panel name="settings">
        <Settings />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import Accounts from "components/AccountsView.vue";
import NFTs from "components/NFTsView.vue";
import Utils from "components/UtilsView.vue";
import Settings from "components/SettingsView.vue";
</script>
