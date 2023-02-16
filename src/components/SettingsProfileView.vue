<template>
  <q-card flat class="boom-bg text-center">
    <div class="banner"></div>
    <q-avatar size="220px" style="margin-top: -133px">
      <img src="/appicons/profile_2019.jpg" style="border-radius: 100px" />
    </q-avatar>
    <q-form class="text-center">
      <q-card-section>
        <div class="boom-title">Personal</div>
        <q-input rounded v-model="name" type="text" label="Name" />
        <q-input rounded v-model="familyName" type="text" label="Family name" />
        <q-input
          rounded
          v-model="description"
          type="textarea"
          label="Description"
        />
        <q-input rounded v-model="website" type="text" label="Web site">
          <template #append>
            <q-icon name="add" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <div class="boom-title">Social</div>
        <q-input
          v-model="svcname"
          type="text"
          label="Name"
          hint="Twitter, Telegram, etc"
        />
        <q-input
          v-model="svcidentifier"
          type="text"
          label="Identifier"
          hint="Your handle"
        />
        <q-input
          v-model="svcproof"
          type="text"
          label="Proof"
          hint="URL to proof"
        />
        <q-input
          v-model="svcproofsig"
          type="text"
          label="Proof signature"
          hint="Signed message"
        />
      </q-card-section>
      <q-card-section>
        <div class="boom-title">Crypto</div>
        <q-input v-model="bitcoin" type="text" readonly />
        <q-input v-model="stacks" type="text" readonly />
        <q-input v-model="lightning" type="text" readonly />
        <q-input v-model="ethereum" type="text" />
      </q-card-section>
    </q-form>
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
