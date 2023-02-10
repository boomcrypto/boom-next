<script setup>
import { showConnect } from "@stacks/connect";
import { userSession } from "../boot/stacks";
import { computed } from "vue";

function authenticate() {
  showConnect({
    appDetails: {
      name: "Boom",
      icon: window.location.origin + "/icons/icon-512x512.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

function disconnect() {
  userSession.signUserOut("/");
}

const buttonMsg = computed(() =>
  userSession.isUserSignedIn() ? "Logout" : "Login"
);

const buttonIcon = computed(() =>
  userSession.isUserSignedIn() ? "/appicons/avatar.png" : "/appicons/login.svg"
);

function handleLoginLogout() {
  if (userSession.isUserSignedIn()) {
    disconnect();
  } else {
    authenticate();
  }
}
</script>

<template>
  <div
    class="row bg-grey-3 text-dark cursor-pointer"
    style="height: 36px; border-radius: 50px"
    @click="handleLoginLogout"
  >
    <span class="text-body1 q-pa-sm text-bold">{{ buttonMsg }}</span>
    <img :src="buttonIcon" height="36px" />
  </div>
</template>

<style scoped></style>
