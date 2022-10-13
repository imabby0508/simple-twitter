import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/NotFound.vue";
import UserLogin from "../views/UserLogin.vue";
import Main from "../views/Main.vue";
import store from "@/store";

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
    path: "/admin/signin",
    name: "admin-sign-in",
    component: () => import("../views/AdminLogin.vue"),
  },
  {
    path: "/admin/main",
    name: "admin-main",
    component: () => import("../views/AdminMain.vue"),
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: () => import("../views/AdminTweetersCard.vue"),
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

router.beforeEach( async(to, from, next) => {

  const tokenInStore = store.state.token //每次打 currentUser api，就會存到 store
  const tokenInLocalStorage = localStorage.getItem('token') // signin時放到 localStorage
  let isAuthenticated =  store.state.isAuthenticated

  // 在路由改變時
  // 只有當 local storage token存在，且 local storage token === store token，
  // 才會去打 GET currentUser api，把 currentUser存到 Vuex
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  const pathWithoutAuthentication = ['sign-in', 'sign-up']
  if (!isAuthenticated && !pathWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }
  if (isAuthenticated && pathWithoutAuthentication.includes(to.name)) {
    next('/main')
    return
  }
  
  next()
})

export default router;
