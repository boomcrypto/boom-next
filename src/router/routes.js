import AppLayout from "layouts/AppLayout.vue";
import KeyLayout from "layouts/KeyLayout.vue";

const keyChildPages = [
  {
    path: "/",
    component: () => import("pages/FirstTime.vue"),
    name: "Login",
    meta: { requiresAuth: false },
  },
  {
    path: "/new",
    component: () => import("pages/NewKey.vue"),
    name: "NewKey",
    meta: { requiresAuth: false },
  },
  {
    path: "/have",
    component: () => import("pages/HaveKey.vue"),
    name: "ExistingKey",
    meta: { requiresAuth: false },
  },
];

const appChildPages = [
  // nft routes
  {
    path: "/nfts",
    component: () => import("pages/CollectionsPage.vue"),
    name: "My NFTs",
    props: false,
    meta: { requiresAuth: false },
  },
  // wallet routes
  {
    path: "/wallet",
    component: () => import("pages/WalletPage.vue"),
    name: "Wallet",
    meta: { requiresAuth: false },
  },
  // settings routes
  {
    path: "/settings",
    component: () => import("pages/SettingsPage.vue"),
    name: "Settings",
    meta: { requiresAuth: false },
  },
];

const routes = [
  {
    path: "",
    component: AppLayout,
    name: "AppLayout",
    meta: { requiresAuth: false },
    children: appChildPages,
  },
  {
    path: "",
    component: KeyLayout,
    name: "KeyLayout",
    meta: { requiresAuth: false },
    children: keyChildPages,
  },
];

// Always leave this as last one
routes.push({
  path: "/:catchAll(.*)*",
  component: () => import("pages/ErrorNotFound.vue"),
});

export default routes;
