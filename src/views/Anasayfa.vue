<template>
  <div class="container">
    <div class="header">
      <h1 class="page-title">
        Vizyondaki Popüler
        <select v-model="type" v-on:change="changeType" class="type-select-header">
          <option :selected="type === 'movie'" v-bind:value="'movie'" :key="1">Filmler</option>
          <option :selected="type === 'tv'" v-bind:value="'tv'" :key="2">Diziler</option>
        </select>
      </h1>
      <div class="pagination small">
        <button
            class="paginate prev"
            v-bind:class="{ disabled: TMDBStore.state.activePage === 1 || isLoading }"
            @click="prevPage">
          <font-awesome-icon icon="caret-left"/>
        </button>
        <span v-text="TMDBStore.state.activePage" class="active-page" @click="firstPage"></span>
        <button
            class="paginate next"
            @click="nextPage"
            v-bind:class="{ disabled: TMDBStore.state.showcaseMaxPages === TMDBStore.state.activePage || isLoading }">
          <font-awesome-icon icon="caret-right"/>
        </button>
      </div>
    </div>
    <div class="grid">
      <MovieCover
          v-bind:movie-data="movieData"
          v-for="movieData in TMDBStore.state.showcaseMovies"
          :key="movieData.id" />
    </div>
    <div class="pagination">
      <button
          class="paginate prev"
          v-bind:class="{ disabled: TMDBStore.state.activePage === 1 || isLoading }"
          @click="prevPage">
        <font-awesome-icon icon="caret-left"/> Daha Yeni
      </button>
      <span v-text="TMDBStore.state.activePage" class="active-page" @click="firstPage"></span>
      <button
          class="paginate next"
          @click="nextPage"
          v-bind:class="{ disabled: TMDBStore.state.showcaseMaxPages === TMDBStore.state.activePage || isLoading }">
        Daha Eski <font-awesome-icon icon="caret-right"/>
      </button>
    </div>
  </div>
</template>

<script>
import TMDBStore from "../stores/TMDBStore";
import MovieCover from "../components/MovieCover";

export default {
  name: "Anasayfa",
  data() {
    return { TMDBStore, isLoading: true, type: 'movie' };
  },
  methods: {
    async nextPage() {
      if (this.TMDBStore.state.activePage === TMDBStore.state.showcaseMaxPages) return;
      this.isLoading = true;
      this.TMDBStore.state.activePage++;
      await this.loadShowcaseMovies();
      this.isLoading = false;
    },
    async prevPage() {
      if (this.TMDBStore.state.activePage === 1) return;
      this.isLoading = true;
      this.TMDBStore.state.activePage--;
      await this.loadShowcaseMovies();
      this.isLoading = false;
    },
    async firstPage() {
      this.isLoading = true;
      this.TMDBStore.state.activePage = 1;
      await this.loadShowcaseMovies();
      this.isLoading = false;
    },
    async loadShowcaseMovies() {
      await TMDBStore.commit('loadShowcaseMovies', {
        page: this.TMDBStore.state.activePage,
        type: this.type
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    async changeType() {
      await this.loadShowcaseMovies();
    }
  },
  components: {MovieCover},
  mounted() {
    this.isLoading = false;
    if (TMDBStore.state.showcaseMovies.length > 0) return;
    this.loadShowcaseMovies();
  }
}
</script>

<style>
  .grid {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10em;
  }

  .paginate {
    font-size: 20px;
    height: 4rem;
    padding: 0 2em;
    margin: 0 1em;
    border-radius: 100px;
    border: 0;
    background-color: #8a73e7;
    cursor: pointer;

    color: white;
  }

  .paginate.disabled {
    pointer-events: none;
    user-select: none;
    opacity: 0.5;
  }

  .pagination .active-page {
    font-size: 1.5em;
    width: 3rem;
    height: 3rem;
    border: 2px solid #8a73e7;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 100px;
    cursor: pointer;
  }

  .pagination.small {
    margin-bottom: 0;
  }

  .pagination.small .paginate {
    font-size: 1.2em;
    height: 2rem;
    padding: 0 0.5em;
    margin: 0 1em;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pagination.small .active-page {
    font-size: 1em;
    width: 2rem;
    height: 2rem;
  }

  .type-select-header {
    font-size: 1em;
    border: 0;
    background-color: transparent;
    color: white;
    font-family: 'Alegreya Sans', sans-serif;
    font-weight: 600;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-bottom: 2px solid #8a73e7;
    padding: 0 .5em;
  }

  .type-select-header::-ms-expand {
    display: none;
  }

</style>