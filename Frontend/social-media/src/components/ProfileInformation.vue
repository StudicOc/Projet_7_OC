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
                  <p>Informations personnelles</p>

                  <!--DEBUT DU FORMULAIRE-->
                  <!--Le formulaire doit être capable de modifier le mail affiché de l'utilisateur-->
                  <p class="font-weight-bold">
                    Besoin de modifier votre adresse e-mail ?
                  </p>
                  <form>
                    <div class="form-group">
                      <label class="form-label">Prénom</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="user.firstname"
                        aria-label="First name"
                      />
                      <span v-if="msg.lastname">{{ msg.firstname }}</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Nom</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="user.lastname"
                        aria-label="Last name"
                      />
                      <span v-if="msg.lastname">{{ msg.lastname }}</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        v-model="user.email"
                        aria-label="Email"
                      />
                      <span v-if="msg.email">{{ msg.email }}</span>
                    </div>

                    <div class="btn rounded p-1">
                      <p>
                        Une fois votre profil mise à jours, vous serez redirigé
                        vers la page de connexion*
                      </p>

                      <button
                        type="button"
                        class="rounded p-2"
                        @click.prevent="updateProfil"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </form>
                  <!--FIN DU FORMULAIRE-->
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
import VueJwtDecode from "vue-jwt-decode";
import UsersDataService from "../Service/UsersDataService";
import axios from "axios";
export default {
  name: "ProfilConnect",
  data() {
    return {
      user: {},
      firstname: "",
      lastname: "",
      email: "",
      msg: [],
    };
  },
  watch: {
    "user.firstname"(newVal) {
      this.validateEmail(newVal);
    },
    "user.lastname"(newVal) {
      this.validateEmail(newVal);
    },
    "user.email"(newVal) {
      this.validateEmail(newVal);
    },
  },

  methods: {
    validateFirstname(newVal) {
      const regexName = /([A-Z])\w+/g;
      if (regexName.test(newVal)) {
        this.msg["firstname"] = "Format accepté";
      } else {
        this.msg["firstname"] =
          "Votre Prénom doit contenir une lettre majuscule et au moins 2 lettres ";
      }
    },

    validateLastname(newVal) {
      //const regexName = /^[a-zA-Z-\s]+$/;
      const regexName = /([A-Z])\w+/g;
      if (regexName.test(newVal)) {
        this.msg["lastname"] = "Format accepté";
      } else {
        this.msg["lastname"] =
          "Votre Prénom doit contenir une lettre majuscule et au moins 2 lettres";
      }
    },
    validateEmail(newVal) {
      if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newVal)) {
        this.msg["email"] = "Mail valide";
      } else {
        this.msg["email"] = "Le format mail n'est pas respecté";
      }
    },

    updateProfil() {
      let data = {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
      };

      this.$store.dispatch("logout");
      UsersDataService.putUser(data)
        .then((response) => {
          this.data = response.data;
          console.log("Data: ", response.data);
          this.$router.push("/login");
          alert("Modification prise en compte, veuillez-vous reconnecter!");
          //refresh token
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
    axios
      .get("http://localhost:3000/api/profil/", {
        headers: {
          Authorization: "Bearer, " + localStorage.getItem("token"),
        },
      })
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
