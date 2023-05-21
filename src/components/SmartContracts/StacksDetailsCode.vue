<script setup>
import { toRefs } from "vue";

const props = defineProps({
  contract: {
    type: Object,
    required: true,
  },
});

const { contract } = toRefs(props);

const { smart_contract, tx_id, tx_status } = contract.value;
</script>
<template>
  <q-card class="bg-boom">
    <div contenteditable>
      {{ smart_contract.source_code }}
    </div>
  </q-card>
</template>
