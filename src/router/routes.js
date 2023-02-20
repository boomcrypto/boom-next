const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AccountPage.vue") },
      {
        path: "/collectibles",
        component: () => import("pages/CollectionsPage.vue"),
      },
      { path: "/utils", component: () => import("pages/UtilsPage.vue") },
      { path: "/settings", component: () => import("pages/SettingsPage.vue") },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
];

export default routes;
