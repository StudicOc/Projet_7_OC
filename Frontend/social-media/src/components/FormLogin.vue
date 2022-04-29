<template>
  <div class="about">
    <h2 class="h4 fw-bold text-center mt-3">
      Groupomania et votre réseau social interne
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
import axios from "axios";
export default {
  name: "FormLogin",
  data() {
    return {
      email: "",
      password_key: "",
    };
  },
  methods: {
    submitLogin() {
      const login = {
        email: this.email,
        password_key: this.password_key,
      };
      axios
        .post("http://localhost:3000/api/auth/login", login)
        .then((response) => {
          let token = response.data.token;
          localStorage.setItem("token", token);
          console.log(token);
          this.$router.push("/profil");
        })
        .catch((error) => {
          alert("Un utilisateur est déjà inscrit avec cette mail");
          console.log(error);
        });
    },
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
  height: 3.4rem;
  width: 12rem;
  border-radius: 1em;
  font-size: 14px;
  background: linear-gradient(25deg, #3c969c, rgb(72, 14, 86));
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  transition-property: transform;
  transition-duration: 400ms; /* 400ms pour arriver et partir*/
  -moz-transition-property: transform;
  -moz-transition-duration: 400ms;
  -webkit-transition-property: transform;
  -webkit-transition-duration: 400ms;
  &:hover {
    transform: scale(1.15);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
    filter: brightness(1.1);
    -webkit-transform: scale(1.15);
    -moz-transform: scale(1.15);
    -ms-transform: scale(1.15);
    -o-transform: scale(1.15);
    /*animation: name duration timing-function delay iteration-count direction fill-mode;*/
  }
}
</style>
