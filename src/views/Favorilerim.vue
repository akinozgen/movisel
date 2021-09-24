<template>
  <p>favorilerim</p>
</template>

<script>
import AuthStore from "../stores/AuthStore";
import router from "../router";

export default {
  name: "Favorilerim",
  data() {
    return { AuthStore };
  },
  mounted() {
    if (!AuthStore.state.isLoggedIn) {
      return router.push('/');
    }
  }
}
</script>

<style scoped>

</style>