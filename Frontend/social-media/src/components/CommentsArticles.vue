<template>
  <div v-for="comment of comments" :key="comment.idcomment">
    <p>{{ comment.description }}</p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "CommentsArticles",
  data() {
    return {
      comments: [],
    };
  },

  methods: {
    getComment(id) {
      axios
        .get(
          "http://localhost:3000/api/article/" + id + "/comments",

          {
            headers: {
              Authorization: "Bearer, " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.comments = response.data.comments;
          console.log(response.data);
        })
        .catch((error) => {
          alert("Les commentaires n'ont pas pu être affichés");
          console.log(error);
        });
    },
  },

  mounted() {
    this.getComment();
  },
};
</script>
