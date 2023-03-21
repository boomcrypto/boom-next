<template>
  <q-page padding>
    <q-card
      flat
      class="boom-bg q-mx-auto q-pa-none"
      style="border-radius: 24px; height: 84vh; max-width: 1080px"
    >
      <q-toolbar class="bg-transparent text-dark">
        <q-btn flat round dense icon="img:/appicons/handyman.svg" />
        <q-toolbar-title> Tools </q-toolbar-title>
        <q-tabs
          v-model="activeUtilsTab"
          :switch-indicator="false"
          indicator-color="transparent"
        >
          <q-tab
            name="contracts"
            :ripple="false"
            :class="activeUtilsTab === 'contracts' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="Contracts"
            no-caps
          />
          <q-tab
            name="ordinals"
            :ripple="false"
            :class="activeUtilsTab === 'ordinals' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="Ordinals"
            no-caps
          />
          <q-tab
            name="nfts"
            :ripple="false"
            :class="activeUtilsTab === 'nfts' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="NFTs"
            no-caps
          />
          <q-tab
            name="storage"
            :ripple="false"
            :class="activeUtilsTab === 'storage' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="Storage"
            no-caps
          />
        </q-tabs>
      </q-toolbar>
      <q-tab-panels v-model="activeUtilsTab" class="boom-bg">
        <q-tab-panel name="contracts" class="q-px-none boom-bg">
          <UtilsContractView />
        </q-tab-panel>
        <q-tab-panel name="ordinals" class="q-px-none boom-bg">
          <UtilsOrdinalsView />
        </q-tab-panel>
        <q-tab-panel name="nfts" class="q-px-none boom-bg">
          <UtilsNFTView />
        </q-tab-panel>
        <q-tab-panel name="storage" class="q-px-none boom-bg">
          <UtilsStorageView />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import UtilsContractView from "@components/Tools/UtilsContractView.vue";
import UtilsOrdinalsView from "@components/Tools/UtilsOrdinalsView.vue";
import UtilsNFTView from "@components/Tools/UtilsNFTView.vue";
import UtilsStorageView from "@components/Tools/UtilsStorageView.vue";

const activeUtilsTab = ref("contracts");
</script>
