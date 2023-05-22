<template>
  <q-page padding>
    <q-card
      flat
      class="boom-border boom-bg q-mx-auto q-pa-none"
      style="border-radius: 24px; max-width: 1080px"
    >
      <q-toolbar class="bg-transparent text-dark">
        <q-btn flat round dense icon="img:/appicons/collectibles.svg" />
        <q-toolbar-title> All </q-toolbar-title>

        <q-tabs
          v-model="activeCollectionsTab"
          :switch-indicator="false"
          indicator-color="transparent"
        >
          <q-tab
            name="stx"
            :ripple="false"
            :class="activeCollectionsTab === 'stx' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="Stacks"
            no-caps
          />
          <q-tab
            name="btc"
            :ripple="false"
            :class="activeCollectionsTab === 'btc' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="Ordinals"
            no-caps
          />
        </q-tabs>
      </q-toolbar>
      <q-tab-panels v-model="activeCollectionsTab" class="boom-bg">
        <q-tab-panel name="stx" class="q-px-none boom-bg">
          <CollectionsStacksView />
        </q-tab-panel>
        <q-tab-panel name="btc" class="q-px-none boom-bg">
          <CollectionsOrdinalsView />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import CollectionsStacksView from "src/components/Collections/CollectionsStacksView.vue";
import CollectionsOrdinalsView from "src/components/Collections/CollectionsOrdinalsView.vue";

const activeCollectionsTab = ref("stx");
</script>
