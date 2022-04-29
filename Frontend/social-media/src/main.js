import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer, " + localStorage.getItem("token");

import { FontAwesomeIcon } from "./Plugings/font-awesome";

createApp(App)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

import "bootstrap/dist/js/bootstrap.js";
