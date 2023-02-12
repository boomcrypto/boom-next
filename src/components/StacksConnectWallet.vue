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
  userSession.isUserSignedIn() ? "Unexplained.btc" : "Login"
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
    class="row cursor-pointer"
    style="height: 42px; border-radius: 50px; border: 1px solid #e5e7eb"
    :style="hover ? 'background-color: #e5e7eb' : 'background-color: #f5f5f5'"
    @onmouseover="hover = true"
    @onmouseout="hover = false"
  >
    <span class="text-body1 q-pa-sm text-bold text-black">{{ buttonMsg }}</span>
    <img :src="buttonIcon" width="40" />
  </div>
</template>

<style scoped></style>
