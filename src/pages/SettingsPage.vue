<template>
  <q-page padding>
    <q-card
      flat
      class="boom-card q-mx-auto q-pa-none"
      style="border-radius: 24px; height: 84vh; max-width: 1080px"
    >
      <q-tabs
        v-model="activeSettingsTab"
        :switch-indicator="false"
        indicator-color="transparent"
      >
        <q-tab
          name="profile"
          :ripple="false"
          :class="activeSettingsTab === 'profile' ? 'tab-border' : ''"
          class="q-ml-xs"
          label="Profile"
          no-caps
        />
        <q-tab
          name="network"
          :ripple="false"
          :class="activeSettingsTab === 'network' ? 'tab-border' : ''"
          class="q-ml-xs"
          label="Network"
          no-caps
        />
        <q-tab
          name="friedgerpool"
          :ripple="false"
          :class="activeSettingsTab === 'friedgerpool' ? 'tab-border' : ''"
          class="q-ml-xs"
          label="Friedger Pool"
          no-caps
        />
        <q-tab
          name="nostr"
          :ripple="false"
          :class="activeSettingsTab === 'nostr' ? 'tab-border' : ''"
          class="q-ml-xs"
          label="Nostr"
          no-caps
        />
      </q-tabs>
      <q-tab-panels v-model="activeSettingsTab" class="boom-bg">
        <q-tab-panel name="profile" class="q-px-none boom-bg">
          <SettingsProfileView />
        </q-tab-panel>
        <q-tab-panel name="network" class="q-px-none boom-bg">
          <SettingsNetworkView />
        </q-tab-panel>
        <q-tab-panel name="friedgerpool" class="q-px-none boom-bg">
          <SettingsPoolView />
        </q-tab-panel>
        <q-tab-panel name="nostr" class="q-px-none boom-bg">
          <SettingsNostrView />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import SettingsPoolView from "src/components/SettingsPoolView.vue";
import SettingsProfileView from "src/components/SettingsProfileView.vue";
import SettingsNetworkView from "src/components/SettingsNetworkView.vue";
import SettingsNostrView from "src/components/SettingsNostrView.vue";

const activeSettingsTab = ref("profile");
</script>

<style scoped>
.q-focus-helper {
  visibility: hidden;
}

.q-tab {
  border-radius: 8px;
}
</style>
