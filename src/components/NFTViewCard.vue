<template>
  <div>
    <q-card v-if="!view" flat class="boom-card cursor-pointer">
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
          :ratio="3 / 4"
          crossorigin="anonymous"
          :src="view.image"
          :img-class="view.displayClass"
          spinner-color="primary"
          height="imgSize"
          :alt="view.name"
          style="border-radius: 4px"
        >
          <div class="collectible-name full-width absolute-bottom">
            {{ view.name }}
          </div>
        </q-img>
      </div>
    </q-card>
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
  const id = this.nfts.findIndex(
    (nft) =>
      nft.assetId === this.nft.assetId && nft.contractId === this.nft.contractId
  );
  this.$router.push({ name: "NFTDetails", params: { nft: this.view } });
}

async function getNFT() {
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

<style scoped></style>
