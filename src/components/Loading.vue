<template>
  <div class="loading">
    <rotate-square2 background="rgb(138, 115, 231)"/>
  </div>
</template>

<script>
import { RotateSquare2 } from 'vue-loading-spinner';

export default {
  name: "Loading",
  components: { RotateSquare2 }
}
</script>

<style scoped>
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 5em 0;
  }
</style>