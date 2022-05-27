<template>
  <div v-for="article of articles" :key="article._id">
    <router-link :to="`/article/${article._id}`">
      <div class="card mb-4">
        <p class="card-header me-auto font-weight-bolder">
          Animé par : {{ article.userId }}, le :
        </p>

        <div class="card-body">
          <h1 class="card-title h6 font-weight-bolder font-italic">
            {{ article.title }}
          </h1>
          <p class="card-text">{{ article.description }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import ArticleDataService from "../Service/ArticleDataService";

export default {
  name: "ArticlesList",
  data() {
    return {
      articles: [],
    };
  },

  methods: {
    showArticles() {
      ArticleDataService.getAll()

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
    this.showArticles();
  },
};
</script>

<style lang="css" scoped>
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
