<script setup>
import { onMounted, ref } from "vue";
import { useNavStore } from "../stores/nav";
import TokenListView from "src/components/Accounts/TokenListView.vue";
import TokenActivityView from "../components/Accounts/TokenActivityView.vue";
import TokenSendView from "../components/Accounts/TokenSendView.vue";
import TokenReceiveView from "../components/Accounts/TokenReceiveView.vue";
import TokenExchangeView from "../components/Accounts/TokenExchangeView.vue";
import TokenStackingView from "../components/Accounts/TokenStackingView.vue";
import TokenBuyView from "../components/Accounts/TokenBuyView.vue";
//Store
import { useWalletStore } from "../stores/wallet";
import { useTxnStore } from "../stores/transactions";
const activeCurrencyTab = ref("activity");
const navStore = useNavStore();
const currentAccount = () => {
  return navStore.getActiveAccount.value;
};

//Handles Store initialization associated to this component
onMounted(async () => {
  const walletStore = useWalletStore();
  const txnStore = useTxnStore();
  await walletStore.init();
  await txnStore.getTx(0);
});
</script>

<template>
  <q-page padding class="column q-gutter-md">
    <q-card
      flat
      class="col-4 boom-bg boom-border"
      style="max-width: 1080px; width: 100%"
    >
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </q-card-section>
    </q-card>
    <q-card
      flat
      class="col"
      style="max-width: 1080px; width: 100%; background-color: #f4e8f9"
    >
      <q-card-section horizontal class="q-gutter-md justify-between">
        <q-card-section class="col-5">
          <TokenListView />
        </q-card-section>

        <q-card-section class="col-7">
          <q-card flat class="boom-bg boom-border">
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
            <q-tab-panels v-model="activeCurrencyTab" class="">
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
          </q-card>
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
