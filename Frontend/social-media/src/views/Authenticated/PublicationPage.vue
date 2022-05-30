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
      <WorkplacePublication />
    </main>
    <aside class="aside">
      <p class="font-weight-bold">Groupes suggérés</p>
      <p>Découvrez et rejoignez des groupes dont vos collègues font partie.</p>
    </aside>
  </div>
</template>

<script>
import WorkplacePublication from "../../components/WorkplacePublication.vue";
import PostPublication from "../../components/PostArticle.vue";

export default {
  name: "PublicationPage",
  components: {
    WorkplacePublication,
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
.message {
  border: solid 1px #dbdbdb;
  border-radius: 5px;
  background: #fd2d01;
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
