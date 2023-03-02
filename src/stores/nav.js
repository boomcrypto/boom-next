import { defineStore } from "pinia";
import { useWalletStore } from "./wallet";

export const useNavStore = defineStore("nav", {
  state: () => ({
    selectedAccount: {},
  }),
  actions: {
    setActiveAccount(id) {
      const walletStore = useWalletStore();
      this.selectedAccount = walletStore.tokens.find(
        (token) => token.id === this.selectedAccountId
      );
    },
  },
});
