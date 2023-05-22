import { defineStore } from "pinia";

export interface Account {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  decimals: number;
  logoURI: string;
  price: number;
  transactions: any[];
  locked: number;
}

export const useAccountStore = defineStore("account", {
  state: () => ({
    items: [],
    ids: [],
    loading: false,
  }),

  getters: {
    getItems(state) {
      return state.items;
    },
  },

  actions: {},
});
