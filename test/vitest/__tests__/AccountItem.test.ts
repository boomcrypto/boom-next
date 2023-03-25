// tests/AccountItem.test.ts
import { installQuasar } from "@quasar/quasar-app-extension-testing-unit-vitest";
import { mount } from "@vue/test-utils";
import AccountItem from "src/components/Accounts/AccountItem.vue";
import { describe, expect, it } from "vitest";

installQuasar();

describe("AccountItem", () => {
  it("renders the correct data based on the passed props", () => {
    // const testAccount = {
    //   value: 100,
    //   name: { value: "Test Token" },
    //   symbol: { value: "TST" },
    //   icon: { value: "/images/tokens/test_token.png" },
    //   balance: { value: 10 },
    //   denomination: { value: 2 },
    // };

    const testAccount = {
      value: 100,
      name: "Test Token",
      symbol: "TST",
      icon: "/images/tokens/generic_token_bg.png",
      balance: 10,
      denomination: 2,
    };

    const wrapper = mount(AccountItem, {
      props: {
        acct: testAccount,
      },
    });

    // Check if the correct data is rendered
    const name = wrapper.find(".wallet-multi-asset-type-text");
    expect(name.text()).toBe("Test Token");

    const symbol = wrapper.find(
      ".wallet-multi-asset-text-symbol.text-uppercase"
    );
    expect(symbol.text()).toBe("TST");

    const formattedVal = wrapper.findAll(".wallet-multi-asset-type-text")[1];
    expect(formattedVal.text()).toBe("$100.00");

    const balance = wrapper.findAll(".wallet-multi-asset-text-symbol")[1];
    expect(balance.text()).toBe("10");
  });
});
