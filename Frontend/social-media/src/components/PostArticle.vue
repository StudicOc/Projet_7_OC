<template>
  <div class="container">
    <h1 class="h4 font-weight-bold text-center mt-3">
      Poster des maintenant votre article
    </h1>
    <p class="font-weight-bold text-center">
      Nous vous rappelons que notre modérateur pourra supprimer votre poste si
      ce dernier ne respectes pas les règle de respect d'autrui*
    </p>

    <form
      method="POST"
      class="d-flex flex-column justify-content-center align-items-center mt-5"
    >
      <div class="form-group col-lg-5 pt-3">
        <label for="title">Titre :</label>
        <input type="text" name="title" id="title" v-model="title" />
      </div>

      <div class="form-group col-lg-5 pt-5">
        <label for="message">Mon message :</label><br />
        <textarea
          name="message"
          id="message"
          v-model="description"
          class="p-5"
        ></textarea>
      </div>

      <div class="form-group col-lg-5 text-center pt-3">
        <button type="submit" value="Submit" @click.prevent="submitArticle">
          Poster mon article
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PostArticle",
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    submitArticle() {
      if (/^.{1,10}$/.test(this.title)) {
        alert("Votre titre doit contenir  au moins 10 caractères.");
        return;
      }
      const data = {
        title: this.title,
        description: this.description,
      };
      axios
        .post("http://localhost:3000/api/article/add", data)
        .then((response) => {
          console.log(response.data);
          alert("Message posté");
          window.location.reload();
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
