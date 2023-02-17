import { defineStore } from "pinia";
import { StacksTestnet, StacksMainnet } from "@stacks/network";

export const useNetworkStore = defineStore("network", {
  state: () => ({
    network: new StacksMainnet(),
    apiUrl: network.coreApiUrl,
  }),
  actions: {
    setNetwork(net) {
      network = net === "mainnet" ? new StacksMainnet() : new StacksTestnet();
      apiUrl = network.coreApiUrl;
    },
  },
  getters: {
    getNetwork() {
      return this.network;
    },
  },
});
