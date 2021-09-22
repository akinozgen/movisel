<template>
  <div class="container">
    <div class="header">
      <div class="pagination small">
        <button
            class="paginate prev"
            v-bind:class="{ disabled: page === 1 || isLoading }"
            @click="prevPage">
          <font-awesome-icon icon="caret-left"/>
        </button>
        <span v-text="page" class="active-page" @click="firstPage"></span>
        <button
            class="paginate next"
            @click="nextPage"
            v-bind:class="{ disabled: TMDBStore.state.showcaseMaxPages === page || isLoading }">
          <font-awesome-icon icon="caret-right"/>
        </button>
      </div>
      <h1 class="page-title">Vizyondaki Popüler Filmler</h1>
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
          v-bind:class="{ disabled: page === 1 || isLoading }"
          @click="prevPage">
        <font-awesome-icon icon="caret-left"/> Daha Eski
      </button>
      <span v-text="page" class="active-page" @click="firstPage"></span>
      <button
          class="paginate next"
          @click="nextPage"
          v-bind:class="{ disabled: TMDBStore.state.showcaseMaxPages === page || isLoading }">
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
    return { TMDBStore, page: 1, isLoading: true };
  },
  methods: {
    async nextPage() {
      if (this.page === TMDBStore.state.showcaseMaxPages) return;
      this.isLoading = true;
      this.page++;
      await this.loadShowcaseMovies();
      this.isLoading = false;
    },
    async prevPage() {
      if (this.page === 1) return;
      this.isLoading = true;
      this.page--;
      await this.loadShowcaseMovies();
      this.isLoading = false;
    },
    async firstPage() {
      this.isLoading = true;
      this.page = 1;
      await this.loadShowcaseMovies();
      this.isLoading = false;
    },
    async loadShowcaseMovies() {
      await TMDBStore.commit('loadShowcaseMovies', {
        page: this.page
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },
  components: {MovieCover},
  mounted() {
    this.loadShowcaseMovies();
    this.isLoading = false;
  }
}
</script>

<style scoped>
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

</style>