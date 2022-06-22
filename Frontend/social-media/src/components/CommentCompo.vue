<template>
  <div>
    <ul class="list-group p-2">
      <li class="list-group-item">
        <strong
          >{{ comment.user.firstname }} {{ comment.user.lastname }}</strong
        >
        <br />
        {{ comment.description }}
      </li>
    </ul>
    <div v-if="comment.UserId == user.userId || user.isAdmin == 1">
      <button
        type="submit"
        class="badge badge-danger style-btn"
        aria-label="Modifier un article"
        @click="removeComment(comment.idcomment)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
export default {
  name: "CommentCompo",
  data() {
    return {
      user: {},
    };
  },
  props: ["comment"],

  methods: {
    removeComment(id) {
      axios
        .delete("http://localhost:3000/api/article/" + id + "/comment", {
          headers: {
            Authorization: "Bearer, " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(id);
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("Une erreur s'est produite");
        });
    },
  },

  mounted() {
    let token = localStorage.getItem("token");
    let decoded = VueJwtDecode.decode(token);
    this.user = decoded;
  },
};
</script>

<style lang="scss" scoped>
.list-group-item {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
