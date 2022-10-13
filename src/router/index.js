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
    beforeEnter: (to, from, next) => {
      const currentUser = store.state.currentUser
      if (currentUser && store.state.role === 'user') {
        next('*')
        return
      }
      next()
    }
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: () => import("../views/AdminTweetersCard.vue"),
    beforeEnter: (to, from, next) => {
      const currentUser = store.state.currentUser
      if (currentUser && store.state.role === 'user') {
        next('*')
        return
      }
      next()
    }
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

  const role = store.state.role

  const tokenInLocalStorage = localStorage.getItem('token') // signin時存到 localStorage的 token
  const tokenInStore = store.state.token //每次打 currentUser api，就會存到 store
  let isAuthenticated = store.state.isAuthenticated

  if (role === 'user') {

    // 在路由改變時，什麼時候會打 currentUser api，並把值存到 state?
    // 1. 當 local storage token存在
    // 2. 且當 local storage token === store token
    if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
      isAuthenticated = await store.dispatch('fetchCurrentUser')
    }

    const pathWithoutAuthentication = ['sign-in', 'sign-up']

    // 當你沒有登入時，你只能去 signin/ signup頁面
    if (!isAuthenticated && !pathWithoutAuthentication.includes(to.name)) {
      next('/signin')
      return
    }

    // 當你有登入時，你不能去 signin/ signup頁面
    if (isAuthenticated && pathWithoutAuthentication.includes(to.name)) {
      next('/main')
      return
    }
  } 
  
  // 當有 admin有 currentUser時再打
  // if (role === 'admin') {

  //   if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
  //     isAuthenticated = await store.dispatch('fetchCurrentUser')
  //   }

  //   if (!isAuthenticated && to.name !== 'admin-sign-in') {
  //     next('/admin/signin')
  //     return
  //   }

  //   if (isAuthenticated && to.name === 'admin-sign-in') {
  //     next('/admin/main')
  //     return
  //   }
  // }

  next()
})

export default router;
