<template>
  <div class="container">
    <div class="header">
      <h1 class="page-title">Favorilerim</h1>
    </div>
    <div class="grid">
      <MovieCover
          v-bind:movie-data="movieData"
          v-for="movieData in TMDBStore.state.userFavs"
          :key="movieData.id" />
    </div>
  </div>
</template>

<script>
import AuthStore from "../stores/AuthStore";
import MovieCover from "@/components/MovieCover";
import TMDBStore from "@/stores/TMDBStore";
import router from "../router";

export default {
  name: "Favorilerim",
  components: { MovieCover },
  data() {
    return { AuthStore, TMDBStore, };
  },
  methods: {
  },
  mounted() {
    if (!AuthStore.state.isLoggedIn) {
      return router.push('/');
    }

    TMDBStore.commit('getUserFavs', {
      userFavs: AuthStore.state.userFavs
    });
  }
}
</script>

<style scoped>

</style>