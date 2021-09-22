<template>
  <div class="container">
    <h1 class="page-title">Vizyondaki Popüler Filmler</h1>
    <div class="grid">
      <MovieCover v-bind:movie-data="movieData" v-for="movieData in mockData" :key="movieData.id" />
    </div>
  </div>
</template>

<script>
import TMDBStore from "@/stores/TMDBStore";
import MovieCover from "@/components/MovieCover";

export default {
  name: "Anasayfa",
  components: {MovieCover},
  mounted() {
    console.log(TMDBStore);
  },
  data() {
    return {
      mockData: [
        {
          id: 1,
          poster_url: 'https://www.themoviedb.org/t/p/w220_and_h330_face/65HH8CsLmesa8yAv4kB4HTvYK74.jpg',
          title: 'The Suicide Squad: İntihar Timi',
          release_date: '28-07-2021',
          decimal_rating: 7.9,
          isFav: false
        },
        {
          id: 2,
          poster_url: 'https://www.themoviedb.org/t/p/w220_and_h330_face/mYoVRSnTNRGN0MP0kTDVvw6z9fy.jpg',
          title: 'Shang-Chi ve On Halka Efsanesi',
          release_date: '01-09-2021',
          decimal_rating: 7.9,
          isFav: true
        },
        {
          id: 3,
          poster_url: 'https://www.themoviedb.org/t/p/w220_and_h330_face/cP7odDzzFBD9ycxj2laTeFWGLjD.jpg',
          title: 'Tatlı Kız',
          release_date: '18-08-2021',
          decimal_rating: 6.9,
          isFav: false
        },
      ]
    };
  }
}
</script>

<style scoped>
  .grid {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>