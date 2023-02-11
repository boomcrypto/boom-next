<script setup>
const props = defineProps({
  title: String,
  disable: Boolean,
  type: String,
  to: String,
});
</script>

<template>
  <q-btn
    unelevated
    no-caps
    class="q-pa-sm boom-button"
    :disable="disable"
    :to="to ? to : null"
    @click="$emit('click')"
  >
    <div class="boom-button-text">
      {{ title }}
    </div>
  </q-btn>
</template>
<style scoped></style>
