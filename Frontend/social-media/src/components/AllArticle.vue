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
          </div>
        </article>
      </router-link>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import FormatDateDay from "../Service/FormatDateDay";
export default {
  name: "AllArticle",
  data() {
    return {
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
button {
  padding: 0.5rem;
  border-radius: 2em;
  font-size: 14px;
  background: linear-gradient(25deg, $color-tertiary, $color-secondary);
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
