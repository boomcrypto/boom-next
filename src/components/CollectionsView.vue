<template>
  <q-card
    flat
    class="boom-card"
    style="max-width: 1080px; border-radius: 24px; height: 80vh; margin: auto"
  >
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
</template>

<script>
export default {
  // name: 'ComponentName',
  setup() {
    return {};
  },
};
</script>
