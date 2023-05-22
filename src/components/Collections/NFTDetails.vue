<template>
  <div>{{ nft }}</div>
</template>

<script setup>
const props = defineProps({
  nft: {
    type: Object,
    required: true,
  },
});

const nft = ref(props.nft);
</script>
