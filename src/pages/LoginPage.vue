<template>
  <q-page padding>
    <div v-if="!select">
      <q-card-actions vertical align="center" class="absolute-center">
        <q-btn flat label="Generate a new key" @click="handleNewKey" />
        <q-btn flat label="I already have a key" @click="handleHaveKey" />
      </q-card-actions>
    </div>
    <NewAccount v-if="select && newKey" />
    <ExistingAccount v-if="select && !newKey" />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import NewAccount from "components/Account/NewAccount.vue";
import ExistingAccount from "components/Account/Existingaccount.vue";

const newKey = ref(true);
const select = ref(false);

function handleNewKey() {
  newKey.value = true;
  select.value = true;
}

function handleHaveKey() {
  newKey.value = false;
  select.value = true;
}
</script>
