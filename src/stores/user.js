import { defineStore, storeToRefs } from "pinia";
import { userSession } from "@boot/stacks";
import { showConnect } from "@stacks/connect";
import { useNetworkStore } from "./network";
import { useTxnStore } from "./transactions";
import { resolveBns } from "src/common/utils";
import { useWalletStore } from "./wallet";
import { useNFTStore } from "./nfts";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { openProfileUpdateRequestPopup } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    loggedIn: false,
    profile: {},
    stxAddress: "",
    cardinalAddress: "",
    ordinalAddress: "",
    lightning: "",
    nostrAddress: "",
    avatar: "",
    name: "",
    email: "",
    username: "",
  }),
  actions: {
    async setUser(usr) {
      // TODO: remove useStores where possible
      // we should be able to just pass a principal
      // parameter to the dependent stores

      const networkStore = useNetworkStore();
      const walletStore = useWalletStore();

      /* set uset profile */
      this.user = usr;
      this.loggedIn = true;
      this.profile = usr.profile || {};
      if (networkStore.network.isMainnet()) {
        this.stxAddress = usr.profile.stxAddress.mainnet;
        this.cardinalAddress = usr.profile.btcAddress?.p2wpkh.mainnet || "";
        this.ordinalAddress = usr.profile.btcAddress?.p2tr.mainnet || "";
      } else {
        this.stxAddress = usr.profile.stxAddress.testnet;
        this.cardinalAddress = usr.profile.btcAddress?.p2wpkh.testnet || "";
        this.ordinalAddress = usr.profile.btcAddress?.p2tr.testnet || "";
      }
      if (!usr.profile?.avatar) {
        this.avatar = `https://api.dicebear.com/5.x/bottts/svg?seed=${this.stxAddress}&scale=100`;
      }
      this.name = usr.profile.name || null;
      this.email = usr.profile.email || null;
      this.username = await resolveBns(this.stxAddress);
      /* 3. 'initializeNFTs' */
      // await nftStore.getAll();
      /* 4. 'updateDelegationState' */
      /* 5. 'updateStackerInfo' */
    },
    async updateUser(profile) {
      openProfileUpdateRequestPopup({
        profile,
        network: new StacksMainnet(),
        appDetails: {
          name: "Boom",
          icon: `${location.origin}/icons/icon-128x128.png`,
        },
        onFinish(data) {
          console.log("Profile published", data);
        },
      });
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
      return state.cardinalAddress;
    },
    getOrdAddress(state) {
      return state.ordinalAddress;
    },
    getProfile(state) {
      return state.profile;
    },
  },
});
