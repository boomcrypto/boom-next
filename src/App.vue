<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { userSession } from "./boot/stacks";
import { useUserStore } from "./stores/user";

onMounted(async () => {
  const userStore = useUserStore();
  if (userSession.isUserSignedIn()) {
    const userData = await userSession.loadUserData();
    userStore.setUser(userData);
  }
});
</script>
