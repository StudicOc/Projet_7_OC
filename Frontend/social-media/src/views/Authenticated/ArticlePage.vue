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
      <IdArticle />
    </main>
    <aside class="aside">
      <p class="font-weight-bold">Groupes suggérés</p>
      <p>Découvrez et rejoignez des groupes dont vos collègues font partie.</p>
    </aside>
  </div>
</template>

<script>
import IdArticle from "../../components/IdArticle.vue";

export default {
  name: "PublicationPage",
  components: {
    IdArticle,
  },
};
</script>
