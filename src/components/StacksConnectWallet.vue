<script setup>
import {showConnect} from "@stacks/connect";
import {userSession} from "../boot/stacks";
import {computed} from "vue";

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
  <q-btn round dense flat color="white" icon="notifications">
    <q-avatar size="32px">
      <img src="https://cdn.quasar.dev/img/boy-avatar.png">
    </q-avatar>
    <q-menu class="no-shadow menu-border"
    >
      <q-card class="no-shadow" style="min-width: 250px">
        <q-card-section class="text-center text-grey-8">
          Logged in as #StackAddress
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="q-pa-sm">
          <q-btn :label="buttonMsg"  @click="handleLoginLogout" rounded outline no-caps icon="logout" class="full-width"></q-btn>
        </q-card-section>
      </q-card>
    </q-menu>
  </q-btn>
<!--  <div-->
<!--    class="row bg-grey-3 text-dark cursor-pointer"-->
<!--    style="height: 36px; border-radius: 50px"-->
<!--    @click="handleLoginLogout"-->
<!--  >-->
<!--    <span class="text-body1 q-pa-sm text-bold">{{ buttonMsg }}</span>-->
<!--    <img :src="buttonIcon" height="36px" />-->
<!--  </div>-->
</template>

<style scoped></style>
