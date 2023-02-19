import { defineStore, storeToRefs } from "pinia";
import { userSession } from "@boot/stacks";
import { showConnect } from "@stacks/connect";
import { useNetworkStore } from "./network";

const networkStore = useNetworkStore();

const { network, apiUrl, networkName } = storeToRefs(networkStore);

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    loggedIn: false,
    profile: {},
    stxAddress: "",
    bitcoinAddress: "",
    lightning: "",
    nostrAddress: "",
    avatar: "",
    name: "",
    email: "",
    username: "",
  }),
  actions: {
    async setUser(usr) {
      this.user = usr;
      this.loggedIn = true;
      this.profile = usr.profile || null;
      if (network.isMainnet()) {
        this.stxAddress = usr.profile.stxAddress.mainnet;
      } else {
        this.stxAddress = usr.profile.stxAddress.testnet;
      }
      this.avatar = usr.avatar || null;
      this.name = usr.profile.name || null;
      this.email = usr.profile.email || null;
      const res = fetch(`${apiUrl}/v1/addresses/stacks/${this.stxAddress}`);
      console.log(await res.json);
    },
    async login() {
      const authOptions = {
        manifestPath: "/manifest.json",
        userSession: userSession,
        onFinish: async (data) => {
          const userData = await data.userSession.loadUserData();
          console.info("userData", userData);
          this.setUser(userData);
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
      this.loggedIn = false;
      this.stxAddress = null;
      this.bitcoinAddress = null;
      this.lightning = null;
      this.nostrAddress = null;
      this.avatar = null;
      this.name = null;
      this.email = null;
      this.username = null;
    },
  },
});
