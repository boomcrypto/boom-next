<script setup>
import { ref } from "vue";
import { useNavStore } from "../stores/nav";
import TokenActivityView from "../components/TokenActivityView.vue";
import TokenSendView from "../components/TokenSendView.vue";
import TokenBuyView from "../components/TokenBuyView.vue";
import TokenReceiveView from "../components/TokenReceiveView.vue";
import TokenExchangeView from "../components/TokenExchangeView.vue";
import TokenStackingView from "../components/TokenStackingView.vue";
import TokenListView from "src/components/TokenListView.vue";

const activeCurrencyTab = ref("activity");
</script>

<template>
  <q-page padding>
    <q-card
      flat
      class="boom-border boom-bg q-mx-auto q-pa-none"
      style="border-radius: 24px; height: 84vh; max-width: 1080px"
    >
      <q-toolbar class="bg-purple text-white">
        <q-btn flat round dense icon="img:/appicons/wallet-active.svg" />
        <q-toolbar-title> Accounts </q-toolbar-title>
        <q-tabs
          v-model="activeCurrencyTab"
          :switch-indicator="false"
          indicator-color="transparent"
        >
          <q-tab
            name="activity"
            :ripple="false"
            :class="activeCurrencyTab === 'activity' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="Activity"
            no-caps
          />
          <q-tab
            name="send"
            :ripple="false"
            :class="activeCurrencyTab === 'send' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="Send"
            no-caps
          />
          <q-tab
            name="receive"
            :ripple="false"
            :class="activeCurrencyTab === 'receive' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="Receive"
            no-caps
          />
          <q-tab
            name="exchange"
            :ripple="false"
            :class="activeCurrencyTab === 'exchange' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="Exchange"
            no-caps
          />
          <q-tab
            name="stack"
            :ripple="false"
            :class="activeCurrencyTab === 'stack' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="Stack"
            no-caps
          />
          <q-tab
            name="buy"
            :ripple="false"
            :class="activeCurrencyTab === 'buy' ? 'tab-border' : ''"
            class="q-ml-xs"
            label="Buy"
            no-caps
          />
        </q-tabs>
      </q-toolbar>

      <q-card-section horizontal class="q-pa-none">
        <q-card-section class="col-5">
          <TokenListView />
        </q-card-section>
        <q-card-section class="col-7">
          <q-tab-panels v-model="activeCurrencyTab" class="boom-bg">
            <q-tab-panel name="activity" class="q-px-none boom-bg">
              <TokenActivityView />
            </q-tab-panel>
            <q-tab-panel name="send" class="q-pa-none boom-bg">
              <TokenSendView />
            </q-tab-panel>
            <q-tab-panel name="receive" class="q-pa-none boom-bg">
              <TokenReceiveView />
            </q-tab-panel>
            <q-tab-panel name="exchange" class="q-pa-none boom-bg">
              <TokenExchangeView />
            </q-tab-panel>
            <q-tab-panel name="stack" class="q-pa-none boom-bg">
              <TokenStackingView />
            </q-tab-panel>
            <q-tab-panel name="buy" class="q-pa-none boom-bg">
              <TokenBuyView />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
.q-focus-helper {
  visibility: hidden;
}

.q-tab {
  border-radius: 8px;
}
</style>
