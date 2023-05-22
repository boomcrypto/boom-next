<template>
  <CollectionsEmptyView v-if="!error && !ords.length" />
  <q-infinite-scroll v-else @load="loadMoreOrds" :offset="250" class="row wrap">
    <div
      class="col-xs-12 col-sm-4 col-md-3 q-pa-sm"
      v-for="nft in ordList"
      :key="nft.id"
    >
      <OrdViewCard :nft="nft" />
    </div>
  </q-infinite-scroll>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useNFTStore } from "@stores/nfts";
import { storeToRefs } from "pinia";
import OrdViewCard from "./OrdViewCard.vue";
import CollectionsEmptyView from "./CollectionsEmptyView.vue";
import { Loading } from "quasar";
import { date } from "quasar";

const nftStore = useNFTStore();
const { ords } = storeToRefs(nftStore);
const page = ref(0);
const ordList = ref([]);
const error = ref(false);

function loadMoreOrds(index, done) {
  console.log("loadMoreOrds", index);
  try {
    page.value++;
    ordList.value.push(...ords.value[index - 1]);
  } catch (error) {
    console.log(error);
  } finally {
    done();
  }
}

onBeforeMount(async () => {
  try {
    const timestamp = Date.now();
    console.log(
      "its been : ",
      date.getDateDiff(timestamp, nftStore.ordsLoaded?.value, "minutes"),
      " minutes since last load"
    );
    Loading.show();
    if (
      nftStore.ordsLoaded?.value &&
      date.getDateDiff(timestamp, nftStore.ordsLoaded?.value, "minutes") < 5
    )
      return;
    await nftStore.getOrdinals();
  } catch (error) {
    error.value = true;
    console.log(error);
  } finally {
    Loading.hide();
  }
});
</script>
