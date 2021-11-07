<template>
  <div class="container">
    <div class="backdrop" v-bind:style="{ backgroundImage: `url('${TMDBStore.state.currentMovieDetail?.backdrop_path}')` }"></div>
    <div class="movie-detail">
      <div class="left flex-4">
        <div class="img-container">
           <div class="front-content">
            <div class="fav-buttons" v-if="AuthStore.state.isLoggedIn">
              <button class="add-to-fav" @click.prevent="addToFavs" v-if="!isFav()">
                <font-awesome-icon :icon="['far', 'star']" />
              </button>
              <button class="add-to-fav" @click.prevent="removeFromFavs" v-else>
                <font-awesome-icon :icon="['fas', 'star']" class="fav" />
              </button>
            </div>
          </div>
          <v-lazy-image v-bind:src="TMDBStore.state.currentMovieDetail?.poster_path" />
        </div>
      </div>
      <div class="right flex-8">
        <div class="top-details">

          <span class="status"
                v-bind:style="{ backgroundColor: tmdbMovieStatuses[TMDBStore.state.currentMovieDetail?.status]?.color }"
                v-text="tmdbMovieStatuses[TMDBStore.state.currentMovieDetail?.status]?.text"></span>

          <span class="rating">
            <span v-text="TMDBStore.state.currentMovieDetail?.vote_average"></span>
            <span>/10</span>
          </span>

        </div>
        <div class="details">
          <h1 class="title" v-text="TMDBStore.state.currentMovieDetail?.title"></h1>
          <h3 class="tagline" v-text="TMDBStore.state.currentMovieDetail?.tagline"></h3>
          <p class="overview" v-text="TMDBStore.state.currentMovieDetail?.overview"></p>
          <p class="runtime">
            <span v-text="TMDBStore.state.currentMovieDetail?.runtime"></span>
            Dakika
          </p>
          <div class="add-to-list">
            <a tabindex="1"
               href="javascript:void(0)"
               class="dropdown-button"
               @focusin="toggleDropdown"
               @focusout="toggleDropdown">
              <font-awesome-icon icon="plus-square" />
              Listeye Ekle
              <ul tabindex="1" class="dropdown-list" v-bind:class="{ show: dropdownOpen }">
                <li v-for="list in AuthStore.state.userLists" :key="list.id">
                  <a @mousedown="addToList" href="javascript:void(0)" :data-list="list.id">{{ list.title }}</a>
                </li>
              </ul>
            </a>
          </div>
          <p class="release_date">
            Vizyon Tarihi:
            <span>
              {{ TMDBStore.state.currentMovieDetail?.release_date }}
            </span>
            <a v-bind:href="TMDBStore.state.currentMovieDetail?.eventUrl"
               class="create-event"
               target="_blank"
               v-if="TMDBStore.state.currentMovieDetail?.isFuture()">
              <font-awesome-icon icon="calendar" />
              Etkinlik Oluştur
            </a>
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
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="seasons" v-if="type === 'tv'">
      <h1 class="seasons-title">Sezonlar</h1>
      <div class="grid">
        <season-cover
            :season-data="season"
            v-for="season in TMDBStore.state.currentMovieDetail.seasons"
            :key="season.id" />
      </div>
    </div>

    <div class="cast">
      <h1 class="cast-title">Kadro</h1>
      <carousel snap-align="center"
                items-to-show="5"
                :mouseDrag="false"
                :currentSlide="5">
        <slide v-for="cast in TMDBStore.state.movieCredits[this.movieId]" :key="cast.id">
          <Cast v-bind:cast="cast" />
        </slide>
        <template #addons>
          <Navigation />
        </template>
      </carousel>
    </div>

    <div class="similar">
      <h1 class="similar-title">
        Benzer İçerikler
      </h1>
      <div class="similar-list grid">
        <MovieCover :movie-data="movieDetails"
                    v-for="movieDetails in TMDBStore.state.currentMovieSimilars"
                    :key="movieDetails.id" />
      </div>
    </div>
  </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css';
import '../styles/dropdown.css';

import tmdbMovieStatuses from "../helpers/tmdbMovieStatuses";
import SeasonCover from "../components/SeasonCover";
import MovieCover from "../components/MovieCover";
import AuthStore from "../stores/AuthStore";
import TMDBStore from "../stores/TMDBStore";
import vLazyImage from 'v-lazy-image';
import Cast from "../components/Cast";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { computed, ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { onMounted, watch } from '@vue/runtime-core';

const $route = computed(() => useRouter().currentRoute.value);
const movieId = ref(0);
const type = ref('movie');
const dropdownOpen = ref(false);

onMounted (() => {
  movieId.value = $route.value.params.id;
  type.value = $route.value.params.type;
  getMovieData();
});

function getMovieData() {
  TMDBStore.commit('getMovieData', {
    id: movieId.value,
    type: type.value
  });
  TMDBStore.commit('getMovieCredits', {
    id: movieId.value,
    type: type.value
  });
  TMDBStore.commit('getSimilars', {
    id: movieId.value,
    type: type.value
  });
}

function addToFavs() {
  if (!AuthStore.state.isLoggedIn) return false;
  AuthStore.commit('addToFavs', {
    id: movieId.value,
    type: type.value
  });
}

function removeFromFavs() {
  if (!AuthStore.state.isLoggedIn) return false;
  AuthStore.commit('removeFromFavs', {
    id: movieId.value,
    type: type.value
  });
}

function isFav() {
  if (!AuthStore.state.isLoggedIn)
    return false;

  let inFavs = AuthStore
      .state
      .userFavs
      .filter(f => parseInt(f?.item_id) === parseInt(movieId.value) && f?.type === type.value);

  return inFavs.length > 0;
}

function addToList(event) {
  let listId = event.currentTarget.dataset.list;
  let movieData = TMDBStore.state.currentMovieDetail;
  AuthStore.commit('addToList', {
    item_id: TMDBStore.state.currentMovieDetail.id,
    list_id: listId,
    item_type: TMDBStore.state.currentMovieDetail.item_type,
    movie_data: {
      id: movieData.id,
      title: movieData.item_type === 'movie' ? movieData.title : movieData.name,
      decimal_rating: movieData.vote_average,
      release_date: movieData.item_type === 'movie' ? movieData.release_date : movieData.first_air_date,
      poster_url: `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`,
      item_type: movieData.item_type
    }
  });
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

watch(() => $route, () => {
  const { id, type: movieType } = $route.value.params;
  movieId.value = id;
  type.value = movieType;
  getMovieData();
});
</script>

<style scoped>
.cast, .similar {
  margin-top: 10em;
  margin-bottom: 5em;
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
  background-color: #739ce7;
  color: white;
  text-decoration: none;
  border-radius: 100px;
  transition: all .3s ease;
}

.genres-list a:hover {
  background-color: #21353f;
}

.links a {
  transition: all .3s ease;
  border-bottom: 3px solid #739ce7;
  text-decoration: none;
  padding: .5em 1em;
  margin-right: 1em;
  color: white;
}

.links a:hover {
  border-color: white;
}

.runtime {
  font-size: 1.5em;
}

.release_date {
  padding: 2em 0;
  margin: 0;
}

.release_date .create-event {
  color: white;
  text-decoration: none;
  padding: 1em 1.5em;
  display: inline-block;
  background-color: #739ce7;
  margin-left: 2em;
  border-radius: 100px;
  font-size: 0.75em;
}

.top-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.top-details .status {
  display: inline-block;
  padding: 0.4em 0.8em;
  border-radius: 10px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.3));
  box-shadow:
    0.3px 0.4px 1.4px rgba(0, 0, 0, 0.028),
    0.9px 1.3px 3.7px rgba(0, 0, 0, 0.042),
    4px 6px 18px rgba(0, 0, 0, 0.07)
  ;
}

.top-details .rating {
  display: inline-block;
  font-size: 1.5rem;
}

.top-details .rating span:first-child {
  font-weight: bold;
}

.top-details .rating span:last-child {
  font-size: 1rem;
}

.img-container {
  position: relative;
}

button.add-to-fav {
  border: 0;
  padding: 0.5em;
  color: white;
  cursor: pointer;
  background-color: rgba(0, 0, 0, .5);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  margin: 0.2em;
}

.front-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}


</style>