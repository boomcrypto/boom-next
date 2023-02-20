<template>
  <q-page padding>
    <CollectionsView v-if="items.length" :items="items" />
    <CollectionsEmptyView v-else />
  </q-page>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useNFTStore } from "@stores/nfts";
import CollectionsView from "src/components/CollectionsView.vue";
import CollectionsEmptyView from "src/components/CollectionsEmptyView.vue";
// import { computed, onBeforeMount } from "vue";
// import { useQuasar } from "quasar";

const nftStore = useNFTStore();
const { items } = storeToRefs(nftStore);
// const { fetchAll } = nftStore;
// const $q = useQuasar();

// onBeforeMount(async () => {
//   console.log("onBeforeMount");
//   $q.loading.show({ message: "Loading..." });
//   await fetchAll();
//   $q.loading.hide();
// });
</script>
