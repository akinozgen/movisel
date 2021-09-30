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

<script>
import AuthStore from "../stores/AuthStore";
import MovieCover from "../components/MovieCover";
import router from "../router";

export default {
  name: "ListeDetay",
  components: { MovieCover },
  data() {
    return { listData: this.getListData() }
  },
  methods: {
    getListData() {
      if (!AuthStore.state.isLoggedIn) {
        return router.push('/');
      }
      return AuthStore.state.userLists.filter(l => l.id === parseInt(this.$route.params.id.toString()))[0];
    }
  },
  mounted() {
    if (!AuthStore.state.isLoggedIn) {
      return router.push('/');
    }
  }
}
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