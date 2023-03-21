<template>
  <div class="">
    <div class="row wrap fit q-mx-auto">
      <div
        class="col-xs-12 col-sm-4 col-md-3 q-pa-sm"
        v-for="(nft, index) in nfts"
        :key="index"
      >
        <OrdViewCard :nft="nft" />
      </div>
    </div>
    <div class="absolute-bottom q-mt-md">
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="page"
          color="accent"
          :max="max"
          direction-links
          @update="handlePageUpdate(value)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useNFTStore } from "@stores/nfts";
import { storeToRefs } from "pinia";
import OrdViewCard from "./OrdViewCard.vue";

const nftStore = useNFTStore();
const { ords } = storeToRefs(nftStore);

const page = ref(1);
const max = ords.value.length;
const nfts = computed(() => {
  return ords.value[page.value - 1];
});

function handlePageUpdate(value) {
  page.value = value;
}
</script>
