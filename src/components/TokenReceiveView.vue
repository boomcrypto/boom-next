<script setup>
import { computed, ref } from "vue";
import VueQrcode from "@chenfengyuan/vue-qrcode";

const address = ref("SP3J2GVMMM2R07ZFBJDWTYEYAR8FZH5WKDTFJ9AHA");

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(address);
    this.$q.notify({
      message: "Address copied to clipboard",
      color: "accent",
    });
  } catch (err) {
    Alert("Failed to copy: ", err);
  }
}
</script>
<template>
  <q-card flat class="boom-card">
    <q-card-section class="q-pa-none text-center">
      <figure class="qrcode" style="margin: auto">
        <vue-qrcode
          value="https://github.com/fengyuanchen"
          tag="svg"
          :options="{
            errorCorrectionLevel: 'Q',
            width: 300,
          }"
        ></vue-qrcode>
        <img
          class="qrcode__image"
          src="/icons/icon-128x128.png"
          alt="Boom Logo"
        />
      </figure>
    </q-card-section>
    <q-card-section
      class="address text-center q-pt-none"
      @click="copyToClipboard"
      ><div>{{ address }} <img src="/appicons/copy.svg" /></div>
    </q-card-section>
    <q-card-section class="warning-modal q-pt-none text-center"
      >Only send Stacks or SIP-10 compantible tokens to this address. Always
      verify addresses. Not responsible for any loss of funds.
    </q-card-section>
  </q-card>
</template>
<style scoped>
.qrcode {
  display: inline-block;
  font-size: 0;
  margin-bottom: 0;
  position: relative;
}

.qrcode__image {
  background-color: #fff;
  border: 0.25rem solid #fff;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  height: 15%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 15%;
}
</style>
