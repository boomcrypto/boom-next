<script setup>
import BoomFooter from "@components/Layout/BoomFooter.vue";
import BoomHeader from "@components/Layout/BoomHeader.vue";
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-transparent" height-hint="123">
      <BoomHeader />
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <BoomFooter />
  </q-layout>
</template>

<style scoped>
.boom-button {
  background: radial-gradient(
    171.19% 151.33% at -35.42% -28.71%,
    #f26ab2 28.65%,
    #b64fc6 77.69%,
    #a748cb 100%
  );
  box-shadow: 0 8px 16px -8px rgba(167, 72, 203, 0.5);
  border-radius: 100px;
  min-width: 94px;
  color: #fafafa;
}
.tabname {
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.02em;
  color: #0e0a0a;
  font-weight: 600;
}
</style>
