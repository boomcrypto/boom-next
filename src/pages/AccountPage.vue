<script setup>
import { onBeforeMount, ref } from "vue";
import { useNavStore } from "../stores/nav";
import TokenListView from "src/components/Accounts/TokenListView.vue";
import TokenActivityView from "../components/Accounts/TokenActivityView.vue";
import TokenSendView from "../components/Accounts/TokenSendView.vue";
import { useTxnStore } from "../stores/transactions";
// import TokenBuyView from "../components/Accounts/TokenBuyView.vue";
// import TokenReceiveView from "../components/Accounts/TokenReceiveView.vue";
// import TokenExchangeView from "../components/Accounts/TokenExchangeView.vue";
// import TokenStackingView from "../components/Accounts/TokenStackingView.vue";
const activeCurrencyTab = ref("activity");
const navStore = useNavStore();
const currentAccount = () => {
  return navStore.getActiveAccount.value;
};

onBeforeMount(async () => {
  const txnStore = useTxnStore();
  await txnStore.getTx(0);
  console.log(txnStore)
});
</script>

<template>
  <q-page padding>
    <q-card
      flat
      class="boom-border boom-bg q-mx-auto q-pa-none"
      style="border-radius: 24px; height: 84vh; max-width: 1080px"
    >
      <q-toolbar class="boom-bg text-dark">
        <q-btn flat round dense icon="img:/appicons/wallet-active.svg" />
        <q-toolbar-title>
          Accounts: {{ currentAccount.symbol || "" }}
        </q-toolbar-title>
        <q-tabs
          v-model="activeCurrencyTab"
          :switch-indicator="false"
          indicator-color="transparent"
          mobile-arrows
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
        <TokenListView />

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
              <TokenBuyView :account="currentAccount" />
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