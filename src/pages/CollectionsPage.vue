<template>
  <q-page padding>
    <q-card flat class="boom-card q-mx-auto" style="width: 1080px">
      <div class="row items-start justify-between">
        <div
          class="col-xs-12 col-sm-6 col-md-3 boom-border q-mb-sm q-pa-xs"
          :class="$q.screen.gt.md ? 'q-mx-xs' : ''"
          v-for="(nft, index) in 17"
          :key="index"
        >
          <q-card class="my-card">
            <q-img
              src="https://cdn.quasar.dev/img/mountains.jpg"
              :ratio="3 / 4"
            >
              <div class="text-h6">Our Changing Planet</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-img>
          </q-card>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
};
</script>
