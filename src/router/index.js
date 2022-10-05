import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/NotFound.vue";
import UserLogin from "../views/UserLogin.vue";
import Main from "../views/Main.vue";
import Reply from "../views/Reply.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/signin",
  },
  {
    path: "/signin",
    name: "sign-in",
    component: UserLogin,
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/Regist.vue')
  },
  {
    path: '/signin/admin',
    name: "admin-sign-in",
    component: () => import('../views/AdminLogin.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/Setting.vue')
  },
  {
    path: "/main",
    name: "main",
    component: Main,
  },
  {
    path: "/reply",
    name: "reply",
    component: Reply,
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
