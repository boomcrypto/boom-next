<script setup>
import { ref, computed } from "vue";
import { signIn, signOut, userSession } from "../boot/stacks";

const hover = ref(false);
const loggedIn = computed(() => userSession.isUserSignedIn());

const buttonMsg = computed(() =>
  loggedIn.value ? "Unexplained.btc" : "Login"
);

const buttonIcon = computed(() =>
  loggedIn.value ? "/appicons/avatar.png" : "/appicons/login.svg"
);

function handleLoginLogout() {
  if (loggedIn.value) {
    signOut();
  } else {
    signIn();
  }
}
</script>

<template>
  <q-btn unelevated>
    <template #default>
      <div
        class="row cursor-pointer"
        style="height: 42px; border-radius: 50px; border: 1px solid #e5e7eb"
        :style="
          hover ? 'background-color: #e5e7eb' : 'background-color: #f5f5f5'
        "
        @onmouseover="hover = true"
        @onmouseout="hover = false"
      >
        <span class="text-body1 q-pa-sm text-bold text-black">{{
          buttonMsg
        }}</span>
        <img :src="buttonIcon" width="40" />
      </div>
      <q-menu v-if="loggedIn">
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup>
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
</template>

<style scoped></style>
