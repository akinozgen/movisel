<template>
  <div class="container mx-auto md:w-10/12 sm:w-full md:w-auto flex-wrap">
    <div class="header flex align-middle justify-between mb-10 sm:flex-wrap md:flex-nowrap">
      <div class="page-title mt-10 flex">
        <h1 class="text-3xl font-bold sm:w-full md:w-auto">
          Vizyondaki Popüler
        </h1>
        <select v-model="type"
                v-on:change="changeType"
                class="sm:w-full md:w-auto type-select-header ml-2 text-3xl border-b-2 border-indigo-300 mt-0.5 font-bold">
          <option :selected="type === 'movie'" v-bind:value="'movie'" :key="1">Filmler</option>
          <option :selected="type === 'tv'" v-bind:value="'tv'" :key="2">Diziler</option>
        </select>
      </div>
      <div class="pagination small mt-5 sm:w-full md:w-auto">
        <button
            class="prev btn bg-neutral btn-circle btn-sm"
            v-bind:class="{ disabled: TMDBStore.state.activePage === 1 || isLoading }"
            @click="prevPage">
          <font-awesome-icon icon="caret-left"/>
        </button>
        
        <button @click="firstPage"
                class="btn pointer-events-none btn-circle btn-outline btn-sm mx-2 flex align-middle justify-center">
          {{ TMDBStore.state.activePage }}
        </button>

        <button
            class="next btn bg-neutral btn-circle btn-sm"
            @click="nextPage"
            v-bind:class="{ disabled: TMDBStore.state.showcaseMaxPages === TMDBStore.state.activePage || isLoading }">
          <font-awesome-icon icon="caret-right"/>
        </button>
      </div>
    </div>
    <div class="container flex flex-wrap align-text-top justify-between">
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

<script setup>
import TMDBStore from "@/stores/TMDBStore";
import MovieCover from "@/components/MovieCover.vue";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { changeTitle } from "../helpers/titleHelper";

const isLoading = ref(false);
const type = ref('movie');
const title = `Vizyondaki Popüler ${(type.value === 'movie' ? 'Filmler' : 'Diziler')}`;
changeTitle(title);

onMounted(() => {
  isLoading.value = false;
  if (TMDBStore.state.showcaseMovies.length > 0) return;
  loadShowcaseMovies();
});

async function changeType() {
  const title = `Vizyondaki Popüler ${(type.value === 'movie' ? 'Filmler' : 'Diziler')}`;
  changeTitle(title);

  await loadShowcaseMovies();
}

async function nextPage() {
  if (TMDBStore.state.activePage === TMDBStore.state.showcaseMaxPages) return;
  isLoading.value = true;
  TMDBStore.state.activePage++;
  await loadShowcaseMovies();
  isLoading.value = false;
}

async function prevPage() {
  if (TMDBStore.state.activePage === 1) return;
  isLoading.value = true;
  TMDBStore.state.activePage--;
  await loadShowcaseMovies();
  isLoading.value = false;
}

async function firstPage() {
  isLoading.value = true;
  TMDBStore.state.activePage = 1;
  await loadShowcaseMovies();
  isLoading.value = false;
}

async function loadShowcaseMovies() {
  await TMDBStore.commit('loadShowcaseMovies', {
    page: TMDBStore.state.activePage,
    type: type.value
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
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

  .grid.start {
    justify-content: flex-start;
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
    background-color: transparent;
    color: white;
    font-family: 'Alegreya Sans', sans-serif;
    font-weight: 600;
    -moz-appearance: none;
    -webkit-appearance: none;
    padding: 0 .5em;
  }

  .type-select-header option {
    color: black;
  }

  .type-select-header::-ms-expand {
    display: none;
  }

</style>