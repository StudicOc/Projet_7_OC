<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav" v-if="!isLogged">
          <router-link to="/">Groupomania</router-link>
          <router-link to="/signup">Inscription</router-link>
          <router-link to="/login">Connexion</router-link>
        </div>
        <div class="navbar-nav" v-if="isLogged">
          <router-link to="/profil"> Profil </router-link>
          <!--:to="`/profil/${profil.id}`"/${id}`-->
          <router-link to="/add">Poster un article</router-link>
          <a class="nav-link" @click.prevent="logout">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </div>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<script>
export default {
  name: "NavBar",

  data() {
    return {
      isLogged: false,
    };
  },
  created() {
    this.isLogged = localStorage.getItem("token") ?? false;
  },

  methods: {
    //logout(): supprimer JWTdu stockage local
    logout() {
      this.isLogged = false;
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
