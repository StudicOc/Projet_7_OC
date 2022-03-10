<template>
  <div class="home">
    <HelloWorld msg="Bienvenue dans votre réseau social interne " />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>
