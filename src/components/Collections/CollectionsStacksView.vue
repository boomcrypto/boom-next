<template>
  <CollectionsErrorView v-if="error" />
  <CollectionsEmptyView v-if="!error && !nfts.length" />
  <q-infinite-scroll v-else @load="loadMoreNFTs" :offset="250" class="row wrap">
    <div
      class="col-xs-12 col-sm-4 col-md-3 q-pa-sm"
      v-for="nft in nftList"
      :key="nft.id"
    >
      <NFTViewCard :nft="nft" />
    </div>
  </q-infinite-scroll>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import { useNFTStore } from "@stores/nfts";
import { storeToRefs } from "pinia";
import NFTViewCard from "./NFTViewCard.vue";
import CollectionsEmptyView from "./CollectionsEmptyView.vue";
import CollectionsErrorView from "./CollectionsErrorView.vue";
import { Loading } from "quasar";

const nftStore = useNFTStore();
const { nfts } = storeToRefs(nftStore);
const page = ref(0);
const nftList = ref([]);
const error = ref(false);

function loadMoreNFTs(index, done) {
  page.value++;
  nftList.value.push(...nfts.value[page.value]);
  done();
}

onBeforeMount(async () => {
  try {
    Loading.show();
    await nftStore.getStacksNFTS();
  } catch (error) {
    error.value = true;
    console.log(error);
  } finally {
    Loading.hide();
  }
});
</script>
