import { defineStore } from "pinia";
import { useWalletStore } from "./wallet";

export const useNavStore = defineStore("nav", {
  state: () => ({
    selectedAccountId: "STX",
  }),
  actions: {
    setActiveAccount(id) {
      this.selectedAccountId = id;
    },
  },
  getters: {
    getActiveAccount() {
      const walletStore = useWalletStore();
      const acct = walletStore.tokens.find(
        (token) => token.id === this.selectedAccountId
      );
      return acct;
    },
  },
});
