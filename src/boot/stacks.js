import { boot } from "quasar/wrappers";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { Storage } from "@stacks/storage";

const scopes = ["store_write", "publish_data", "email"];

const appConfig = new AppConfig(scopes);
export const userSession = new UserSession({ appConfig: appConfig });
export const storage = new Storage({ userSession });

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
});

export const signIn = function () {
  const authOptions = {
    manifestPath: "/manifest.json",
    userSession: userSession,
    onFinish: async ({ userSession }) => {
      await this.initApp(userSession);
    },
    appDetails: {
      name: "Boom",
      icon: `${location.origin}/icons/icon-128x128.png`,
    },
  };
  showConnect(authOptions);
};

export const signOut = function () {
  userSession.signUserOut("/");
};

// export default ({router, store}) => {
//   router.beforeEach(async (to, from, next) => {
//     if (to.matched.some((page) => page.meta.requiresAuth === true)) {
//       try {
//         if (userSession.isUserSignedIn()) {
//           // init app if user is not authenticated
//           if (!store.getters['app/user'].authenticated) {
//             await store.dispatch('app/initApp', userSession);
//           }

//           if (to.fullPath === '/') {
//             next('/home');
//           } else {
//             next();
//           }
//         } else if (userSession.isSignInPending()) {
//           signIn();
//           next();
//         } else {
//           next('/');
//         }
//         next();
//       } catch (e) {
//         next('/');
//       }
//     } else {
//       next();
//     }
//   });
// };
