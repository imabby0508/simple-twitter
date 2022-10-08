import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/NotFound.vue";
import UserLogin from "../views/UserLogin.vue";
import Main from "../views/Main.vue";

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
    path: "/signup",
    name: "sign-up",
    component: () => import("../views/Regist.vue"),
  },
  {
    path: "/signin/admin",
    name: "admin-sign-in",
    component: () => import("../views/AdminLogin.vue"),
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("../views/Setting.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: Main,
  },
  {
    path: "/tweets/:id/reply",
    name: "reply",
    component: () => import("../views/Reply.vue"),
  },
  {
    path: "/user/:id/tweets",
    name: "user-tweets",
    component: () => import("../views/UserTweets.vue"),
  },
  {
    path: "/user/:id/replies",
    name: "user-replies",
    component: () => import("../views/UserReplies.vue"),
  },
  {
    path: "/user/:id/likes",
    name: "user-likes",
    component: () => import("../views/UserLikes.vue"),
  },
  {
    path: "/user/:id/followers",
    name: "user-followers",
    component: () => import("../views/UserFollowers.vue"),
  },
  {
    path: "/user/:id/followings",
    name: "user-followings",
    component: () => import("../views/UserFollowings.vue"),
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
