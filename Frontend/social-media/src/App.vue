<!-- ./src/App.vue -->

<template>
  <!-- Header -->
  <div id="app">
    <div class="top-bar">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <div class="navbar-nav" v-if="isLoggedIn">
              <!--Lien de de notre nav relié au routeur-->
              <router-link v-if="isLoggedIn" to="/profil"
                >Mon espace</router-link
              >
              <router-link v-if="isLoggedIn" to="/article/add"
                >Poster un article</router-link
              >

              <router-link v-if="isLoggedIn" to="/articles"
                >Article</router-link
              >
              <a href="#" v-if="isLoggedIn" class="nav-link" @click="logout"
                >Logout</a
              >
            </div>
            <span v-else>
              <!--Lien de de notre nav relié au routeur-->
              <div class="navbar-nav">
                <router-link to="/">Groupomania</router-link>
                <router-link to="/signup">Inscription</router-link>
                <router-link to="/login">Login</router-link>
              </div>
            </span>
          </div>
        </div>
      </nav>

      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  // Propriété calculée //
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },

  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

html {
  background-color: #f1f1f1;
}
#app {
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}

nav {
  background-color: #2c3e50;
  color: white;
  a {
    font-size: 15px;
    text-decoration: none;
    padding: 10px;
    font-size: 14px;
    color: inherit;
  }
}
</style>
