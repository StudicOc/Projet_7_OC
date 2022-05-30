import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
//********Public content*********/
import About from "@/views/Public-page/About.vue";
import SignupForm from "@/views/Public-page/Signup.vue";
import LoginForm from "@/views/Public-page/Login.vue";
//********Private content*********/
import ProfilConnect from "@/views/Authenticated/DashboardUser.vue";
import Workplace from "@/views/Authenticated/PublicationPage.vue"; //********Display of publications and form to post a message*********/
import Article from "@/views/Authenticated/ArticlePage.vue"; //********Manage an article with its ID*********/

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
  //****************/
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
    name: "Articles",
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
