<template>
  <div class="container">
    <div class="backdrop" v-bind:style="{ backgroundImage: `url('${TMDBStore.state.currentMovieDetail?.backdrop_path}')` }"></div>
    <div class="movie-detail">
      <div class="left flex-4">
        <v-lazy-image v-bind:src="TMDBStore.state.currentMovieDetail?.poster_path" />
      </div>
      <div class="right flex-8">
        <div class="top-details">
          <span class="status" v-text="TMDBStore.state.currentMovieDetail?.status"></span>
          <span class="release_date" v-text="TMDBStore.state.currentMovieDetail?.release_date"></span>
          <span class="rating" v-text="TMDBStore.state.currentMovieDetail?.vote_average"></span>
        </div>
        <div class="details">
          <h1 class="title" v-text="TMDBStore.state.currentMovieDetail?.title"></h1>
          <h3 class="tagline" v-text="TMDBStore.state.currentMovieDetail?.tagline"></h3>
          <p class="overview" v-text="TMDBStore.state.currentMovieDetail?.overview"></p>
          <p class="runtime">
            <span v-text="TMDBStore.state.currentMovieDetail?.runtime"></span>
            Dakika
          </p>
        </div>
        <div class="links">
          <a target="_blank" v-bind:href="TMDBStore.state.currentMovieDetail?.homepage" class="homepage">
            <font-awesome-icon icon="external-link-alt" />
            Web Sitesi
          </a>
          <a target="_blank"
             v-bind:href="`https://www.imdb.com/title/${TMDBStore.state.currentMovieDetail?.imdb_id}`"
             class="imdb">
            <font-awesome-icon :icon="['fab', 'imdb']" />
            IMDB
          </a>
        </div>
        <div class="genres">
          <h4 class="genres-title">Türler</h4>
          <ul class="genres-list">
            <li v-bind:key="genre.id" v-for="genre in TMDBStore.state.currentMovieDetail?.genres">
              <router-link to="/" v-text="genre.name"></router-link>
            </li>
          </ul>
        </div>
        <div class="companies">
          <h4 class="companies-title">Yapımcılar</h4>
          <ul class="companies-list">
            <li v-for="comp in TMDBStore.state.currentMovieDetail?.production_companies.filter(c => c.logo_path)"
                v-bind:key="comp.id">
              <img v-bind:src="comp.logo_path" v-bind:alt="comp.name">
              <span v-text="comp.name"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="cast">
      <h1 class="cast-title">Kadro</h1>
      <carousel snap-align="center" items-to-show="5.5">
        <slide v-for="cast in TMDBStore.state.movieCredits[this.movieId]" :key="cast.id">
          <Cast v-bind:cast="cast" />
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import vLazyImage from 'v-lazy-image';
import { Carousel, Slide } from 'vue3-carousel';
import TMDBStore from "../stores/TMDBStore";
import Cast from "../components/Cast";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import 'vue3-carousel/dist/carousel.css';

export default {
  name: "FilmDetay",
  components: { vLazyImage, Carousel, Slide, Cast, FontAwesomeIcon },
  data() {
    return {
      movieId: 0,
      TMDBStore
    };
  },
  async mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.movieId = this.$route.params.id;
    await this.getMovieData();
  },
  methods: {
    async getMovieData() {
      TMDBStore.commit('getMovieData', {
        id: this.movieId
      });
      TMDBStore.commit('getMovieCredits', {
        id: this.movieId
      });
    }
  }
}
</script>

<style scoped>
.cast {
  margin-top: 10em;
  margin-bottom: 20em;
}

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
  opacity: .5;
}

.movie-detail {
  margin-top: 5em;
  display: flex;
  align-items: start;
  justify-content: space-between;
}

.movie-detail .left, .movie-detail .right {
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
}

.movie-detail .left img {
  width: 90%;
  border-radius: 10px;
  box-shadow:
    2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07);
}

.flex-4 {
  flex: 4;
}

.flex-8 {
  flex: 8;
}

.companies-list, .genres-list {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.companies-list li {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.companies-list li img {
  width: auto;
  margin: 2px 1em;
  height: 2em;
  overflow: hidden;
}

.genres-list a {
  padding: .5em 1em;
  margin: .2em .5em;
  background-color: #8a73e7;
  color: white;
  text-decoration: none;
  border-radius: 100px;
  transition: all .3s ease;
}

.genres-list a:hover {
  background-color: #27213f;
}

.links a {
  transition: all .3s ease;
  border: 3px solid #8a73e7;
  text-decoration: none;
  border-radius: 100px;
  padding: .5em 1em;
  margin-right: 1em;
  color: white;
}

.links a:hover {
  background-color: #8a73e7;
}

.runtime {
  font-size: 1.5em;
}

</style>