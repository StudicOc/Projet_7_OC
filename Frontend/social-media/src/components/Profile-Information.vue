<!----------------------ProfilConnect.vue------------------------------------------------->
<!-------AFFICHAGE DES DONNEES DE L'UTILISATEUR APRES AUTHENTIFICATION.--------->
<template>
  <main>
    <div class="container mt-4 mb-5" v-if="user">
      <div class="row justify-content-center">
        <div class="col">
          <div class="col">
            <h1 class="h3 my-2 font-weight-bold">
              Mon compte <font-awesome-icon icon="user" />
            </h1>
            <p>
              Vous y trouverez toutes les informations nécessaires de votre
              compte
            </p>
          </div>
          <section class="row">
            <div class="col">
              <div class="card color-bg my-3">
                <div class="card-header">
                  <div class="row justify-content-around">
                    <p class="m-1">Bonjour {{ user.firstname }} !</p>
                  </div>
                </div>
                <div class="card text-center">
                  <div class="text-center">
                    <p>Informations personnelles</p>

                    <!--DEBUT DU FORMULAIRE-->
                    <!--Le formulaire doit être capable de modifier le mail affiché de l'utilisateur-->
                    <p class="font-weight-bold" for="change-email">
                      Besoin de modifier votre adresse e-mail ?
                    </p>
                    <form class="background-style">
                      <div class="form-group">
                        <label class="form-label">Prénom</label>
                        <input
                          type="text"
                          class="form-control"
                          :value="user.firstname"
                        />
                      </div>
                      <div class="form-group">
                        <label class="form-label">Nom</label>
                        <input
                          type="text"
                          class="form-control"
                          :value="user.lastname"
                        />
                      </div>

                      <div class="form-group">
                        <label for="email" class="form-label">Email</label>

                        <input
                          type="email"
                          class="form-control"
                          :value="user.email"
                        />
                      </div>

                      <div class="btn rounded p-1">
                        <p>
                          Une fois votre profil mise à jours, vous serez
                          redirigé vers la page de connexion*
                        </p>

                        <button
                          class="rounded p-2"
                          @click.prevent="updateProfil"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </form>
                    <!--FIN DU FORMULAIRE-->
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
                      site seront supprimé definitevement 😢.
                    </button>
                  </div>
                </div>

                <div class="card-body mx-auto">
                  <div class="btn-danger rounded p-1">
                    <button class="rounded p-2" @click="deleteAccount">
                      Supprimer mon compte .
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import UsersDataService from "../Service/UsersDataService";
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: "ProfilConnect",
  data() {
    return {
      user: {},
      firstname: "",
      lastname: "",
      email: "",
    };
  },

  methods: {
    getProfilUser() {
      UsersDataService.getUser()
        .then((response) => {
          let token = localStorage.getItem("token");
          let decoded = VueJwtDecode.decode(token);
          this.user = decoded;
          console.log(response);
        })
        .catch((error) => {
          console.log(error, "error from decoding token");
        });
    },

    updateProfil() {
      let data = {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
      };
      UsersDataService.putUser(data);
      this.$store
        .dispatch("logout")
        .then((response) => {
          this.data = response.data.data;
          this.$router.push("/login");
          console.log("Data: ", response.data);
        })
        .catch((error) => {
          console.error("Something went wrong!", error);
        });
    },
    deleteAccount() {
      UsersDataService.deleteUser()
        .then((response) => {
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/");
            console.log(response);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.getProfilUser();
  },
};
</script>

<style lang="scss" scoped>
$color-secondary: #ffd7d7;

.container {
  background-color: $color-secondary;
}

input {
  outline: none;
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
    transform: scale(1.03);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
    filter: brightness(1.1);
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    margin: auto;
    text-align: center;
    background-color: antiquewhite;
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
