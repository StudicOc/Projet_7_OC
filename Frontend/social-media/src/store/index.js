import { createStore } from "vuex";
//import Axios from "axios";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  //*******State : Notre data store (data) est défini en tant que  state , définir des paire clé/valeur********//
  //*******Récupérer les données de vuex $store.state********/
  //*******Refactorer notre store: import {mapState} from 'vuex'********/
  //*******Utilisation avec la syntaxe de décomposition avec dans computed ********/
  //*******Component :...mapState()['','']********/
  strict: true,
  plugins: [createPersistedState()],
  state: {
    token: "",
    user: {},
  },
  //***************/
  //***************/
  //*******Une autre méthode plus propre : Définir nos getters comme une fonction, hériter du state qui est passé en argument********/
  getters: {},

  //***************/
  //******Synchrone, modifie le state*********/
  //******** Mettre à jour et modifier nos données dans Vuex avec les mutations*********/
  //*******Définir une mutation en assignant une fonction, passé le state en argument pour le muter********/
  //*******Component : Appeler une mutation avec this.$store.commit(nom de la mutation)********/
  mutations: {},

  actions: {},
  //***************/
  //******Les mutations directement dans l'application vue sont considérés comme une mauvaise pratique*********/
  //*******Définir une mutation en assignant une fonction, passé le content (contexte) en argument********/
  //*******Le contexte donne accés au state ou commit, qui permettent d'acter nos mutations********//
  //*******utilisation de la methode dispatch, lui donner le nom de l'action à declencher********/
  //import { mapState, mapActions } from 'vuex'//
  //methods: {...mapActions(['updateCount'])}
  modules: {},
});
