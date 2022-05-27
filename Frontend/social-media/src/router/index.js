import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import about from "@/views/Public-page/About.vue";
import SignupForm from "@/views/Public-page/Signup.vue";
import LoginForm from "@/views/Public-page/Login.vue";
import ProfilConnect from "@/views/Authenticated/DashboardUser.vue";
import addArticle from "@/views//Authenticated/AddArticle.vue";
import Articles from "@/views/Authenticated/ArticlesList.vue";
import Article from "@/views/Authenticated/IdArticle.vue";

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
    path: "/article/:id",
    name: "ArticleID",
    component: Article,
    meta: { requiresAuth: true },
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
    name: "Articles",
    component: Articles,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//*************Fonction qui nous permettra d'afficher nos pages si seulement l'tulisateur est authentifié**************/
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //Les routes nécessite une authentification, vérifie si vous êtes connecté//
    // Si non, une redirection est faite sur la page de connexion//

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
