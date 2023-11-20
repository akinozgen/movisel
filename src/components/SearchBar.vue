<template>
  <div class="search-bar">
    <input type="text" placeholder="Arama" @input="search" v-model="searchTerm">
    <div class="results">
      <ul>
        <li v-bind:key="res.id" v-for="res in TMDBStore.state.searchResults">
          <router-link v-bind:to="`/detay/${res.item_type}/${res.id}`" replace>
            <font-awesome-icon icon="film" v-if="res.item_type === 'movie'" />
            <font-awesome-icon icon="tv" v-else />
            {{ res.title }}
            ({{ res.decimal_rating }}/10)
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import TMDBStore from "@/stores/TMDBStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "@vue/reactivity";

const searchTerm = ref("");

function search() {
  if (searchTerm.value.length <= 3) return;
  TMDBStore.commit('search', {
    query: searchTerm.value
  });
}
</script>

<style scoped>
  .search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }

  .search-bar input {
    background-color: rgba(255, 255, 255, 0.55);
    padding: 12px 20px;
    width: 300px;
    border-radius: 100px;
    border: 0;
    box-shadow: inset
      2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
      100px 100px 80px rgba(0, 0, 0, 0.07)
    ;
    transition: all .3s ease;
    text-align: center;
  }

  .search-bar input:focus {
    background-color: white;
    border-radius: 0;
    width: 100%;
  }

  .search-bar .results {
    height: 0;
    overflow: hidden;
    position: absolute;
    transition: all .25s linear;
    bottom: 0;
    left: -20px;
    right: -20px;
    z-index: 1;
    opacity: 0;
  }

  .search-bar input:focus + .results {
    opacity: 1;
    height: 40em;
    bottom: calc(-40em);
  }

  .search-bar .results ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .search-bar .results ul li a {
    background-color: white;
    display: block;
    text-decoration: none;
    color: #21333f;
    font-size: 1.2rem;
    padding: 12px 20px;
  }
</style>