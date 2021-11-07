<template>
  <div class="cast-item">
    <div class="image-container" v-bind:style="{ backgroundImage: `url(${cast.profile_path})` }"></div>
    <h4 class="name" v-text="cast.name"></h4>
    <h5 class="role" v-text="cast.character"></h5>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  cast: {
    type: Object,
    required: true
  }
});

</script>

<style scoped>
.image-container {
  height: 20em;
  width: 13em;
  background-size: cover;
  border-radius: 10px;
  box-shadow:
    2.4px 10.5px 6.8px -31px rgba(0, 0, 0, 0.028),
    4.2px 17.9px 12.1px -31px rgba(0, 0, 0, 0.04),
    5.3px 22.9px 16.8px -31px rgba(0, 0, 0, 0.052),
    10px 43px 35px -31px rgba(0, 0, 0, 0.08)
  ;
}
</style>