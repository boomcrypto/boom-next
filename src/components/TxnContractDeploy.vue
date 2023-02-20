<template>
  <q-item>
    <q-item-section top avatar>
      <q-avatar color="primary" text-color="white" icon="bluetooth" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Contract Deploy</q-item-label>
      <q-item-label caption lines="2">{{ tx_id }}</q-item-label>
    </q-item-section>
    <q-item-section side top>
      <q-item-label caption>5 min ago</q-item-label>
      <q-icon name="star" color="yellow" />
    </q-item-section>
  </q-item>
</template>

<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
  tx: {
    type: Object,
    required: true,
  },
});

const { tx } = toRefs(props);
const { tx_id, tx_type, fee_rate, status } = toRefs(tx);
</script>
