import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/NotFound.vue";
import UserLogin from "../views/UserLogin.vue";
import Main from "../views/Main.vue";
import store from "@/store";
import { Toast } from '../utils/helpers'

Vue.use(VueRouter);

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && store.state.role === 'user') {
    next('*')
    return
  }
  next()
}

const authorizeIsUser = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && store.state.role === 'admin') {
    next('*')
    return
  }
  next()
}

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
    beforeEnter: authorizeIsUser
  },
  {
    path: "/main",
    name: "main",
    component: Main,
    beforeEnter: authorizeIsUser
  },
  {
    path: "/tweets/:id/reply",
    name: "reply",
    component: () => import("../views/Reply.vue"),
    beforeEnter: authorizeIsUser
  },
  {
    path: "/user/:id/tweets",
    name: "user-tweets",
    component: () => import("../views/UserTweets.vue"),
    beforeEnter: authorizeIsUser
  },
  {
    path: "/user/:id/replies",
    name: "user-replies",
    component: () => import("../views/UserReplies.vue"),
    beforeEnter: authorizeIsUser
  },
  {
    path: "/user/:id/likes",
    name: "user-likes",
    component: () => import("../views/UserLikes.vue"),
    beforeEnter: authorizeIsUser
  },
  {
    path: "/user/:id/followers",
    name: "user-followers",
    component: () => import("../views/UserFollowers.vue"),
    beforeEnter: authorizeIsUser
  },
  {
    path: "/user/:id/followings",
    name: "user-followings",
    component: () => import("../views/UserFollowings.vue"),
    beforeEnter: authorizeIsUser
  },
  {
    path: "/admin/signin",
    name: "admin-sign-in",
    component: () => import("../views/AdminLogin.vue"),
    beforeEnter: authorizeIsUser
  },
  {
    path: "/admin/main",
    name: "admin-main",
    component: () => import("../views/AdminMain.vue"),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: () => import("../views/AdminTweetersCard.vue"),
    beforeEnter: authorizeIsAdmin
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


  const tokenInLocalStorage = localStorage.getItem('token') // signin時存到 localStorage的 token
  const tokenInStore = store.state.token //每次打 currentUser api，就會存到 store
  let isAuthenticated = store.state.isAuthenticated

  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  const pathWithoutAuthentication = ['sign-in', 'sign-up', 'admin-sign-in']

  if (!isAuthenticated && !pathWithoutAuthentication.includes(to.name)) {

    Toast.fire({
      icon: 'warning',
      title: '登入帳密才可以使用'
    })

    next('/signin')
    return
  }

  if (isAuthenticated && pathWithoutAuthentication.includes(to.name)) {
    if (store.state.role === 'user') {
      next('/main')
      return
    } 
    if (store.state.role === 'admin') {
      next('/admin/main')
      return
    }
  }
  next()
})

export default router;
