import { boot } from "quasar/wrappers";
import { AppConfig, UserSession } from "@stacks/connect";
import { lookupProfile } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
});
export const userSession = new UserSession({ appConfig });
