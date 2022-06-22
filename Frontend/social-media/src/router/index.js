import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

//********Public content*********/
import About from "@/views/Public-page/About.vue";
import SignupForm from "@/views/Public-page/Signup.vue";
import LoginForm from "@/views/Public-page/Login.vue";

//********Private content*********/
import ProfilConnect from "@/views/Authenticated/DashboardUser.vue";
import Workplace from "@/views/Authenticated/PublicationPage.vue";
import Article from "@/views/Authenticated/ArticlePage.vue";

const routes = [
  {
    path: "/",
    name: "about",
    component: About,
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
    path: "/article/:id",
    name: "ArticleID",
    component: Article,
    meta: { requiresAuth: true },
  },

  {
    path: "/article/add",
    name: "add",
    component: Workplace,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/articles",
    name: "articles",
    component: Workplace,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//*************Fonction d'authentification**************/
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next(router.push("/login"));
    } else {
      next(); //L'utilisateur peut naviguer sur les pages authentifiés
    }
  } else {
    next(); // ne nécessite pas d'authentification
  }
});

export default router;
