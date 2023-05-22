<template>
  <q-page padding>
    <q-card
      flat
      class="boom-bg q-mx-auto q-pa-none"
      style="border-radius: 24px; height: 84vh; max-width: 1080px"
    >
      <q-toolbar class="bg-transparent text-dark">
        <q-btn flat round dense icon="img:/appicons/handyman.svg" />
        <q-toolbar-title> Smart Contracts </q-toolbar-title>
        <q-tabs
          v-model="activeUtilsTab"
          :switch-indicator="false"
          indicator-color="transparent"
        >
          <q-tab
            name="taproot"
            :ripple="false"
            :class="activeUtilsTab === 'taproot' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="Taproot"
            no-caps
          />
          <q-tab
            name="rgb"
            :ripple="false"
            :class="activeUtilsTab === 'rgb' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="RGB"
            no-caps
          />
          <q-tab
            name="stacks"
            :ripple="false"
            :class="activeUtilsTab === 'stacks' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="Stacks"
            no-caps
          />
          <q-tab
            name="rsk"
            :ripple="false"
            :class="activeUtilsTab === 'rsk' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="Rootstock"
            no-caps
          />
        </q-tabs>
      </q-toolbar>
      <q-tab-panels v-model="activeUtilsTab" class="boom-bg">
        <q-tab-panel name="taproot" class="q-px-none boom-bg">
          <ContractTaprootView />
        </q-tab-panel>
        <q-tab-panel name="rgb" class="q-px-none boom-bg">
          <ContractRGBView />
        </q-tab-panel>
        <q-tab-panel name="stacks" class="q-px-none boom-bg">
          <ContractStacksView />
        </q-tab-panel>
        <q-tab-panel name="rsk" class="q-px-none boom-bg">
          <ContractRSKView />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import ContractTaprootView from "@components/SmartContracts/ContractTaprootView.vue";
import ContractRGBView from "@components/SmartContracts/ContractRGBView.vue";
import ContractStacksView from "@components/SmartContracts/ContractStacksView.vue";
import ContractRSKView from "@components/SmartContracts/ContractRSKView.vue";

const activeUtilsTab = ref("contracts");
</script>
