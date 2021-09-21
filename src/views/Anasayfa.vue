<template>
  <p>anasayfa</p>
</template>

<script>
import AuthStore from "../stores/AuthStore";

export default {
  name: "Anasayfa",
  mounted() {
    console.log(AuthStore.state.userData)
  }
}
</script>

<style scoped>

</style>