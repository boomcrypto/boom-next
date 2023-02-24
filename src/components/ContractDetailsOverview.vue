<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
  contract: {
    type: Object,
    required: true,
  },
});

const { contract } = toRefs(props);
</script>
<template>
  <q-card flat class="bg-boom">
    <q-card-section> Overview </q-card-section>
    <q-card-section>
      {{ contract }}
    </q-card-section>
  </q-card>
</template>
