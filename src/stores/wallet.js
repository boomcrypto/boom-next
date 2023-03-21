import { defineStore } from "pinia";
import { c32ToB58 } from "c32check";
import { useUserStore } from "./user";
import { supportedTokens } from "@common/constants";
import { v4 as uuidv4 } from "uuid";

export const useWalletStore = defineStore("wallet", {
  state: () => ({
    tokens: [],
    stx: {},
    btc: {},
    fungible_tokens: {},
    updatedAt: null,
    inscriptionsAddress: "",
  }),
  actions: {
    async init() {
      const FIVE_MINUTES_AGO = 1000 * 60 * 5;
      const now = Date.now();
      if (this.updatedAt && now - this.updatedAt < FIVE_MINUTES_AGO) {
        return;
      }
      const userStore = useUserStore();
      const principal = userStore.getPrincipal;
      const btcAddress = userStore.getBtcAddress;
      const legacyBTCAddress = c32ToB58(principal);

      try {
        const data = await fetch(
          `https://api.hiro.so/extended/v1/address/${principal}/balances`
        );
        const results = await data.json();
        const stx = results.stx;
        const fungible_tokens = results.fungible_tokens;
        let priceIds = ["blockstack", "bitcoin"].concat(
          Array.from(new Set(supportedTokens.map((token) => token.cgId)))
        );
        priceIds = priceIds.filter((id) => id !== "");

        // get current price data
        const priceData = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${priceIds.toString()}&vs_currencies=usd`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        const priceResults = await priceData.json();
        console.log("btc address: ", btcAddress);
        if (btcAddress !== "") {
          const BTCdata = await fetch(
            `https://api.blockcypher.com/v1/btc/main/addrs/${btcAddress}/balance`
          );
          const btcresults = await BTCdata.json();

          let btcToken = {
            id: uuidv4(),
            icon: "/tokens/Bitcoin.svg",
            name: "Bitcoin (P2WPKH)",
            symbol: "BTC",
            denomination: 1e8,
            currentPrice: priceResults.bitcoin.usd,
            balance: btcresults.balance,
            value: priceResults.bitcoin.usd * (btcresults.balance / 1e8),
            type: "BTC",
            locked: 0,
          };

          this.tokens.push(btcToken);
        }

        const legacyBTCdata = await fetch(
          `https://api.blockcypher.com/v1/btc/main/addrs/${legacyBTCAddress}/balance`
        );

        const legacybtcresults = await legacyBTCdata.json();

        let legacyBTC = {
          id: uuidv4(),
          icon: "/tokens/Bitcoin.svg",
          name: "Bitcoin (Legacy)",
          symbol: "BTC",
          denomination: 1e8,
          currentPrice: priceResults.bitcoin.usd,
          balance: legacybtcresults.balance,
          value: priceResults.bitcoin.usd * (legacybtcresults.balance / 1e8),
          type: "BTC",
          locked: 0,
        };

        this.tokens.push(legacyBTC);

        // update stx object with price data & token metadata
        let stxToken = {
          id: uuidv4(),
          icon: "/tokens/Stacks_Logo.svg",
          name: "Stacks",
          symbol: "STX",
          denomination: 1e6,
          currentPrice: priceResults.blockstack.usd,
          value: priceResults.blockstack.usd * (stx.balance / 1e6),
          type: "STX",
        };

        stxToken = Object.assign(stxToken, stx);
        this.tokens.push(stxToken);

        // updates btc data with price data & token metada
        // updates fungible_tokens with price data & token metadata
        Object.keys(fungible_tokens).forEach((token) => {
          let tokenData = supportedTokens.find(
            (t) => t.assetIdentifier === token
          );
          if (tokenData && fungible_tokens[token].balance > 0) {
            let tokenObj = {
              id: uuidv4(),
              icon: tokenData.icon,
              name: tokenData.name,
              symbol: tokenData.symbol,
              denomination: tokenData.denomination,
              currentPrice: priceResults[tokenData.cgId]?.usd || 0,
              balance: fungible_tokens[token].balance,
              value:
                priceResults[tokenData.cgId]?.usd *
                  (fungible_tokens[token].balance / tokenData.denomination) ||
                0,
              type: "SIP10",
            };

            this.tokens.push(tokenObj);
          }
        });
        this.updatedAt = Date.now();
      } catch (err) {
        console.error(err);
      }
    },
    setInscriptionsAddress(address) {
      this.inscriptionsAddress = address;
    },
  },
  getters: {},
});
