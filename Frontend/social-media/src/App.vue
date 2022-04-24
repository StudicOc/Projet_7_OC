<template>
  <div id="app">
    <NavBar />
  </div>

  <!--Tous les composants auront accés à l'user ( token )-->
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
#app {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    text-transform: uppercase;
    padding: 10px;
    font-size: 14px;
    &.router-link-exact-active {
      color: white;
      background: rgb(72, 14, 86);
      border-radius: 4px;
    }
  }
}
/*Animation loading spinner*/
.loader-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: white;
  /*animation-fill-mode:forwards;
  */ /*animation-delay:3s;
  */ /*animation-name:;
  hidden*/
  animation: hidden 0.5s linear 1 forwards 3s;
  -moz-animation: hidden 0.5s linear 1 forwards 3s;
  -webkit-animation: hidden 0.5s linear 1 forwards 3s;
  -o-animation: hidden 0.5s linear 1 forwards 3s;
}
.loader {
  width: 120px;
  height: 120px;
  border: 6px solid #c5582e;
  border-radius: 50%;
  border-top-color: #3c969c;
  border-bottom-color: #c5582e;
  border-left-color: rgb(72, 14, 86);
  animation: spin 0.3s infinite;
  -moz-animation: spin 0.3s infinite;
  -webkit-animation: spin 0.3s infinite;
  -o-animation: spin 0.3s infinite;
}
@keyframes hidden {
  100% {
    opacity: 0; /*transparence des éléments*/
    z-index: -1;
  }
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
  }
}
</style>
