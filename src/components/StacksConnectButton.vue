<script setup>
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "stores/user";
import { shortAddress } from "src/common/utils";

const userStore = useUserStore();

const { loggedIn, stxAddress, username, avatar } = storeToRefs(userStore);
const { login, logout } = userStore;

const signIn = () => {
  login();
};

const signOut = () => {
  logout();
};
</script>

<template>
  <q-btn
    unelevated
    rounded
    no-caps
    color="white"
    class="q-pr-none q-py-none"
    text-color="black"
    v-if="loggedIn"
  >
    <template #default>
      <div
        class="row bg-transparent"
        style="height: 42px; border-radius: 50px"
        :style="`background-image: url('${avatar}')`"
      >
        <span
          class="text-body1 q-px-sm text-bold text-black"
          style="padding-top: 11px"
          >{{ username }}</span
        >
        <img :src="avatar" style="height: 40px; float: right" />
      </div>
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
    </template>
  </q-btn>
  <q-btn
    unelevated
    rounded
    color="white"
    text-color="black"
    v-else
    label="Login"
    icon-right="img:/appicons/login.svg"
    @click="signIn()"
  />
</template>

<style scoped></style>
