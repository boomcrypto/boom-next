<template>
  <q-page padding>
    <q-card-actions vertical align="center" class="absolute-center">
      <q-btn no-caps flat label="Generate a new key" @click="handleNewKey" />
      <q-btn no-caps flat label="I already have a key" @click="handleHaveKey" />
    </q-card-actions>
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function handleNewKey() {
  router.push({ name: "NewKey" });
}

function handleHaveKey() {
  router.push({ name: "ExistingKey" });
}
</script>

<style></style>
