<template>
  <q-card flat class="boom-bg" style="max-width: 1080px">
    <q-card-section class="q-pt-none">
      <q-input
        v-model="nostr"
        dense
        outlined
        type="text"
        label="Nostr PUBLIC key ... never share your private key!"
        hint="hex or npub address"
        class="q-mb-md"
      />
      <q-input
        v-model="nostrname"
        dense
        outlined
        type="text"
        label="Desired Name"
        :hint="`request ${nostrname}@boom.money`"
      />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        flat
        clickable
        class="boom-button"
        label="Register"
        :loading="nostrloading"
        :disable="!qualifyForNostr"
        @click="createNip05"
      />
      <q-inner-loading :showing="!qualifyForNostr">
        <template #default>
          <div class="boom-card-title text-accent">
            Boombox holders can register their own<br />
            @boom.money Nostr names. Get a boombox
          </div>
        </template>
      </q-inner-loading>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, computed } from "vue";

const nostr = ref("");
const nostrname = ref("");
const nostrloading = ref(false);

const qualifyForNostr = computed(() => {
  const currentNFTs = this.raw_nft_events.map(
    (x) => x.asset_identifier.split("::")[0]
  );
  console.log("currentNFTs", currentNFTs);
  const boomboxes = BOOM_CONFIG.boomboxContracts.map((x) => x.contractId);
  console.log("boomboxes", boomboxes);
  const foo = currentNFTs.filter((x) => boomboxes.includes(x)).length;
  console.log("foo", foo);
  return foo > 0;
});
</script>
