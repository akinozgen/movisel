<template>
  <div class="container">
    <div class="backdrop" v-bind:style="{ backgroundImage: `url('${TMDBStore.state.currentMovieDetail?.backdrop_path}')` }"></div>
    <div class="movie-detail">
      <div class="left flex-4">
        <v-lazy-image v-bind:src="TMDBStore.state.currentMovieDetail?.poster_path" />
      </div>
      <div class="right flex-8">
        <span class="status" v-text="TMDBStore.state.currentMovieDetail?.status"></span>
        <span class="release_date" v-text="TMDBStore.state.currentMovieDetail?.release_date"></span>
        <span class="rating" v-text="TMDBStore.state.currentMovieDetail?.vote_average"></span>
        <h1 class="title" v-text="TMDBStore.state.currentMovieDetail?.title"></h1>
        <h3 class="tagline" v-text="TMDBStore.state.currentMovieDetail?.tagline"></h3>
        <p class="overview" v-text="TMDBStore.state.currentMovieDetail?.overview"></p>
        <p class="runtime" v-text="TMDBStore.state.currentMovieDetail?.runtime"></p>
        <a target="_blank" v-bind:href="TMDBStore.state.currentMovieDetail?.homepage" class="homepage">
          Web Sitesi
        </a>
        <a target="_blank"
           v-bind:href="`https://www.imdb.com/title/${TMDBStore.state.currentMovieDetail?.imdb_id}`"
           class="imdb">
          IMDB
        </a>
        <div class="genres">
          <h4 class="genres-title">Türler</h4>
          <ul class="genres-list">
            <li v-bind:key="genre.id" v-for="genre in TMDBStore.state.currentMovieDetail?.genres">
              <span v-text="genre.name"></span>
            </li>
          </ul>
        </div>
        <div class="companies">
          <h4 class="companies-title">Yapımcılar</h4>
          <ul class="companies-list">
            <li v-for="comp in TMDBStore.state.currentMovieDetail?.production_companies" v-bind:key="comp.id">
              <img v-bind:src="comp.logo_path" v-bind:alt="comp.name">
              <span v-text="comp.name"></span>
            </li>
          </ul>
        </div>
      </div>
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
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: 180%;
  filter: blur(100px);
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100%;
  z-index: -1;
}

.movie-detail {
  margin-top: 5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.movie-detail .left img {
  width: 100%;
  border-radius: 10px;
  box-shadow:
    2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07)
  ;
}

.flex-4 {
  flex: 4;
}

.flex-8 {
  flex: 8;
}
</style>