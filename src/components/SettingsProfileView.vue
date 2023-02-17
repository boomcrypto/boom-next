<template>
  <q-card flat class="boom-bg" style="height: 74vh">
    <div class="banner"></div>
    <div class="text-center q-mb-lg">
      <q-avatar size="220px" style="margin-top: -133px">
        <img src="/appicons/profile_2019.jpg" style="border-radius: 100px" />
      </q-avatar>
    </div>
    <q-scroll-area class="fit">
      <div class="boom-title text-bold text-h6">Personal</div>
      <q-card-section class="q-gutter-md text-center q-pt-none">
        <q-input
          rounded
          outlined
          dense
          v-model="name"
          type="text"
          label="Name"
        />
        <q-input
          rounded
          outlined
          dense
          v-model="familyName"
          type="text"
          label="Family name"
        />
        <q-input
          rounded
          outlined
          dense
          v-model="description"
          type="textarea"
          label="Description"
        />
        <q-input
          rounded
          outlined
          dense
          v-model="website"
          type="text"
          label="Web site"
        >
          <template #append>
            <q-icon name="add" />
          </template>
        </q-input>
      </q-card-section>
      <div class="boom-title text-bold text-h6">Social</div>
      <q-card-section class="q-gutter-md text-center q-pt-none">
        <q-input
          rounded
          outlined
          dense
          v-model="svcname"
          type="text"
          label="Name"
          hint="Twitter, Telegram, etc"
        />
        <q-input
          rounded
          outlined
          dense
          v-model="svcidentifier"
          type="text"
          label="Identifier"
          hint="Your handle"
        />
        <q-input
          rounded
          outlined
          dense
          v-model="svcproof"
          type="text"
          label="Proof"
          hint="URL to proof"
        />
        <q-input
          rounded
          outlined
          dense
          v-model="svcproofsig"
          type="text"
          label="Proof signature"
          hint="Signed message"
        />
      </q-card-section>
      <div class="boom-title text-bold text-h6">Crypto</div>
      <q-card-section class="q-gutter-md text-center q-pt-none">
        <q-input
          rounded
          outlined
          dense
          v-model="bitcoin"
          type="text"
          readonly
        />
        <q-input rounded outlined dense v-model="stacks" type="text" readonly />
        <q-input
          rounded
          outlined
          dense
          v-model="lightning"
          type="text"
          readonly
        />
        <q-input rounded outlined dense v-model="ethereum" type="text" />
      </q-card-section>
    </q-scroll-area>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useSettingsStore } from "src/stores/settings";

const settingsStore = useSettingsStore();

const name = ref("");
const familyName = ref("");
const description = ref("");
const website = ref([]);
const services = ref([]);
const ethereum = ref("");
</script>

<style scoped>
.banner {
  background: url("/banners/felix-mittermeier-L4-16dmZ-1c-unsplash.jpg");
  background-size: cover;
  width: 100%;
  height: 200px;
  display: block;
}
</style>
