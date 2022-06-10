<template>
  <form>
    <div class="form-group mt-3">
      <input
        type="text"
        class="form-control"
        placeholder="Ecrivez un commentaire...."
        v-model="description"
      />
    </div>
    <div class="form-group">
      <button
        type="button"
        class="btn btn-outline-success"
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
  name: "CommentArticle",
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
          alert("Message posté");
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

<style scoped>
button,
input {
  border-radius: 6rem;
}

input {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
