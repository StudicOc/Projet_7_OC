import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import about from "@/views/Public-page/AboutGroupomania.vue";
import SignupForm from "@/views/Public-page/SignupView.vue";
import LoginForm from "@/views/Public-page/LoginView.vue";
import ProfilConnect from "@/views/Authenticated/DashboardView.vue";
import addArticle from "@/views//Authenticated/PostArticleView.vue";
import ArticlesPage from "@/views/Authenticated/ArticlesPage.vue";

const routes = [
  {
    path: "/",
    name: "about",
    component: about,
  },

  {
    path: "/signup",
    name: "signup",
    component: SignupForm,
  },
  {
    path: "/login",
    name: "login",
    component: LoginForm,
  },
  {
    path: "/profil",
    name: "profil",
    component: ProfilConnect,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/article/add",
    name: "add",
    component: addArticle,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/articles",
    name: "ArticlesPage",
    component: ArticlesPage,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.

    if (!store.getters.isLoggedIn) {
      next(router.push("/login"));
    } else {
      next(); // go to wherever I'm going
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

export default router;
