<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { userSession } from "./boot/stacks";
import { useUserStore } from "@stores/user";
import { useRoute } from "vue-router";

const userStore = useUserStore();

const route = useRoute();

onMounted(async () => {
  if (userSession.isUserSignedIn()) {
    const userData = userSession.loadUserData();
    userStore.setUser(userData);
  } else if (userSession.isSignInPending()) {
    const userData = await userSession.handlePendingSignIn();
    userStore.setUser(userData);
  } else {
    route.push({ name: "Login" });
  }
});
</script>
