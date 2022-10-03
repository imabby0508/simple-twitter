import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from "../views/NotFound.vue";
import UserLogin from "../views/UserLogin.vue";

Vue.use(VueRouter)

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
    path: "*",
    name: "not-found",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes
})

export default router
