import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

axios.defaults.headers.common["Authorization"] =
  "Bearer, " + localStorage.getItem("token");

import { FontAwesomeIcon } from "./Plugings/font-awesome";

createApp(App)
  .use(router)
  .use(store)

  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
