<template>
  <div class="">
    <div class="row wrap fit q-col-gutter-lg">
      <template v-for="(nft, index) in nfts" :key="index">
        <div class="col-xs-12 col-sm-4 col-md-3">
          <NFTViewCard :nft="nft" />
        </div>
      </template>
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
import NFTViewCard from "./NFTViewCard.vue";

const nftStore = useNFTStore();
const { items } = storeToRefs(nftStore);

const page = ref(1);
const max = items.value.length;
const nfts = computed(() => {
  return items.value[page.value - 1];
});

function handlePageUpdate(value) {
  page.value = value;
}
</script>
