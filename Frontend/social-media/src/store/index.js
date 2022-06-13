import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    //L'état initial pour le statut d'authentification, le jeton et les informations utilisateur//
    //Component : demander à Vuex les propriétés de state de notre choix : import { mapState } from 'vuex'//

    token: localStorage.getItem("token") || "", // Récupération du token depuis le localstorage//
    user: {}, // Objet contenant les futurs données utilisateur (profil) //
  },

  getters: {
    // Notre fontion prendra en compte notre token pour la connexion et déconnexion, si ce dernier n'est pas défini //
    isLoggedIn: (state) => !!state.token,
  },

  mutations: {
    //Elle contiendra un objet de toutes les propriétés responsables de modifications du  state//
    //Définir une mutation en assignant une fonction, passé le state en argument pour le muter//
    //Component :Actez une mutation :this.$store.commit('')

    auth_request(state) {
      state.status = "loading";
    },

    auth_success(state, token, user) {
      state.token = token;
      state.user = user;
    },

    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
  },

  actions: {
    //Les actions dans Vuex nous permettent de valider des mutations dans le magasin vuex.//
    // 2 actions importantes : login, logout //

    submitLogin({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/api/auth/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = "Bearer, " + token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            alert("Mot de passe incorrect");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },

    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
        reject();
      });
    },
  },
});
