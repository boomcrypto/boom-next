<template>
  <q-tab-panels
    v-model="currentContractTab"
    dense
    align="justify"
    class="bg-primary q-pa-none"
  >
    <q-tab-panel name="overview" class="q-pa-none">
      <q-card flat class="boom-bg full-width">
        <q-toolbar class="bg-transparent">
          <q-btn
            outline
            style="color: grey"
            text-color="black"
            label="Show/Hide Failed Deployments"
            @click="hideFails = !hideFails"
          />

          <!-- <q-btn
            no-caps
            oulined
          /> -->
          <q-space />
          <q-btn
            no-caps
            unelevated
            rounded
            text-color="purple"
            icon="img:/appicons/add.svg"
            label="New Contract"
          >
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>New NFT</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>New NFT Collection</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>New Token</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>New Boombox</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>New NFT Collection</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
        <q-list class="fit scroll">
          <q-scroll-area class="" style="height: 65vh">
            <template
              v-for="contract in displayContracts"
              :key="contract.tx_id"
            >
              <UtilsContractItem
                :contract="contract"
                @click="showContractDetails(contract)"
                class="q-mt-sm"
              />
            </template>
          </q-scroll-area>
        </q-list>
      </q-card>
    </q-tab-panel>
    <q-tab-panel name="detail" class="q-pa-none">
      <q-card flat class="boom-bg full-width">
        <q-toolbar dense class="bg-transparent">
          <q-btn
            flat
            round
            dense
            icon="img:/appicons/arrow-left-flat-2.svg"
            @click="hideContractDetails"
          />
          <q-toolbar-title>
            {{ currentContractName }}
          </q-toolbar-title>
          <q-tabs v-model="contractDetailTab" class="text-white">
            <q-tab name="overview" label="Overview" />
            <q-tab name="functions" label="Functions" />
            <q-tab name="events" label="Events" />
            <q-tab name="code" label="Code" />
          </q-tabs>
        </q-toolbar>
        <q-tab-panels v-model="contractDetailTab" animated>
          <q-tab-panel name="overview">
            <ContractDetailsOverview :contract="currentContract" />
          </q-tab-panel>
          <q-tab-panel name="functions">
            <ContractDetailsFunctions :contract="currentContract" />
          </q-tab-panel>
          <q-tab-panel name="events">
            <ContractDetailsEvents :contract="currentContract" />
          </q-tab-panel>
          <q-tab-panel name="code">
            <ContractDetailsCode :contract="currentContract" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTxnStore } from "@stores/transactions";
import { storeToRefs } from "pinia";
import UtilsContractItem from "./UtilsContractItem.vue";
import { openURL } from "quasar";
import ContractDetailsOverview from "./ContractDetailsOverview.vue";
import ContractDetailsFunctions from "./ContractDetailsFunctions.vue";
import ContractDetailsEvents from "./ContractDetailsEvents.vue";
import ContractDetailsCode from "./ContractDetailsCode.vue";

const txnStore = useTxnStore();
const currentContractTab = ref("overview");
const contractDetailTab = ref("overview");
const currentContract = ref({});
const hideFails = ref(true);

const { deployedContracts } = storeToRefs(txnStore);

const displayContracts = computed(() =>
  hideFails.value
    ? deployedContracts.value.filter(
        (contract) => contract.tx_status === "success"
      )
    : deployedContracts.value
);

const editor = computed(() => currentContract.value.smart_contract.source_code);

const currentContractName = computed(() => {
  return currentContract?.value?.smart_contract.contract_id.split(".")[1] || "";
});

function handleOpenExplorer() {
  openURL(
    `https://explorer.stacks.co/txid/${currentContract.value.tx_id}?chain=mainnet`,
    undefined, // in this example we don't care about the rejectFn()
    {
      noopener: true, // this is set by default for security purposes
      menubar: true,
      toolbar: true,
      noreferrer: true,
    }
  );
}

function showContractDetails(contract) {
  currentContractTab.value = "detail";
  currentContract.value = contract;
}

function hideContractDetails() {
  currentContractTab.value = "overview";
  currentContract.value = {};
}

function handleNewContract() {
  alert("New Contract");
}
</script>
