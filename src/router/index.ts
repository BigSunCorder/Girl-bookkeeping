import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Money from "@/views/Money.vue";

Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Money",
    component: Money,
  },
  {
    path: "/money",
    name: "Money",
    component: () => import("@/views/Money.vue"),
  },
  {
    path: "/labels",
    name: "Labels",
    component: () => import("@/views/Labels.vue"),
  },
  {
    path: "/labels/edit/:id",
    name: "EditLabels",
    component: () => import("@/views/EditLabels.vue"),
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: () => import("@/views/Statistics.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
