<template>
  <main>
    <div class="container" v-if="user">
      <div class="row justify-content-center">
        <div class="col">
          <div class="col">
            <h1 class="h3 my-2 font-weight-bold">
              Mon compte <font-awesome-icon icon="user" />
            </h1>
          </div>

          <section class="row">
            <div class="col">
              <div class="card bg-light my-3">
                <div class="card-header">
                  <div class="row justify-content-around">
                    <p class="m-1">Bonjour {{ user.firstname }} !</p>
                  </div>
                </div>

                <div class="card-body text-center">
                  <div class="dropdown text-center">
                    <p>Email de connexion: {{ user.email }}</p>
                  </div>
                </div>

                <div class="card-body">
                  <p class="text-center font-weight-bold">
                    Paramètres du compte:
                  </p>
                  <div class="btn-warning rounded p-1">
                    <button class="rounded p-2">
                      La supression de votre compte Groupomania sera
                      irréversible! Toutes vos données personnels relatifs au
                      site seront supprimé definitevement.
                    </button>
                  </div>
                </div>

                <div class="card-body mx-auto">
                  <!--Suppression du compte-->
                  <div class="btn-danger rounded p-1">
                    <button class="rounded p-2">Supprimer mon compte.</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <p v-if="!user">Déconnexion</p>
    <!--<p v-if="!user">Vous n'êtes pas connecté</p>-->
  </main>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "ProfilConnect",
  data() {
    return {
      user: {},
      isLogged: false,
    };
  },
  //--Récupération des données--//

  created() {
    this.isLogged = localStorage.getItem("user");
  },

  mounted() {
    //--- Segment dynamique l'id de l'utilisateur--//
    //---Paramètre d'itinéraire --//
    //const id = localStorage.getItem("id");
    //console.log(id);
    axios.get("http://localhost:3000/api/profil/", {
      headers: {
        Authorization: "Bearer, " + localStorage.getItem("user"),
      },
    });
    //console.log(this.$route.params.id);

    try {
      let token = localStorage.getItem("user");
      console.log(token);
      //décoder le jeton ici et l'attacher à l'objet utilisateur
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    } catch (error) {
      console.log(error, "error from decoding token");
    }
  },
};
</script>
<style lang="scss" scoped>
input {
  border: none;
  outline: none;
  border-bottom: 2px solid #ddd;
  font-size: 1em;
  width: 100%;
}

button {
  border-radius: 1em;
  font-size: 16px;
  border: none;
  cursor: pointer;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  transition-property: transform;
  transition-duration: 400ms; /* 400ms pour arriver et partir*/
  &:hover {
    transform: scale(1.15);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
    filter: brightness(1.1);
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    margin: auto;
    text-align: center;
  }

  .title {
    color: grey;
    font-size: 18px;
  }

  a {
    text-decoration: none;
    font-size: 22px;
    color: black;
  }
}
</style>
