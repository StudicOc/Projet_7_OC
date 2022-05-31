<template>
  <div class="text-center">
    <button class="message mb-3 mt-2">
      <strong>Publications</strong>
    </button>
  </div>
  <div v-if="article">
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
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import FormatDateDay from "../Service/FormatDateDay";
import axios from "axios";
export default {
  name: "IdArticle",
  data() {
    return {
      article: {},
      message: "",
    };
  },
  mixins: [FormatDateDay],
  computed: {
    formattedDate() {
      return this.formatDate(this.createdAt);
    },
  },
  async created() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/article/" + this.$route.params.id,
        {
          headers: {
            Authorization: "Bearer, " + localStorage.getItem("token"),
          },
        }
      );
      this.article = response.data;
    } catch (error) {
      console.log(error);
    }
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

button {
  padding: 0.5rem;
  border-radius: 2em;
  font-size: 14px;
  background: linear-gradient(25deg, $color-primary, $color-secondary);
  border: none;
  letter-spacing: 0.08em;
  cursor: pointer;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
}
</style>
