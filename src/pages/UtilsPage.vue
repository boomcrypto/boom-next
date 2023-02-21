<template>
  <q-page padding>
    <q-card
      flat
      class="boom-card q-mx-auto q-pa-none"
      style="border-radius: 24px; height: 84vh; max-width: 1080px"
    >
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
      </q-tabs>
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
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import UtilsContractView from "@components/UtilsContractView.vue";
import UtilsOrdinalsView from "@components/UtilsOrdinalsView.vue";
import UtilsNFTView from "@components/UtilsNFTView.vue";

const activeUtilsTab = ref("contracts");
</script>
