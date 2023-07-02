<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const secretKey = ref("0 1 2 3 4 5 6 7 8 9 0");
const keypw1 = ref(null);
const keypw2 = ref(null);

const router = useRouter();
const $ = useQuasar();

const passwordIsEight = computed(() => {
  return keypw1.value?.length >= 8 || keypw1.value === null;
});

const passwordsAreEqual = computed(() => {
  if (keypw1.value !== null) {
    return keypw1.value === keypw2.value && keypw1.value?.length >= 8;
  } else {
    return true;
  }
});

onMounted(() => {
  $.loading.show({
    delay: 0,
    message: "Generating wallet...",
  });
  setTimeout(() => {
    $.loading.hide();
  }, 1000);
});

function goBack() {
  router.push({ name: "Login" });
}

async function handleGenerateWallet() {
  //TODO: encrypt mnemonic with password
  try {
    router.push({ name: "Wallet" });
  } catch (e) {
    console.log("error creating wallet: ", e);
  }
}
</script>

<template>
  <q-page padding>
    <q-card flat class="column justify-center">
      <q-card flat class="boom-card">
        <div class="boom-card-title">Secret Key</div>
        {{ secretKey }}
      </q-card>
      <q-card flat class="q-mt-xl boom-card">
        Save your secret key and enter a password below:
        <q-card-section>
          <q-input
            v-model="keypw1"
            type="password"
            label="Password"
            :error="!passwordIsEight"
            error-message="Password should be at least 8 characters."
            no-error-icon
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="keypw2"
            type="password"
            label="Re-enter Password"
            :error="!passwordsAreEqual"
            error-message="Passwords do not match."
            no-error-icon
          />
        </q-card-section>
      </q-card>
      <q-card-actions>
        <q-btn
          outlined
          unelevated
          no-caps
          class="q-pa-sm full-width webby-card-button boom-gradient"
          :disable="!passwordsAreEqual"
          @click="handleGenerateWallet"
        >
          <template #default>
            <div class="webby-button-text">Create wallet</div>
          </template>
        </q-btn>
        <q-btn
          no-caps
          outlined
          unelevated
          color="accent"
          class="boom-card-button full-width"
          @click="goBack"
        >
          <template v-slot:default>
            <div class="boom-button-text">Cancel</div>
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style></style>
