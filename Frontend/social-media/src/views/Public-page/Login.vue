<template>
  <div class="about">
    <h2 class="h4 font-weight-bold text-center mt-3">
      Groupomania votre réseau social interne
    </h2>
    <form
      class="d-flex flex-column justify-content-center align-items-center mt-5"
    >
      <div class="form-group col-lg-5 pt-5">
        <input type="text" placeholder="Email" v-model="email" />
      </div>
      <div class="form-group col-lg-5 pt-5">
        <input
          type="password"
          placeholder="Mot de passe"
          v-model="password_key"
        />
      </div>

      <div class="form-group col-lg-5 text-center pt-5">
        <button type="submit" value="Submit" @click.prevent="submitLogin">
          Connexion
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormLogin",
  data() {
    return {
      email: "",
      password_key: "",
    };
  },
  methods: {
    //*******TEST Authentification dans Vue avec Vuex *******//
    submitLogin() {
      let email = this.email;
      let password_key = this.password_key;
      //--- Nous devons faire appel au store ---//
      this.$store
        .dispatch("submitLogin", { email, password_key })
        .then(() => this.$router.push("/profil"))
        .catch((err) => console.log(err));
      //***************Action Vuex submitLogin***************************/
    },
  },
};
</script>
<style lang="scss" scoped>
$color-primary: #fd2d01;
$color-secondary: #ffd7d7;
$color-tertiary: #4e5166;

.form-group {
  input {
    border: none;
    border-bottom: 2px solid #ddd;
    width: 100%;
  }
}
button {
  height: 3.4rem;
  width: 12rem;
  border-radius: 2em;
  font-size: 14px;
  background: linear-gradient(25deg, $color-primary, $color-secondary);
  border: none;
  letter-spacing: 0.08em;
  cursor: pointer;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  transition-property: transform;
  transition-duration: 400ms;
  &:hover {
    transform: scale(1.15);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
    filter: brightness(1.1);
  }
}
</style>
