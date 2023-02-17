<script setup>
import { ref, computed } from "vue";
import { userSession } from "../boot/stacks";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const hover = ref(false);
// const loggedIn = computed(() => userSession.isUserSignedIn());
const loggedIn = ref(userStore.loggedIn);
</script>

<template>
  <q-btn
    unelevated
    rounded
    color="white"
    text-color="black"
    v-if="loggedIn"
    :label="userStore.username"
    :icon="`img:${userStore.avatar || '/appicons/avatar.png'}`"
    @click="signOut()"
  >
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup @click="signOut()">
          <q-item-section>Sign Out</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-close-popup>
          <q-item-section>Other menu option</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
  <q-btn
    unelevated
    rounded
    color="white"
    text-color="black"
    v-else
    label="Login"
    icon="img:/appicons/login.svg"
    @click="signIn()"
  />
</template>

<style scoped></style>
