<template>
  <div container v-if="user">
    <div class="container-fluid d-flex justify-content-center text-center my-5">
      <div class="col-md-4">
        <div class="card mb-3">
          <div class="card-header bg-transparents fw-bold">Mon profil</div>

          <div class="card-body">
            <h5 class="card-title"><i class="fas fa-thumbs-up"></i></h5>
            <p class="card-text fw-bold">
              Nom : <br />
              {{ user.firstname }} {{ user.lastname }}
            </p>
            <p class="fw-bold">
              Email de connexion:
              <br />
              {{ user.email }}
            </p>
            <br />
          </div>

          <div class="card-footer">
            <button
              type="button"
              class="btn btn-success mb-3"
              @click="modifyAccount"
            >
              Modifier mon compte
            </button>
            <button type="button" class="btn btn-danger" @click="deleteAccount">
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="!user">
    <p>Vous n'êtes pas connecté</p>
  </div>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "ProfilConnect",
  data() {
    return {
      user: null,
    };
  },

  methods: {
    getUserDetails() {
      axios
        .get("http://localhost:3000/api/profil")
        .then((response) => {
          // get token from localstorage
          let token = localStorage.getItem("user");
          //decode token here and attach to the user object
          let decoded = VueJwtDecode.decode(token);
          this.user = decoded;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  //LIFECYCLE HOOK HANDLING
  created() {
    this.getUserDetails();
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
  width: 15rem;
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
