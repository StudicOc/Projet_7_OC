import { createRouter, createWebHistory } from "vue-router";
import about from "@/views/Public/AboutGroupomania.vue";
import SignupForm from "@/views/Public/SignupView.vue";
import LoginForm from "@/views/Public/LoginView.vue";
import ProfilConnect from "@/views/User/DashboardView.vue";
import addArticle from "@/views/User/ArticleView.vue";

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
  },

  //Ajouter un nouvel élément
  {
    path: "/add",
    name: "add",
    component: addArticle,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
