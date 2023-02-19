<template>
  <q-page padding>
    <q-card flat class="boom-card q-mx-auto" style="width: 1080px">
      <div class="row items-start justify-between">
        <div
          class="col-xs-12 col-sm-6 col-md-3 boom-border q-mb-sm q-pa-xs"
          :class="$q.screen.gt.md ? 'q-mx-xs' : ''"
          v-for="(nft, index) in items"
          :key="index"
        >
          <q-card class="my-card">
            <q-img :src="nft.image" :ratio="3 / 4">
              <div class="absolute-bottom">
                <div class="text-h6">{{ nft.title }}</div>
                <div class="text-subtitle2">{{ nft.creator }}</div>
              </div>
            </q-img>
          </q-card>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useNFTStore } from "@stores/nfts";
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
