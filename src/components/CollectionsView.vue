<template>
  <q-card
    flat
    class="boom-card"
    style="max-width: 1080px; border-radius: 24px; height: 80vh; margin: auto"
  >
    <div class="row items-start q-gutter-xs">
      <div
        class="col-xs-12 col-sm-6 col-md-3 boom-border q-mb-sm q-pa-xs"
        v-for="(nft, index) in displayItems"
        :key="index"
      >
        <q-card class="boom-card">
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { toRefs, ref, computed } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const { items } = toRefs(props);
const page = ref(0);

const displayItems = computed(() => {
  return items.value[page.value];
});
</script>
