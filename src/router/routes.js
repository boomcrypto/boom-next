const appRoutes = [
  { path: "", component: () => import("pages/AccountPage.vue") },
  {
    path: "/collectibles",
    component: () => import("pages/CollectionsPage.vue"),
  },
  {
    path: "/smart-contracts",
    component: () => import("pages/SmartContractsPage.vue"),
  },
  {
    path: "/tools",
    component: () => import("pages/ToolsPage.vue"),
  },
  { path: "/settings", component: () => import("pages/SettingsPage.vue") },
];

const keyRoutes = [
  {
    path: "",
    component: () => import("pages/LoginPage.vue"),
    name: "Login",
  },
];

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: appRoutes,
  },
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: keyRoutes,
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
];

export default routes;
