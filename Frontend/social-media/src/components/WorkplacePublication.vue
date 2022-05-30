<template>
  <section>
    <div class="container custom-container pb-3">
      <h1 class="h4 font-weight-bold text-center mt-3 pt-3">
        Poster une publication
      </h1>
      <p class="font-weight-bold text-center">
        Nous vous rappelons que notre modérateur pourra supprimer votre poste si
        ce dernier ne respectes pas les règles de respect d'autrui*
      </p>

      <router-link to="/article/add">
        <form method="POST">
          <div class="form-group">
            <label for="title">Titre</label>
            <input
              class="form-control"
              type="text"
              name="title"
              id="title"
              v-model="title"
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea
              class="form-control"
              name="message"
              id="message"
              v-model="description"
              rows="1"
            ></textarea>
          </div>
          <div class="form-group">
            <button type="submit" value="Submit" @click.prevent="submitArticle">
              Créer une publication
            </button>
          </div>
        </form>
      </router-link>
    </div>
  </section>
  <section>
    <div class="text-center">
      <button class="message mb-3 mt-2">
        <strong>Publications</strong>
      </button>
    </div>
    <div v-for="article of articles" :key="article._id">
      <!--<router-link :to="`/article/${article._id}`">-->
      <article>
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
      </article>
      <!--</router-link>-->
    </div>
  </section>
</template>

<script>
import ArticleDataService from "../Service/ArticleDataService";

export default {
  name: "WorkplacePublication",
  data() {
    return {
      articles: [],
      title: "",
      description: "",
    };
  },

  methods: {
    submitArticle() {
      if (/^.{1,10}$/.test(this.title)) {
        alert("Votre titre doit contenir  au moins 10 caractères.");
        return;
      }
      let data = {
        title: this.title,
        description: this.description,
      };
      ArticleDataService.postArticle(data)
        .then((response) => {
          console.log(response.data);
          alert("Message posté");
          window.location.reload();
        })
        .catch((error) => {
          alert("Un utilisateur est déjà inscrit avec cette mail");
          console.log(error);
        });
    },
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
  background: linear-gradient(25deg, $color-primary, $color-secondary);
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

.custom-container {
  border: 2px solid none;
  border-radius: 2em;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
}
</style>
