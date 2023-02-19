<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { userSession } from "./boot/stacks";
import { useUserStore } from "@stores/user";

const userStore = useUserStore();

onMounted(async () => {
  if (userSession.isUserSignedIn()) {
    const userData = await userSession.loadUserData();
    userStore.setUser(userData);
  }
});
</script>
