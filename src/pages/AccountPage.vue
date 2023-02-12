<script setup>
import { ref } from "vue";
import { useNavStore } from "../stores/nav";
import TokenActivityView from "../components/TokenActivityView.vue";
import TokenSendView from "../components/TokenSendView.vue";
import TokenBuyView from "../components/TokenBuyView.vue";
import TokenReceiveView from "../components/TokenReceiveView.vue";
import TokenExchangeView from "../components/TokenExchangeView.vue";
import TokenStackingView from "../components/TokenStackingView.vue";

const navStore = useNavStore();

const activeCurrencyTab = ref("activity");

function handleAccountClick(account) {
  navStore.setActiveAccount(account.symbol);
  activeCurrencyTab.value = "activity";
}

const accounts = ref([
  {
    contractName: "tokensoft-token-v4ktqebauw9",
    contractAddress: "SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275",
    assetName: "tokensoft-token",
    balance: "6678343062",
    currentPrice: 0,
    icon: "/tokens/zero.png",
    name: "Zero Authority DAO",
    symbol: "ZERO",
    value: 0,
    denomination: 1000000,
    lock_height: 0,
    burnchain_lock_height: 0,
    burnchain_unlock_height: 0,
    lock_tx_id: 0,
    locked: "0",
    total_fees_sent: "0",
    total_miner_rewards_received: "0",
    total_received: "6678343062",
    total_sent: "0",
    cgId: "",
    assetIdentifier:
      "SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275.tokensoft-token-v4ktqebauw9::tokensoft-token",
  },
  {
    contractName: "fari-token-mn",
    contractAddress: "SP213KNHB5QD308TEESY1ZMX1BP8EZDPG4JWD0MEA",
    assetName: "fari",
    balance: "42105256132",
    currentPrice: 0,
    icon: "/tokens/fari.png",
    name: "Fari",
    symbol: "FARI",
    value: 0,
    denomination: 100000000,
    lock_height: 0,
    burnchain_lock_height: 0,
    burnchain_unlock_height: 0,
    lock_tx_id: 0,
    locked: "0",
    total_fees_sent: "0",
    total_miner_rewards_received: "0",
    total_received: "42105256132",
    total_sent: "0",
    cgId: "bitfari",
    assetIdentifier:
      "SP213KNHB5QD308TEESY1ZMX1BP8EZDPG4JWD0MEA.fari-token-mn::fari",
  },
  {
    contractName: "arkadiko-token",
    contractAddress: "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
    assetName: "diko",
    balance: "2705468",
    currentPrice: 0,
    icon: "/tokens/diko.svg",
    name: "Diko",
    symbol: "DIKO",
    value: 0.00266142298096,
    denomination: 1000000,
    lock_height: 0,
    burnchain_lock_height: 0,
    burnchain_unlock_height: 0,
    lock_tx_id: 0,
    locked: "0",
    total_fees_sent: "0",
    total_miner_rewards_received: "0",
    total_received: "2705468",
    total_sent: "0",
    cgId: "arkadiko-protocol",
    assetIdentifier:
      "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-token::diko",
  },
  {
    contractName: "micro-nthng",
    contractAddress: "SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ",
    assetName: "micro-nothing",
    balance: "19999990000000",
    currentPrice: 0,
    icon: "/tokens/logo01_nothing_centered.png",
    name: "Nothing",
    symbol: "MNO",
    value: 0,
    denomination: 1,
    lock_height: 0,
    burnchain_lock_height: 0,
    burnchain_unlock_height: 0,
    lock_tx_id: 0,
    locked: "0",
    total_fees_sent: "0",
    total_miner_rewards_received: "0",
    total_received: "19999990000000",
    total_sent: "0",
    cgId: "",
    assetIdentifier:
      "SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ.micro-nthng::micro-nothing",
  },
  {
    contractName: "mega",
    contractAddress: "SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335",
    assetName: "mega",
    balance: "100",
    currentPrice: 0,
    icon: "/tokens/mega.png",
    name: "Mega",
    symbol: "MEGA",
    value: 0,
    denomination: 100,
    lock_height: 0,
    burnchain_lock_height: 0,
    burnchain_unlock_height: 0,
    lock_tx_id: 0,
    locked: "0",
    total_fees_sent: "0",
    total_miner_rewards_received: "0",
    total_received: "100",
    total_sent: "0",
    cgId: "",
    assetIdentifier: "SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.mega::mega",
  },
  {
    contractName: "age000-governance-token",
    contractAddress: "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9",
    assetName: "alex",
    balance: "466952153877",
    currentPrice: 0,
    icon: "/tokens/ALEX_Token.png",
    name: "ALEX Token",
    symbol: "ALEX",
    value: 56.159775204202134,
    denomination: 100000000,
    lock_height: 0,
    burnchain_lock_height: 0,
    burnchain_unlock_height: 0,
    lock_tx_id: 0,
    locked: "0",
    total_fees_sent: "0",
    total_miner_rewards_received: "0",
    total_received: "466952153877",
    total_sent: "0",
    cgId: "alexgo",
    assetIdentifier:
      "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.age000-governance-token::alex",
  },
  {
    contractName: "cc-sip010-xck-v1",
    contractAddress: "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8",
    assetName: "crosscheck",
    balance: "1000000",
    currentPrice: 0,
    icon: "/tokens/generic_token_bg.png",
    name: "CrossCheck",
    symbol: "XCK",
    value: 0,
    denomination: 1000000,
    lock_height: 0,
    burnchain_lock_height: 0,
    burnchain_unlock_height: 0,
    lock_tx_id: 0,
    locked: "0",
    total_fees_sent: "0",
    total_miner_rewards_received: "0",
    total_received: "1000000",
    total_sent: "0",
    cgId: "",
    assetIdentifier:
      "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8.cc-sip010-xck-v1::crosscheck",
  },
  {
    contractName: "friedger-token-v1",
    contractAddress: "SPN4Y5QPGQA8882ZXW90ADC2DHYXMSTN8VAR8C3X",
    assetName: "friedger",
    balance: "12341577",
    currentPrice: 0,
    icon: "/tokens/frie.jpg",
    name: "FRIE Token",
    symbol: "FRIE",
    value: 0,
    denomination: 1,
    lock_height: 0,
    burnchain_lock_height: 0,
    burnchain_unlock_height: 0,
    lock_tx_id: 0,
    locked: "0",
    total_fees_sent: "0",
    total_miner_rewards_received: "0",
    total_received: "12341577",
    total_sent: "0",
    cgId: "",
    assetIdentifier:
      "SPN4Y5QPGQA8882ZXW90ADC2DHYXMSTN8VAR8C3X.friedger-token-v1::friedger",
  },
  {
    contractName: "newyorkcitycoin-token-v2",
    contractAddress: "SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11",
    assetName: "newyorkcitycoin",
    balance: "3564000000",
    currentPrice: 0,
    icon: "/tokens/nyc.png",
    name: "NewYorkCityCoinv2",
    symbol: "NYC",
    value: 0,
    denomination: 1000000,
    lock_height: 0,
    burnchain_lock_height: 0,
    burnchain_unlock_height: 0,
    lock_tx_id: 0,
    locked: "0",
    total_fees_sent: "0",
    total_miner_rewards_received: "0",
    total_received: "3564000000",
    total_sent: "0",
    cgId: "newyorkcitycoin",
    assetIdentifier:
      "SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11.newyorkcitycoin-token-v2::newyorkcitycoin",
  },
]);
</script>

<template>
  <q-page class="row q-pa-sm q-col-gutter-md justify-around">
    <div class="col-5" :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'">
      <q-card class="boom-card no-shadow fit" bordered>
        <q-card-section class="text-h6">Accounts</q-card-section>
        <q-card-section class="q-pa-none">
          <q-list class="fit scroll">
            <q-scroll-area class="" style="height: 77vh">
              <q-item
                v-for="account in accounts"
                :key="account.assetIdentifier"
                :acct="account"
                clickable
                @click="handleAccountClick(account)"
              >
                <q-item-section avatar>
                  <q-avatar size="40px">
                    <img
                      :src="account.icon"
                      style="border: 1px solid rgba(196, 196, 196, 0.3)"
                    />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="wallet-multi-asset-type-text"
                    >{{ account.name }}
                  </q-item-label>
                  <q-item-label
                    class="wallet-multi-asset-text-symbol text-uppercase"
                    >{{ account.symbol }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <!-- <div class="column flex"> -->
                  <q-item-label class="wallet-multi-asset-type-text"
                    >{{
                      Number.parseFloat(account.value).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                    }}
                  </q-item-label>
                  <q-item-label class="wallet-multi-asset-text-symbol"
                    >{{ account.balance / account.denomination }}
                  </q-item-label>
                  <!-- </div> -->
                </q-item-section>
              </q-item>
            </q-scroll-area>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-7">
      <q-card flat class="boom-card" bordered>
        <q-card-section class="q-pa-sm">
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
        </q-card-section>
        <q-card-section class="">
          <q-tab-panels v-model="activeCurrencyTab">
            <q-tab-panel name="activity" class="q-pb-none">
              <TokenActivityView />
            </q-tab-panel>
            <q-tab-panel name="send">
              <TokenSendView />
            </q-tab-panel>

            <q-tab-panel name="receive">
              <TokenReceiveView />
            </q-tab-panel>
            <q-tab-panel name="exchange">
              <TokenExchangeView />
            </q-tab-panel>
            <q-tab-panel name="stack">
              <TokenStackingView />
            </q-tab-panel>
            <q-tab-panel name="buy">
              <TokenBuyView />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>
.q-focus-helper {
  visibility: hidden;
}
</style>
