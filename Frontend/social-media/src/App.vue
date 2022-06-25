<template>
  <div id="app">
    <div class="top-bar">
      <nav class="custom-nav navbar navbar-expand-lg navbar-light bg">
        <a class="navbar-brand" href="#">Groupomania</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="navbar-nav" v-if="isLoggedIn">
            <router-link v-if="isLoggedIn" to="/profil">
              <font-awesome-icon icon="user" /> Compte
            </router-link>

            <router-link v-if="isLoggedIn" to="/articles"
              ><font-awesome-icon icon="home" />Workplace</router-link
            >
            <a href="#" v-if="isLoggedIn" @click="logout"
              ><font-awesome-icon icon="sign-out-alt" />Logout</a
            >

            <form class="form-inline">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Faire une recherche"
                aria-label="Search"
              />
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          <span v-else>
            <div class="navbar-nav">
              <router-link to="/">FAQ</router-link>
              <router-link to="/signup">Inscription</router-link>
              <router-link to="/login">Login</router-link>
            </div>
          </span>
        </div>
      </nav>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",

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

$color-primary: #fd2d01;
$color-secondary: #ffd7d7;
$color-tertiary: #4e5166;

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
  color: black;
  a {
    font-size: 15px;
    text-decoration: none;
    padding: 10px;
    font-size: 14px;
    color: black;
    font-weight: bold;
  }
}

.svg-inline--fa {
  margin-right: 2px;
}

@media only screen and (min-width: 1050px) {
  .bg {
    background: $color-secondary;
  }
}
</style>
