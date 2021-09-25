<template>
  <div class="container">
    <div class="movie-detail">
      <div class="left flex-4">
        <v-lazy-image v-bind:src="TMDBStore.state.currentMovieDetail?.poster_path" />
      </div>
      <div class="right flex-6"></div>
    </div>
  </div>
</template>

<script>
import vLazyImage from 'v-lazy-image';
import TMDBStore from "../stores/TMDBStore";

export default {
  name: "FilmDetay",
  components: {vLazyImage},
  data() {
    return {
      movieId: 0,
      TMDBStore
    };
  },
  mounted() {
    this.movieId = this.$route.params.id;
    this.getMovieData();
  },
  methods: {
    async getMovieData() {
      TMDBStore.commit('getMovieData', {
        id: this.movieId
      });
    }
  }
}
</script>

<style scoped>

</style>