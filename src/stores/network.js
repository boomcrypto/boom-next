import { defineStore } from "pinia";
import { StacksTestnet, StacksMainnet } from "@stacks/network";

export const useNetworkStore = defineStore("network", {
  state: () => ({
    network: new StacksMainnet(),
    networkName: "mainnet",
    apiUrl: "https://api.hiro.so",
    BTC_EXPLORER_URL: "https://mempool.space",
    BTC_NETWORK: "bitcoin",
  }),
  actions: {
    setNetwork(net) {
      if (net === "mainnet") {
        if (this.network.isMainnet()) {
          return;
        }
        this.network = new StacksMainnet();
        this.networkName = "mainnet";
        this.apiUrl = "https://api.hiro.so";
        this.BTC_EXPLORER_URL = "https://mempool.space";
        this.BTC_NETWORK = "bitcoin";
      } else if (net === "testnet") {
        this.network = new StacksTestnet();
        this.networkName = "testnet";
        this.apiUrl = "https://stacks-node-api.testnet.stacks.co";
        this.BTC_EXPLORER_URL = "https://mempool.space/testnet";
        this.BTC_NETWORK = "testnet";
      } else {
        return;
      }
    },
  },

  getters: {
    getNetwork() {
      return this.network;
    },
  },
});
