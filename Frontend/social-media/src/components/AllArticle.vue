<template>
  <section class="pb-4 mb-5">
    <div class="text-center mt-5">
      <button class="message mb-2 mt-2 first-button">
        <strong>Publications</strong>
        <p class="font-weight-bolder">
          A vos clavier, partager, échanger, c'est ici que ça se passe 😉
        </p>
      </button>
    </div>

    <p>
      Nombre de publications 😉: <strong>{{ articles.length }}</strong>
    </p>

    <!-----------------Affichage de notre base de donnée pour les articles ---->
    <div
      id="content-articles"
      v-for="article of articles"
      :key="article._id"
      class="custom"
    >
      <article class="mt-5 p-3">
        <div class="card mb-4">
          <p class="card-header me-auto">
            <strong> Publié par :</strong> {{ article.userId }} <br /><strong>
            </strong>
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
            <!-----------------------------Update article ------------------------->
            <div
              class="btn-group"
              role="group"
              aria-label="Modifier un article"
            >
              <router-link
                :to="{ name: 'ArticleID', params: { id: article._id } }"
                class="badge badge-success"
              >
                Update
              </router-link>
            </div>

            <!-----------------------------Delete article------------------------->

            <div
              class="btn-group"
              role="group"
              aria-label="Supprimer un article"
            >
              <div>
                <button
                  type="submit"
                  class="badge badge-danger style-btn"
                  @click="removeItem(article._id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <!-----------------------------Post comment------------------------->
          <div class="p-2">
            <Comment :articleId="article._id" />
          </div>
          <!-----------------------------GET all comment------------------------->
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
import FormatDateDay from "../Service/FormatDateDay";
import Comment from "./PostCommentArticle.vue";

export default {
  name: "AllArticle",
  data() {
    return {
      user: {},
      articles: [],
    };
  },
  components: {
    Comment,
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

    removeItem(id) {
      axios
        .delete("http://localhost:3000/api/article/" + id, {
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
    this.showArticles();
  },
};
</script>

<style lang="scss" scoped>
$color-primary: #fd2d01;
$color-secondary: #ffd7d7;
$color-tertiary: #4e5166;

.custom {
  background-color: #4e5166;
  border-radius: 1em;
}
.first-button {
  border: none;
  border-radius: 2em;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  background: linear-gradient(30deg, $color-secondary, $color-tertiary);
}
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

.style-btn {
  margin-left: 0.5em;
}
.card-footer {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
</style>
