<template>
  <form>
    <div class="form-group mt-3">
      <input
        type="text"
        class="form-control"
        placeholder="Ecrivez un commentaire...."
        v-model="description"
        aria-label="Veuillez saisir votre commentaire"
      />
    </div>
    <div class="form-group">
      <button
        type="button"
        class="btn btn-dark"
        aria-label="Envoyez votre formulaire"
        @click="postComment(articleId)"
      >
        Ajouter
      </button>
    </div>
  </form>
</template>
<script>
import axios from "axios";
export default {
  name: "PostCommentArticle",
  data() {
    return {
      article: {},
      description: "",
    };
  },
  props: ["articleId"],

  methods: {
    postComment(id) {
      let dataComment = {
        description: this.description,
      };

      axios
        .post(
          "http://localhost:3000/api/article/" + id + "/comment",
          dataComment,
          {
            headers: {
              Authorization: "Bearer, " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          alert("Commentaire ajouté");
          window.location.reload();
        })
        .catch((error) => {
          alert("Votre commentaire n'a pas pu être posté, veuillez-réessayer");
          console.log(error);
        });
    },
  },
};
</script>
