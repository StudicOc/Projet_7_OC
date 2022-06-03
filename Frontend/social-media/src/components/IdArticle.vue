<template>
  <section>
    <div class="text-center">
      <button class="message mb-2 mt-2">
        <strong>Publications</strong>
        <p>Modifier votre article ou supprimer 😉</p>
      </button>
    </div>

    <article>
      <div class="card mb-4">
        <p class="card-header me-auto">
          <strong> Publié par :</strong> {{ article.userId }},
          <strong>le </strong>
          {{ formatDate(article.createdAt) }}
        </p>
        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="article.title"
              />
            </div>
            <div class="form-group">
              <label for="title">Description</label>
              <textarea
                type="text"
                class="form-control"
                id="title"
                v-model="article.description"
              />
            </div>
          </form>
          <div
            class="card-footer"
            v-if="article.userId == user.userId || user.isAdmin == 1"
          >
            <button
              type="submit"
              class="badge badge-success"
              @click="updateArticle"
            >
              Update
            </button>
            <button
              type="submit"
              class="badge badge-danger"
              @click="deleteArticle"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import FormatDateDay from "../Service/FormatDateDay";
import axios from "axios";
export default {
  name: "IdArticle",
  data() {
    return {
      user: {},
      article: {},
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

  methods: {
    updateArticle() {
      const data = {
        title: this.article.title,
        description: this.article.description,
      };
      axios
        .put(
          "http://localhost:3000/api/article/" + this.$route.params.id,
          data,

          {
            headers: {
              Authorization: "Bearer, " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          response.data = this.data;
          alert("Votre poste est modifié avec succés");
          this.$router.push("/articles");
        })
        .catch((error) => {
          console.error("Something went wrong!", error);
        });
    },

    deleteArticle() {
      axios
        .delete("http://localhost:3000/api/article/" + this.$route.params.id, {
          headers: {
            Authorization: "Bearer, " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          alert("Votre poste est supprimé avec succés");
          this.$router.push("/articles");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    let token = localStorage.getItem("token");
    let decoded = VueJwtDecode.decode(token);
    this.user = decoded;
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

.button-1 {
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
