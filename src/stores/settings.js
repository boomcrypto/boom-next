import { defineStore } from "pinia";
import { StacksMainnet, StacksTestnet } from "@stacks/network";
export const useSettingsStore = defineStore("settings", {
  state: () => ({
    apiUrl: "https://stacks-node-api.mainnet.stacks.co",
    network: new StacksMainnet(),
    networkName: "mainnet",
  }),
  actions: {
    setApiUrl(url) {
      this.apiUrl = url;
    },
    setNetwork(net) {
      this.network =
        net === "mainnet" ? new StacksMainnet() : new StacksTestnet();
    },
    setNetworkName(net) {
      this.networkName = net;
      this.setNetwork(net);
    },
  },
});
