<template>
  <div class="mt-4 site">
    <nav class="side-bar mx-4">
      <a href="#">Fil d'actualité</a>
      <a href="#">Messages</a>
      <a href="#">Réunions</a>
      <a href="#">Évènement </a>
      <a href="#">Groupes</a>
      <a href="#">Amis</a>
    </nav>
    <main>
      <PostPublication />
      <AllArticle />
    </main>
    <aside>
      <div class="card">
        <div class="card-header text-uppercase font-weight-bold">Évènement</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <strong>15 juin</strong><br />Cocktail de fin d'année
          </li>
          <li class="list-group-item">
            <strong>25 juin</strong><br />Réunion de fin d'année
          </li>
          <li class="list-group-item">
            <strong>26 juin</strong><br />Présentation du réseau social
            Groupomania
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
import AllArticle from "../../components/AllArticle.vue";
import PostPublication from "../../components/PostArticle.vue";

export default {
  name: "PublicationPage",
  components: {
    AllArticle,
    PostPublication,
  },
};
</script>
<style lang="css">
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
  text-decoration: none;
  border: solid 1px #dbdbdb;
  border-radius: 5px;
  background: #ffd7d7;
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

@media only screen and (min-width: 1050px) {
  .site {
    display: flex;
    justify-content: space-around;
  }
}
</style>
