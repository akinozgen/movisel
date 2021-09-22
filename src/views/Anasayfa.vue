<template>
  <div class="container">
    <h1 class="page-title">Vizyondaki Popüler Filmler</h1>
    <div class="grid">
      <MovieCover
          v-bind:movie-data="movieData"
          v-for="movieData in TMDBStore.state.showcaseMovies"
          :key="movieData.id" />
    </div>
  </div>
</template>

<script>
import TMDBStore from "@/stores/TMDBStore";
import MovieCover from "@/components/MovieCover";

export default {
  name: "Anasayfa",
  data() {
    return { TMDBStore };
  },
  components: {MovieCover},
  mounted() {
    TMDBStore.commit('loadShowcaseMovies', {
      page: 1
    });
  }
}
</script>

<style scoped>
  .grid {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>