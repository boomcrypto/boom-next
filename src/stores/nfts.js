import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { useNetworkStore } from "./network";
import { useUserStore } from "./user";
import ASSET_PAGE_LIMIT from "../constants/index";

const networkStore = useNetworkStore();
const userStore = useUserStore();

export interface NFT {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
}

export const useNFTStore = defineStore({
  id: "nfts",

  state: () => ({
    items: {},
    ids: [],
    loaded: false,
  }),

  actions: {
    async fetchAll() {
      if (loaded) return;
      const offset = 0;
      const res = await getNFTsPaginated(userStore.address);
      console.log(res);
    },
  },

  getters: {
    getBoomboxes() {
      return this.items.filter((item) => item.name === "boombox");
    },
  },
});

const getNftsByPage = async (principal, page) => {
  const offset = page * ASSET_PAGE_LIMIT;
  const response = await fetch(
    `${networkStore.apiUrl}/extended/v1/tokens/nft/holdings?principal=${userStore.address}?limit=${ASSET_PAGE_LIMIT}&offset=${offset}&unachored=true&tx_metadata=true`
  );
  return await response.json();
};

/**
 * Generator function that iterates & paginates over assets.
 *
 * @param {string} principal token that represents the entity that owns the assets.
 */
async function* getNFTsPaginated(principal) {
  let page = 0;

  while (true) {
    let { nft_events } = await getNftsByPage(principal, page);
    if (nft_events.length === 0) break;

    yield nft_events;
    page++;
  }
}
