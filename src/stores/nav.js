import { defineStore } from "pinia";

export const useNavStore = defineStore("nav", {
  state: () => ({
    nav: "accounts",
  }),
  actions: {
    setNav(nav) {
      this.nav = nav;
    },
  },
});
