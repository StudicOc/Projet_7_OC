<template>
  <section class="pb-4 mb-5">
    <div class="text-center mt-5">
      <button class="message mb-2 mt-2 first-button">
        <strong>Publications</strong>
        <p class="font-weight-bolder">
          Partager, échanger, dans une bonne cohésion 😉
        </p>
      </button>
    </div>

    <!-----------------Affichage de notre base de donnée pour les articles ---->
    <div
      id="content-articles"
      v-for="article of articles"
      :key="article._id"
      class="custom"
    >
      <article class="mt-5 p-3">
        <div class="card mb-4">
          <p class="card-header">
            <strong> Publié par :</strong> {{ article.user.firstname }}
            {{ article.user.lastname }}<br />
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

            <div class="btn-group">
              <button
                type="submit"
                class="badge badge-danger style-btn"
                aria-label="Supprimer un article"
                @click="removeItem(article._id)"
              >
                Delete
              </button>
            </div>
          </div>
          <!---------------------------- -Post comment------------------------->
          <div class="p-2 border-style">
            <Comment :articleId="article._id" />
          </div>

          <!----------------------------Affichage des commentaires------------------------->

          <div class="p-2 border-style">
            <div v-for="comment of article.Comments" :key="comment.idcomment">
              <CommentCompo :comment="comment" />
            </div>
          </div>

          <div>
            <button
              :id="article._id"
              v-if="article.Comments.length > 1"
              @click="displayComment(article._id)"
            >
              Afficher ou masquer les commentaires
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import FormatDateDay from "../Service/FormatDateDay";
import Comment from "./PostCommentArticle.vue";
import CommentCompo from "./CommentCompo.vue";
import axios from "axios";
export default {
  name: "AllArticle",
  data() {
    return {
      user: {},
      articles: [],
      comments: [],
    };
  },
  mixins: [FormatDateDay],
  computed: {
    formattedDate() {
      return this.formatDate(this.createdAt);
    },
  },
  components: {
    Comment,
    CommentCompo,
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

    displayComment(id) {
      const comment = document.getElementById(id);
      if (comment.classList.contains("hide")) {
        document.getElementById(id).classList.remove("hide");
      } else {
        document.getElementById(id).classList.add("hide");
      }
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
  background: linear-gradient($color-secondary, $color-tertiary);
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

.border-style {
  border-top: 1px solid #4e5166;
  margin: 7px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
