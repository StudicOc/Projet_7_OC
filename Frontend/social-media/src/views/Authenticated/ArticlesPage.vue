<!---------------------------------->

<template>
  <div class="mt-4 site">
    <nav class="side-bar mx-4">
      <!-------1 er sous element la partie sideBar interactive--------->
      <a href="#">Fil d'actualité</a>
      <a href="#">Messages</a>
      <a href="#">Réunions</a>
      <a href="#">Évènement </a>
      <a href="#">Groupes</a>
      <a href="#">Amis</a>
    </nav>

    <!-------2 eme sous element la partie article--------->
    <main>
      <button class="message mb-3"><strong>Publications</strong></button>

      <div v-for="article of articles" :key="article._idmessage">
        <!-------Les cartes représenterons dans une boucle tous les articles de la BDD--------->

        <router-link :to="`/article/${article._idmessage}`">
          <div class="card mb-4">
            <!--Test pour vérifier si _idmessage correspond bien à son userId-->
            <p class="card-header me-auto font-weight-bolder">
              Animé par : {{ article.userId }}, le :
            </p>

            <div class="card-body">
              <h1 class="card-title h6 font-weight-bolder font-italic">
                {{ article.title }}
              </h1>
              <p class="card-text">{{ article.description }}</p>
            </div>

            <!--Affichage du button  supprimer en fonction de l'user-->
          </div>
        </router-link>
      </div>
    </main>

    <aside class="aside">
      <p class="font-weight-bold">Groupes suggérés</p>
      <p>Découvrez et rejoignez des groupes dont vos collègues font partie.</p>
    </aside>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ArticlesPage",
  data() {
    return {
      articles: [],
    };
  },

  mounted() {
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
        console.error("Something went wrong!", error);
      });
  },
};
</script>

<style lang="css" scoped>
.card-header {
  background: linear-gradient(25deg, #3c969c, rgb(171, 135, 180));
}

.side-bar a {
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 0.5em 0;
  text-align: center;
}
.side-bar a:hover,
.side-bar a:active {
  color: black;
  border: solid 1px #dbdbdb;
  border-radius: 5px;
  background: #f19a88;
  font-weight: bold;
}
a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: inherit;
  text-decoration: none;
}

.message {
  border: solid 1px #dbdbdb;
  border-radius: 5px;
  background: #f19a88;
  padding: 8px;
}
.badge {
  color: black;
}

.card-footer {
  cursor: pointer;
}
@media only screen and (min-width: 1050px) {
  .site {
    display: flex;
    justify-content: space-between;
  }

  .side-bar {
    width: 180px;
  }
  .aside {
    width: 310px;
  }
}
</style>
