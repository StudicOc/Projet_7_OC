<template>
  <div class="hello py-5">
    <h1 class="font-weight-bold">Groupomania</h1>
    <p>Un réseau social disponible depuis votre smartphone<br /></p>
    <h2 class="font-weight-boldh3 mt-5">
      Les avantages de rejoindre vore réseau social interne
    </h2>

    <ul class="d-flex flex-column">
      <li>Développer l'engagement et la cohésion entre collégues.</li>
      <li>Un formidable outil d'entraide et de partage des connais-sances.</li>
      <li>S'exprimer sur son ressenti et son bien être au travail.</li>
      <li>Booster votre motivation.</li>
    </ul>
    <h2 class="font-weight-bold h3 mt-5">Contact</h2>

    <ul>
      <li>
        Un problème technique pour vous connecter où vous inscrite <br />
        Contactez notre équipe de maintenance.
        <a href="mailto:contact@groupomania.com">Directement par mail</a><br />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AboutGroupomania",
};
</script>

<style scoped lang="scss">
.hello {
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
