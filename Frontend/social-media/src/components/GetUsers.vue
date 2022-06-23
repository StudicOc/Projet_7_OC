<template>
  <div class="mt-4">
    <div class="card">
      <div class="card-header pb-0 border-0">
        <h5 class="card-title mb-2 font-weight-bold">Suggestion d'ami</h5>
      </div>
      <div class="card-body">
        <div v-for="user of users" :key="user.userId" class="mt-4">
          <div class="seperate-span">
            <span> <font-awesome-icon icon="user" /></span
            ><a class="h6 mb-0 font-weight-bold mt-2 ml-2" href="#!">
              {{ user.firstname }} {{ user.lastname }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    showUsers() {
      axios
        .get("http://localhost:3000/api/auth/users", {
          headers: {
            Authorization: "Bearer, " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error(
            "Une erreur s'est produite, aucune donnée retrouvées",
            error
          );
        });
    },
  },
  mounted() {
    let token = localStorage.getItem("token");
    let decoded = VueJwtDecode.decode(token);
    this.user = decoded;
    this.showUsers();
  },
};
</script>

<style lang="css" scoped>
a {
  line-height: 1.25;
  color: #14191e;
  text-decoration: none;
}
span {
  border-radius: 50%;
  padding: 7px;
  color: blueviolet;
  border: 2px solid orange;
}
.seperate-span {
  border-bottom: 1px solid #4e5166;
  padding-bottom: 1em;
}
</style>
