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
      <div v-else>
        <q-img
          loading="lazy"
          :ratio="1"
          crossorigin="anonymous"
          :src="view.image"
          :img-class="view.displayClass"
          spinner-color="primary"
          :alt="view.name"
          style="border-radius: 4px"
          :height="`imgSize`"
          contain
        >
          <div
            class="collectible-name full-width absolute-bottom ellipsis 2-lines"
          >
            {{ view.name }}
          </div>
        </q-img>
      </div>
    </q-card>
    <q-dialog v-model="showDialog" persistent maximized>
      <q-card flat>
        <q-toolbar class="bg-white text-black">
          <q-btn
            flat
            round
            dense
            icon="img:/appicons/back-arrow-without-background.svg"
            @click="handleCloseDetails"
          />
          <q-toolbar-title> {{ view.collection }} </q-toolbar-title>
        </q-toolbar>
        <q-card-section horizontal class="q-pa-none">
          <q-card-section class="col-6">
            <q-img
              :src="view.image"
              :ratio="1"
              spinner-color="primary"
              spinner-size="82px"
              contain
            />
          </q-card-section>
          <q-card-section class="col-6 column justify-start">
            <div class="text-h6 col">{{ view.name }}</div>
            <div class="text-body1 col">{{ view.description }}</div>
            <ul class="col">
              <template v-for="(value, key) in view.properties" :key="key">
                <div class="row">
                  <div class="text-h6 text-capitalize">
                    {{ propName(key) }}:
                  </div>
                  <div class="text-capitalize">{{ value }}</div>
                </div>
              </template>
            </ul>
          </q-card-section>
        </q-card-section>
        <q-card-actions align="right">
          <!-- <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Turn on Wifi" color="primary" v-close-popup /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  destructAssetClass,
  constructBadgeNFT,
  constructBnsNFT,
  constructBoomboxNFT,
  constructOldBoomNFT,
  constructNewBoomNFT,
  constructNFT,
  constructStacksArtNFT,
  constructFreePunkNFT,
  isCIDAssetClass,
} from "@common/nft";
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
const image = ref("");
const title = ref("");
const seriesName = ref("");
const creator = ref("");
const verifiedCreator = ref({});
const type = ref("");
const loading = ref(false);
const view = ref(null);
const showDialog = ref(false);

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

const displayType = computed(() => {
  try {
    if (view.value.animation_url || view.value.video || view.value.audio) {
      return "anim";
    } else {
      return "img";
    }
  } catch (e) {
    return "img";
  }
});

const displayAnimiationUrl = computed(() => {
  if (view.value.hasOwnProperty("animation_url")) {
    return toCommonURL(view.value.animation_url);
  } else if (view.value.hasOwnProperty("video")) {
    return toCommonURL(view.value.video);
  } else if (view.value.hasOwnProperty("audio")) {
    return toCommonURL(view.value.audio);
  } else {
    return "";
  }
});

onMounted(async () => {
  loading.value = true;
  view.value = await getNFT();
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
  showDialog.value = true;
}

function handleCloseDetails() {
  showDialog.value = false;
}

function propName(kal) {
  if (kal) {
    return kal.replace(/_/g, " ");
  } else {
    return kal;
  }
}

async function getNFT() {
  console.log("getNFT", nft.value);

  const { contractId } = destructAssetClass(nft);
  const BBContracts = BOOM_CONFIG.BOOMBOX_CONTRACTS.map((c) => c.contractId);

  if (BOOM_CONFIG.BOOM_NFT_V1.includes(contractId)) {
    return await constructOldBoomNFT(nft);
  } else if (BOOM_CONFIG.BOOM_NFT_V2.includes(contractId)) {
    return await constructNewBoomNFT(nft);
  } else if (BBContracts.includes(contractId)) {
    return await constructBoomboxNFT(nft);
  } else if (BOOM_CONFIG.BADGES_CONTRACT_ID === contractId) {
    return await constructBadgeNFT(nft);
  } else if (BOOM_CONFIG.STACKS_ARTS_CONTRACTS.includes(contractId)) {
    return await constructStacksArtNFT(nft);
  } else if (BOOM_CONFIG.BNS_CONTRACT_ID === contractId) {
    return await constructBnsNFT(nft);
  } else if (BOOM_CONFIG.FREE_PUNKS_CONTRACT === contractId) {
    return await constructFreePunkNFT(nft);
  } else {
    return await constructNFT(nft);
  }

  //   const assetIdCV = hexToCV(this.nft.value.hex);
  //   let assetId;
  //   if (assetIdCV.type !== ClarityType.UInt) {
  //     assetId = -999;
  //   } else {
  //     assetId = new BN(assetIdCV.value).toNumber();
  //   }
}
</script>

<style scoped>
ul {
  list-style-type: none; /* Remove bullets */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
}
</style>
