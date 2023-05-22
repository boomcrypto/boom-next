<script setup>
import { computed } from "vue";
import { useNavStore } from "@stores/nav";
import { useWalletStore } from "@stores/wallet";

const navStore = useNavStore();
const walletStore = useWalletStore();

function handleAccountClick(id) {
  navStore.setActiveAccount(id);
}

const accounts = computed(() => {
  return walletStore.tokens;
});
</script>

<template>
  <q-card flat class="boom-bg boom-border">
    <q-card-section class="text-h6 q-py-none">Accounts</q-card-section>
    <q-card-section class="q-pa-none">
      <q-list class="fit scroll">
        <q-scroll-area class="" style="height: 77vh">
          <q-item
            v-for="account in accounts"
            :key="account.id"
            :acct="account"
            clickable
            @click="handleAccountClick(account.id)"
            style="border-bottom: 1px solid rgba(196, 196, 196, 0.3)"
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
</template>
