<template>
  <q-card flat class="boom-bg" v-if="!showEditView">
    <div class="banner" style="position: sticky"></div>
    <q-toolbar
      style="position: sticky; padding: 4px; margin-top: -100px"
      class="text-center"
    >
      <q-card class="full-width bg-transparent no-shadow no-border" style="margin-top: 7rem;">
        <div class="column absolute-bottom-left">
          <img src="/appicons/avatar.jpg" class="avatar"/>
          <div class="block">
            Trajan Reputation:
            <q-rating
              v-model="trajenModel"
              size="1.5em"
              color="grey"
              :color-selected="ratingColors"
              class="q-mb-sm"
            />
          </div>
        </div>
        <q-card-section class="col-12 text-center q-pa-none">
          <div class="text-bold text-h6">Dan Trevino</div>
          <div class="title">Founder of Boom Crypto</div>
          <q-chip
            icon="img:/appicons/map-pin.svg"
            class="q-mx-none"
            label="Dallas, Tx"
          />

          <q-btn
            no-caps
            unelevated
            outline
            color="grey-3"
            text-color="black"
            icon="edit" class="float-right"
            label="Edit Profile"
            @click="handleEditProfile"
            style="margin-top: -40px"
          />
        </q-card-section>
      </q-card>
    </q-toolbar>
    <div class="full-width q-col-gutter-sm q-mt-xs text-center">
      <q-icon
        size="lg"
        name="img:/appicons/social-icon-nostr.svg"
      />
      <q-icon
        size="lg"
        name="img:/appicons/social-icon-github.svg"
      />
      <q-icon
        size="lg"
        name="img:/appicons/social-icon-twitter.svg"
      />
      <q-icon
        size="lg"
        name="img:/appicons/social-icon-zap.svg"
      />
    </div>
    <div class="full-width rounded-borders">
      <div class="boom-title text-bold text-h6">Bio</div>
      <div>{{ description }}</div>
    </div>
  </q-card>
  <q-card flat class="boom-bg" v-else>
    <div class="banner" style="position: sticky"></div>
    <q-toolbar
      style="position: sticky; padding: 4px; margin-top: -100px"
      class="text-center"
    >
      <img src="/appicons/avatar.jpg" class="avatar"/>
      <q-space/>
      <div class="column" style="margin-top: 70px; margin-left: -58px">
        <div class="text-bold text-h6">Dan Trevino</div>
        <div class="title">Founder of Boom Crypto</div>
        <q-chip
          icon="img:/appicons/map-pin.svg"
          class="q-mx-none"
          label="Dallas, Tx"
        />
      </div>
      <q-space/>
      <q-btn
        no-caps
        unelevated
        outline
        color="grey-3"
        text-color="black"
        icon="edit"
        label="Edit Profile"
        @click="handleEditProfile"
        style="margin-top: 50px"
      />
    </q-toolbar>
    <div class="full-width text-center">
      <q-icon
        size="lg"
        class="q-mr-md"
        name="img:/appicons/social-icon-nostr.svg"
      />
      <q-icon
        size="lg"
        class="q-mr-md"
        name="img:/appicons/social-icon-github.svg"
      />
      <q-icon
        size="lg"
        class="q-mr-md"
        name="img:/appicons/social-icon-twitter.svg"
      />
      <q-icon
        size="lg"
        class="q-mr-md"
        name="img:/appicons/social-icon-zap.svg"
      />
    </div>

    <div class="boom-title text-bold text-h6">Personal</div>
    <q-card-section class="q-gutter-md text-center q-pt-none">
      <q-input
        rounded
        outlined
        dense
        v-model="editName"
        type="text"
        label="Name"
      />
      <q-input
        rounded
        outlined
        dense
        v-model="editFamilyName"
        type="text"
        label="Family name"
      />
      <q-input
        rounded
        outlined
        dense
        v-model="editDescription"
        type="textarea"
        label="Description"
      />
      <q-input
        rounded
        outlined
        dense
        v-model="editWebsites"
        type="text"
        label="Web site"
      >
        <template #append>
          <q-icon name="add"/>
        </template>
      </q-input>
    </q-card-section>
    <div class="boom-title text-bold text-h6">Social</div>
    <q-card-section class="q-gutter-md text-center q-pt-none">
      <q-input
        rounded
        outlined
        dense
        v-model="editSvcs.name"
        type="text"
        label="Name"
        hint="Twitter, Telegram, etc"
      />
      <q-input
        rounded
        outlined
        dense
        v-model="editSvcs.identifier"
        type="text"
        label="Identifier"
        hint="Your handle"
      />
      <q-input
        rounded
        outlined
        dense
        v-model="editSvcs.proof"
        type="text"
        label="Proof"
        hint="URL to proof"
      />
      <q-input
        rounded
        outlined
        dense
        v-model="editSvcs.proofsig"
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
        v-model="editBitcoin"
        type="text"
        readonly
      />
      <q-input
        rounded
        outlined
        dense
        v-model="editStacks"
        type="text"
        readonly
      />
      <q-input
        rounded
        outlined
        dense
        v-model="editLightning"
        type="text"
        readonly
      />
      <q-input rounded outlined dense v-model="editEthereum" type="text"/>
    </q-card-section>
    <q-card-actions align="between">
      <q-btn flat label="Cancel" @click="handleCancelUpdate"/>
      <q-btn flat label="Update Profile" @click="handleUpdateProfile"/>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@stores/user";

const userStore = useUserStore();

const showEditView = ref(false);
const editName = ref("");
const editFamilyName = ref("");
const editDescription = ref("");
const editWebsites = ref([]);
const editSvcs = ref([]);
const editEthereum = ref("");
const editBitcoin = ref("");
const editStacks = ref("");
const editLightning = ref("");
const trajenModel = ref(5);
const ratingColors = ref([
  "light-green-3",
  "light-green-6",
  "green",
  "green-6",
  "green-10",
]);

async function handleEditProfile() {
  showEditView.value = true;
}

function handleCancelUpdate() {
  editName.value = "";
  editFamilyName.value = "";
  editDescription.value = "";
  editWebsites.value = [];
  editSvcs.value = [];
  editEthereum.value = "";
  editBitcoin.value = "";
  editStacks.value = "";
  editLightning.value = "";
  showEditView.value = false;
}

function handleUpdateProfile() {
  alert("All data is public warning. Update profile");
}
</script>

<style scoped>
.banner {
  background: url("/banners/felix-mittermeier-L4-16dmZ-1c-unsplash.jpg");
  background-size: cover;
  width: 100%;
  height: 200px;
  display: block;
}

.avatar {
  display: block;
  border-radius: 200px;
  box-sizing: border-box;
  background-color: white;
  border: 5px solid white;
  height: 200px;
  width: 200px;
}
</style>
