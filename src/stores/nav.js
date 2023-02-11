import { defineStore } from "pinia";

export const useNavStore = defineStore("nav", {
  state: () => ({
    selectedAccount: "STX",
  }),
  actions: {
    setActiveAccount(acct) {
      this.selectedAccount = acct;
    },
  },
});
