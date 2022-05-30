<template>
  <div class="Suscribe">
    <h2 class="h4 font-weight-bold text-center mt-4">S’inscrire</h2>
    <form
      class="d-flex flex-column justify-content-center align-items-center mt-5"
    >
      <div class="form-group col-lg-5 pt-5">
        <input
          type="text"
          placeholder="Prénom"
          v-model="firstname"
          aria-label="Saisir votre prénom"
          required
        />
        <span v-if="msg.firstname">{{ msg.firstname }}</span>
      </div>
      <div class="form-group col-lg-5 pt-5">
        <input
          type="text"
          placeholder="Nom de famille"
          v-model="lastname"
          aria-label="Saisir votre nom"
          required
        />
        <span v-if="msg.lastname">{{ msg.lastname }}</span>
      </div>
      <div class="form-group col-lg-5 pt-5">
        <input
          type="text"
          placeholder="Email"
          v-model="email"
          aria-label="Saisir votre mail"
          required
        />
        <span v-if="msg.email">{{ msg.email }}</span>
      </div>
      <div class="form-group col-lg-5 pt-5">
        <input
          type="password"
          placeholder="Mot de passe"
          v-model="password_key"
          aria-label="Saisir votre mot de passe"
          required
        />
        <span v-if="msg.password_key">{{ msg.password_key }}</span>
      </div>

      <div class="form-group col-lg-5 text-center pt-5">
        <button type="submit" value="Submit" @click.prevent="submitForm">
          Inscription
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FormSignup",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password_key: "",
      isAdmin: "",
      msg: [],
    };
  },
  watch: {
    firstname() {
      this.validateFirstname(this.firstname);
    },
    lastname() {
      this.validateLastname(this.lastname);
    },
    email() {
      this.validateEmail(this.email);
    },
    password_key() {
      this.validatePassword_key(this.password_key);
    },
  },
  methods: {
    validateFirstname(firstname) {
      const regexName = /([A-Z])\w+/g;
      if (regexName.test(firstname)) {
        this.msg["firstname"] = "Format accepté";
      } else {
        this.msg["firstname"] =
          "Votre Prénom doit contenir une lettre majuscule et au moins 2 lettres ";
      }
    },

    validateLastname(lastname) {
      //const regexName = /^[a-zA-Z-\s]+$/;
      const regexName = /([A-Z])\w+/g;
      if (regexName.test(lastname)) {
        this.msg["lastname"] = "Format accepté";
      } else {
        this.msg["lastname"] =
          "Votre Prénom doit contenir une lettre majuscule et au moins 2 lettres";
      }
    },

    validateEmail(email) {
      if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        this.msg["email"] = "Mail valide";
      } else {
        this.msg["email"] = "Le format mail n'est pas respecté";
      }
    },
    validatePassword_key(password_key) {
      let difference = 8 - password_key.length;
      if (password_key.length < 8) {
        this.msg["password_key"] =
          "Doit contenir 8 caractères! " +
          difference +
          " 8 caractères restants";
      } else {
        this.msg["password_key"] = "Mot de passe valide";
      }
    },

    submitForm() {
      const dataUser = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password_key: this.password_key,
        isAdmin: this.isAdmin,
      };
      //console.log(dataUser);
      axios
        .post("http://localhost:3000/api/auth/signup", dataUser)
        .then((response) => {
          this.data = response.data;
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
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
