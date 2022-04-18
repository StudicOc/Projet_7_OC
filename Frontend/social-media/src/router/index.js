import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import SignupForm from "../views/SignupView.vue";
import LoginForm from "../views/LoginView.vue";
import ProfilConnect from "../views/DashboardView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
