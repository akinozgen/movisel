<template>
  <div class="movie-cover">
    <div class="front-content">
      <button class="add-to-fav" @click="addToFavs" v-if="!movieData?.isFav">
        <font-awesome-icon icon="star-half-alt" />
      </button>
      <button class="add-to-fav" @click="removeFromFavs" v-else>
        <font-awesome-icon icon="star" />
      </button>
    </div>
    <div class="back-content">
      <img v-bind:src="movieData?.poster_url" alt="">
    </div>
    <h3 class="title" v-text="movieData?.title"></h3>
    <div class="description">
      <span class="date" v-text="movieData?.release_date"></span>
      <span class="rating"><span v-text="movieData?.decimal_rating"></span>/10</span>
    </div>
    <div class="actions" v-if="AuthStore.state.isLoggedIn">
      <a href="javascript:void(0)" class="add-to-list" @click="addToList">
        <font-awesome-icon icon="plus-square" /> Listeye Ekle
      </a>
    </div>
  </div>
</template>

<script>
import AuthStore from "@/stores/AuthStore";

export default {
  data() {
    return { AuthStore };
  },
  props: {
    movieData: Object
  },
  methods: {
    addToFavs() {},
    removeFromFavs() {},
    addToList() {}
  },
  name: "MovieCover"
}
</script>

<style scoped>
  button.add-to-fav {
    background: transparent;
    border: 0;
    margin: 0;
    padding: 0.5em;
    color: white;
    cursor: pointer;
  }

  .movie-cover {
    flex: 0 0 calc(100% * (1/5) - 0px - 1px);
    position: relative;
    margin: 0 1em 5em 1em;
    height: 30em;
    overflow: hidden;
    border-radius: 10px;
    padding-bottom: 1em;
    box-shadow:
      2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
      100px 100px 80px rgba(0, 0, 0, 0.07)
    ;
  }

  .movie-cover .front-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  .movie-cover .back-content img {
    width: 100%;
  }

  .movie-cover .description {
    display: flex;
    align-content: center;
    justify-content: space-between;
  }

  .movie-cover .title {
    text-align: center;
    display: inline-block;
    width: 100%;
    height: 2em;
    overflow: hidden;
    margin: 0.5em 0;
  }

  .movie-cover .date, .movie-cover .rating {
    padding: 0.5em 1em;
  }

  .movie-cover .actions a {
    color: white;
    padding: 0.5em 1em;
    text-decoration: none;
    text-align: center;
  }
</style>