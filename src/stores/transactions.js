import { defineStore } from "pinia";
import { ASSET_PAGE_LIMIT } from "src/common/constants";
import { useUserStore } from "./user";
import { groupBy } from "lodash-es";
import { date } from "quasar";

export const useTxnStore = defineStore("txns", {
  state: () => ({
    items: [],
    ids: [],
    loading: false,
  }),

  getters: {
    getTxns(state) {
      return state.items;
    },
    transactionsByDay(state) {
      const today = formatDay(Date.now());

      let currentTxns = state.items.filter(
        (txn) => txn.tx_status === "success"
      );

      let tbd = currentTxns.map((txn) => {
        if (!txn.burn_block_time) {
          txn.txnDay = today;
        } else {
          txn.txnDay = formatDay(txn.burn_block_time * 1000);
        }
        return txn;
      });

      return groupBy(tbd, "txnDay");
    },
    deployedContracts(state) {
      return state.items.filter((txn) => txn.tx_type === "smart_contract");
    },
  },

  actions: {
    async getTx(page) {
      const userStore = useUserStore();
      const principal = userStore.getPrincipal;
      this.loading = true;
      this.items = this.items.concat((await getTxnsByPage(page, principal)).results)
      this.loading = false;
    }
  },
});

async function getTxnsByPage(page, principal) {
  const offset = page * ASSET_PAGE_LIMIT;
  const res = await fetch(
    `https://api.hiro.so/extended/v1/address/${principal}/transactions?offset=${offset}&limit=${ASSET_PAGE_LIMIT}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  return data;
}

async function initializeTransactions(principal) {
  let txnResult = await getTxnsByPage(0, principal);
  console.log(txnResult)
  let results = txnResult.results;
  if (txnResult.total > ASSET_PAGE_LIMIT) {
    const pages = Math.ceil(txnResult.total / ASSET_PAGE_LIMIT);
    console.log(pages)
    for (let i = 1; i < pages; i++) {
      let moar = await getTxnsByPage(i, principal);
      console.log(i)
      console.log('moar log', moar)
      results = results.concat(moar.results);
    }
  }
  return results || [];
}

function formatDay(time) {
  return date.formatDate(time, "MM-DD-YYYY");
}