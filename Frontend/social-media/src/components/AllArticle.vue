<template>
  <section>
    <div class="text-center">
      <button class="message mb-2 mt-2">
        <strong>Publications</strong>
        <p>Pour modifier votre article cliquez dessus... 😉</p>
      </button>
    </div>
    <div v-for="article of articles" :key="article._id">
      <router-link :to="{ name: 'ArticleID', params: { id: article._id } }">
        <!-- <router-link :to="{ name: 'ArticleID', params: { id: article._id } }">-->
        <article>
          <div class="card mb-4">
            <p class="card-header me-auto">
              <strong> Publié par :</strong> {{ article.userId }},
              <strong>le </strong>
              {{ formatDate(article.createdAt) }}
            </p>

            <div class="card-body">
              <h1 class="card-title h6 font-weight-bolder font-italic">
                {{ article.title }}
              </h1>
              <p class="card-text">{{ article.description }}</p>
            </div>
            <div
              class="card-footer"
              v-if="article.userId == user.userId || user.isAdmin == 1"
            >
              <button
                type="submit"
                class="badge badge-success"
                @click="updateArticle"
              >
                Update
              </button>
            </div>
          </div>
        </article>
      </router-link>
    </div>
  </section>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
import FormatDateDay from "../Service/FormatDateDay";
export default {
  name: "AllArticle",
  data() {
    return {
      user: {},
      articles: [],
    };
  },
  mixins: [FormatDateDay],
  computed: {
    formattedDate() {
      return this.formatDate(this.createdAt);
    },
  },

  methods: {
    showArticles() {
      axios
        .get("http://localhost:3000/api/articles", {
          headers: {
            Authorization: "Bearer, " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.articles = response.data;
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
    this.showArticles();
  },
};
</script>

<style lang="scss" scoped>
$color-primary: #fd2d01;
$color-secondary: #ffd7d7;
$color-tertiary: #4e5166;
.card-header {
  background-color: #ffd7d7;
}
a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: inherit;
  text-decoration: none;
}
</style>
