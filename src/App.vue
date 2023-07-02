<template>
  <router-view />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@stores/user";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const $q = useQuasar();

const key = ref(null);

onMounted(async () => {
  try {
    const key = $q.localStorage.getItem("key");
    if (key) {
      // await this.initAccount();
      router.push({ name: "Wallet" });
    } else {
      router.push({ name: "Login" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<style>
html {
  color: #27261e;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  -moz-font-feature-settings: "liga" on;
  font-feature-settings: "liga" on;
  scroll-behavior: smooth;
}
::-webkit-scrollbar {
  display: none;
}

.html::-webkit-scrollbar {
  display: none;
}
</style>
