<template>
  <div class="container">
    <h1 class="page-title">Vizyondaki Popüler Filmler</h1>
    <div class="grid">
      <MovieCover
          v-bind:movie-data="movieData"
          v-for="movieData in TMDBStore.state.showcaseMovies"
          :key="movieData.id" />
    </div>
    <div class="pagination">
      <button class="paginate prev" v-bind:class="{ disabled: page === 1 }" @click="prevPage">
        <font-awesome-icon icon="caret-left"/> Daha Eski
      </button>
      <button class="paginate next" @click="nextPage" v-bind:class="{ disabled: TMDBStore.state.showcaseMaxPages === page }">
        Daha Yeni <font-awesome-icon icon="caret-right"/>
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
    return { TMDBStore, page: 1 };
  },
  methods: {
    nextPage() {
      if (this.page === TMDBStore.state.showcaseMaxPages) return;
      this.page++;
      this.loadShowcaseMovies();
    },
    prevPage() {
      if (this.page === 1) return;
      this.page--;
      this.loadShowcaseMovies();
    },
    loadShowcaseMovies() {
      TMDBStore.commit('loadShowcaseMovies', {
        page: this.page
      });
    }
  },
  components: {MovieCover},
  mounted() {
    this.loadShowcaseMovies();
  }
}
</script>

<style scoped>
  .grid {
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
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
    border-radius: 100px;
    padding: 0 2em;
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

  .paginate.prev {
    margin-right: 2em;
  }
</style>