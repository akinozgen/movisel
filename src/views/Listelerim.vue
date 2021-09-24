<template>
  <p>listelerim</p>
</template>

<script>
import AuthStore from "../stores/AuthStore";
import router from "../router";

export default {
  name: "Listelerim",
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