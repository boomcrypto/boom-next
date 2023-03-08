import { defineStore } from "pinia";
import { useNetworkStore } from "./network";
import { useUserStore } from "./user";
import { ASSET_PAGE_LIMIT } from "../common/constants";

export const useNFTStore = defineStore("nfts", {
  state: () => ({
    items: [],
    ids: [],
    loaded: false,
  }),

  getters: {
    boomboxes() {
      return true;
    },
  },

  actions: {
    async getAll() {
      const userStore = useUserStore();
      const res = await getNFTsPaginated(userStore.stxAddress);
      this.items = res;
    },
  },
});

async function getNftsByPage(principal, page) {
  const networkStore = useNetworkStore();
  const offset = page * ASSET_PAGE_LIMIT;
  const response = await fetch(
    `${networkStore.apiUrl}/extended/v1/tokens/nft/holdings?principal=${principal}&limit=${ASSET_PAGE_LIMIT}&offset=${offset}&unachored=true`
  );
  return await response.json();
}

async function getNFTsPaginated(principal) {
  let page = 0;
  let total = [];

  while (true) {
    let { results } = await getNftsByPage(principal, page);
    console.info("results", results);
    if (results.length === 0) break;
    total.push(results);
    page++;
  }
  return total;
}
