import { defineStore } from "pinia";
import { useWalletStore } from "./wallet";

export const useNavStore = defineStore("nav", {
  state: () => ({
    selectedAccount: "STX",
  }),
  actions: {
    setActiveAccount(id) {
      const walletStore = useWalletStore();
      const acct = walletStore.tokens.find((token) => token.id === id);
      this.selectedAccount = acct;
    },
  },
  getters: {
    getActiveAccount() {
      return this.selectedAccount;
    },
  },
});
