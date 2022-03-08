<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/">Home</router-link> |
      <router-link to="/inscription">Inscription</router-link> |
    </div>
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  background-color: #7888c1;
}
</style>
