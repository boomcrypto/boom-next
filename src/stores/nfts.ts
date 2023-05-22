import { defineStore } from "pinia";
import { useNetworkStore } from "./network";
import { useUserStore } from "./user";
import { ASSET_PAGE_LIMIT } from "../common/constants";
import { ORD_API_URL } from "../common/constants";

export const useNFTStore = defineStore("nfts", {
  state: () => ({
    nfts: [],
    nftTotal: 0,
    ords: [],
    ordTotal: 0,
    nftsLoaded: null,
    ordsLoaded: null,
  }),

  getters: {
    boomboxes() {
      return true;
    },
    nftsByCollection() {
      return true;
    },
    nftsByCreator() {
      return true;
    },
  },

  actions: {
    async getAll() {
      if (!this.loaded) {
        const nftPromise = new Promise((resolve, reject) => {
          this.getStacksNFTS();
        });
        const ordPromise = new Promise((resolve, reject) => {
          this.getOrdinals();
        });

        Promise.all([nftPromise, ordPromise]).then((values) => {
          this.loaded = true;
        });
      }
    },
    async getStacksNFTS() {
      const userStore = useUserStore();
      const res = await getNFTsPaginated(userStore.stxAddress);
      this.nfts = res;
      this.nftsLoaded = Date.now();
    },
    async getOrdinals() {
      const userStore = useUserStore();
      //TODO: using a different address for testing, production use the ordinal Address
      const res = await getOrdsPaginated(userStore.cardinalAddress);
      // const res = await getOrdsPaginated(userStore.ordinalAddress);
      this.ords = res;
      this.ordsLoaded = Date.now();
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
    if (results.length === 0) break;
    total.push(results);
    page++;
  }
  return total;
}

async function getOrdsByPage(address, page) {
  const offset = page * ASSET_PAGE_LIMIT;
  const response = await fetch(
    `${ORD_API_URL}/ordinals/v1/inscriptions?address=${address}&limit=${ASSET_PAGE_LIMIT}&offset=${offset}`
  );
  return await response.json();
}

async function getOrdsPaginated(address) {
  let page = 0;
  let total = [];

  while (true) {
    let { results } = await getOrdsByPage(address, page);
    if (results.length === 0) break;
    total.push(results);
    page++;
  }

  return total;
}
