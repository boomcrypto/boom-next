<template>
  <div>
    <q-card v-if="!view" flat class="boom-border cursor-pointer">
      <q-skeleton :style="imgSize" type="rect" />
    </q-card>
    <q-card
      v-else
      :flat="!hover"
      class="boom-border cursor-pointer"
      :class="hover ? 'boom-shadow' : ''"
      @mouseover="hover = true"
      @mouseout="hover = false"
      @click="handleClick"
    >
      <div v-if="displayType === 'anim'">
        <video loop autoplay muted controls :poster="view.image" width="100%">
          <source :src="displayAnimiationUrl" />
        </video>
      </div>
      <div v-else-if="displayType === 'audio'">
        <audio loop controls :poster="view.image" width="100%">
          <source :src="displayAnimiationUrl" />
        </audio>
      </div>
      <div v-else-if="displayType === 'text'">
        <q-img
          loading="lazy"
          :ratio="3 / 4"
          crossorigin="anonymous"
          src="/appicons/satsname.jpg"
          spinner-color="primary"
          :alt="satsname"
          style="border-radius: 4px"
          cover
        >
          <div
            class="collectible-name full-width absolute-bottom ellipsis 2-lines"
          >
            {{ satsname }}
          </div>
        </q-img>
      </div>
      <div v-else>
        <q-img
          loading="lazy"
          :ratio="3 / 4"
          crossorigin="anonymous"
          :src="imgUrl"
          :img-class="view.displayClass"
          spinner-color="primary"
          :alt="view.name"
          style="border-radius: 4px"
          cover
        >
          <div
            class="collectible-name full-width absolute-bottom ellipsis 2-lines"
          >
            {{ view.name }}
          </div>
        </q-img>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { toCommonURL } from "@common/utils";
import { BOOM_CONFIG } from "src/config";

const $q = useQuasar();
// eslint-disable-next-line vue/no-setup-props-destructure
const { nft } = defineProps({
  nft: {
    type: Object,
    required: true,
  },
});

const hover = ref(false);
const contractAddress = ref("");
const contractName = ref("");
const title = ref("");
const satsname = ref("");
const creator = ref("");
const verifiedCreator = ref({});
const type = ref("");
const loading = ref(false);
const view = ref(null);

const imgSize = computed(() => {
  return (window.screen.availHeight - 209) / 2;
  // if ($q.screen.xs) {
  //   return { height: "370px", width: "370px" };
  // } else if ($q.screen.sm) {
  //   return { height: "148px", width: "148px" };
  // } else {
  //   return { height: "292px", width: "292px" };
  // }
});

const imgUrl = computed(() => {
  return `https://inscribe.news/api/content/${nft.id}`;
});

async function getSatsName() {
  const registration = await fetch(
    `https://inscribe.news/api/content/${nft.id}`
  );
  const registrationJson = await registration.json();
  return registrationJson.name;
}

const displayType = computed(() => {
  if (nft.content_type.startsWith("video")) {
    return "anim";
  } else if (nft.content_type.startsWith("audio")) {
    return "audio";
  } else if (nft.content_type.startsWith("text")) {
    return "text";
  }
  return "img";
});

onMounted(async () => {
  loading.value = true;
  view.value = await getNFT();
  const registration = await fetch(
    `https://inscribe.news/api/content/${nft.id}`
  );
  const registrationJson = await registration.json();
  satsname.value = registrationJson.name;
  loading.value = false;
});

/**
 * @dev Handle click on card
 * @param none
 * @returns {void}
 * @private
 * @memberof BoomSeriesCard
 * If a series length is < 2, then it is a single collectible, send
 * user directly to that collectible
 * If a series length is > 1, then it is a series, send user to series
 * */
function handleClick() {
  const id = this.nfts.findIndex(
    (nft) =>
      nft.assetId === this.nft.assetId && nft.contractId === this.nft.contractId
  );
  this.$router.push({ name: "NFTDetails", params: { nft: this.view } });
}

async function getNFT() {
  return nft;
}
</script>

<style scoped></style>
