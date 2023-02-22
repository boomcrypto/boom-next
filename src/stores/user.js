import { defineStore, storeToRefs } from "pinia";
import { userSession } from "@boot/stacks";
import { showConnect } from "@stacks/connect";
import { useNetworkStore } from "./network";
import { useTxnStore } from "./transactions";
import { resolveBns } from "src/common/utils";
import { useWalletStore } from "./wallet";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    loggedIn: false,
    profile: {},
    stxAddress: "",
    btcAddress: "",
    lightning: "",
    nostrAddress: "",
    avatar: "",
    name: "",
    email: "",
    username: "",
  }),
  actions: {
    async setUser(usr) {
      const networkStore = useNetworkStore();
      const txnStore = useTxnStore();
      const walletStore = useWalletStore();

      /* set uset profile */
      this.user = usr;
      this.loggedIn = true;
      this.profile = usr.profile || null;
      if (networkStore.network.isMainnet()) {
        this.stxAddress = usr.profile.stxAddress.mainnet;
        this.btcAddress = usr.profile.btcAddress?.mainnet || "";
      } else {
        this.stxAddress = usr.profile.stxAddress.testnet;
        this.btcAddress = usr.profile.btcAddress?.testnet || "";
      }
      this.avatar = usr.profile?.image || "/appicons/avatar.png";
      this.name = usr.profile.name || null;
      this.email = usr.profile.email || null;
      this.username = await resolveBns(this.stxAddress);
      /* 1. 'initializeTransactions' */
      await txnStore.getAll();
      /* 2. initialize fungible_tokens */
      await walletStore.init();
      /* 3. 'initializeNFTs' */
      /* 4. 'updateDelegationState' */
      /* 5. 'updateStackerInfo' */
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
  getters: {
    getPrincipal(state) {
      return state.stxAddress;
    },
    getBtcAddress(state) {
      return state.btcAddress;
    },
  },
});
