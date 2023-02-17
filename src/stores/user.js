import { defineStore } from "pinia";
import { userSession } from "../boot/stacks";
import { useQuasar } from "quasar";

const $q = useQuasar();

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    loggedIn: false,
    profile: null,
    stxAddress: null,
    bitcoinAddress: null,
    lightning: null,
    nostrAddress: null,
    avatar: null,
    name: null,
    email: null,
    username: null,
  }),
  actions: {
    setUser(usr) {
      this.user = usr;
      this.profile = usr.profile || null;
    },
    async login() {
      const authOptions = {
        manifestPath: "/manifest.json",
        userSession: userSession,
        onFinish: async (data) => {
          console.info("onFinish", data);
          const userData = await data.userSession.loadUserData();
          this.setUser(userData);
          $q.localStorage.setItem("user", JSON.stringify(userData));
        },
        onCancel: (data) => {
          console.info("onCancel", data);
        },
        appDetails: {
          name: "Boom",
          icon: `${location.origin}/icons/icon-128x128.png`,
        },
      };
      showConnect(authOptions);
    },
    async logout() {
      userSession.signUserOut("/");
      this.user = null;
      this.profile = null;
      $q.localStorage.removeItem("user");
    },
  },
});
