<template>
  <q-tab-panels
    v-model="currentContractTab"
    dense
    align="justify"
    class="bg-primary q-pa-none"
  >
    <q-tab-panel name="overview" class="q-pa-none">
      <q-card flat class="boom-bg full-width">
        <q-toolbar class="bg-purple text-white">
          <q-toolbar-title> My Contracts </q-toolbar-title>
          <q-btn
            flat
            round
            dense
            icon="img:/appicons/filter.svg"
            @click="hideFails = !hideFails"
          />
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
              />
            </template>
          </q-scroll-area>
        </q-list>
      </q-card>
    </q-tab-panel>
    <q-tab-panel name="detail" class="q-pa-none">
      <q-card flat class="boom-bg full-width">
        <q-toolbar dense class="bg-purple text-white">
          <q-btn
            flat
            round
            dense
            icon="img:/appicons/arrow-left-flat-2.svg"
            @click="hideContractDetails"
          />
          <q-tabs v-model="contractDetailTab" class="text-white">
            <q-tab name="overview" label="Overview" />
            <q-tab name="functions" label="Functions" />
            <q-tab name="events" label="Events" />
            <q-tab name="code" label="Code" />
          </q-tabs>
        </q-toolbar>
        <q-tab-panels v-model="contractDetailTab" animated>
          <q-tab-panel name="overview">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="functions">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="events">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="code">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. </q-tab-panel
          >Right
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

function showContractDetails() {
  currentContractTab.value = "detail";
  currentContract.value = contract;
}

function hideContractDetails() {
  currentContractTab.value = "overview";
  currentContract.value = {};
}
</script>
