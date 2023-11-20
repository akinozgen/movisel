<template>
  <div class="container">
    <div class="backdrop" v-bind:style="{ backgroundImage: `url('${listData.poster_url}')` }"></div>
    <div class="header">
      <h1 class="page-title">{{ listData.title }}</h1>
      <p>{{ listData.description }}</p>
    </div>
    <div class="grid">
      <movie-cover
          v-for="movieData in listData.movies"
          :movie-data="movieData"
          :list-item="true"
          :list-id="listData.id"
          :key="movieData.id" />
    </div>
  </div>
</template>

<script setup>
import AuthStore from "@/stores/AuthStore";
import MovieCover from "@/components/MovieCover";
import router from "@/router";
import { computed } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";

const $route = computed(() => useRouter().currentRoute.value);
const listData = computed(() => getListData());

function getListData() {
  if (!AuthStore.state.isLoggedIn) {
    return router.push('/');
  }
  
  return AuthStore.state.userLists.filter(l => l.id === parseInt($route.value.params.id.toString()))[0];
}

onMounted(() => {
  if (!AuthStore.state.isLoggedIn) {
    router.push('/');
  }
});
</script>

<style scoped>
.page-title {
  margin-bottom: 0;
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

.header {
  flex-direction: column;
  align-items: flex-start;
}
</style>