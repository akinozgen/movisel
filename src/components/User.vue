<template>
  <div class="user-card">
    <div class="left">
      <v-lazy-image :src="userData.profile_picture" />
    </div>
    <div class="right">
      <h1>{{ userData.username }}</h1>
      <p>{{ userData.bio }}</p>
    </div>
  </div>
</template>

<script>
import vLazyImage from 'v-lazy-image';

export default {
  name: "User",
  props: {
    userData: Object
  },
  components: { vLazyImage },
  methods: {
    isFollowing() {

    },
    follow() {

    },
    unfollow() {

    }
  }
}
</script>

<style scoped>

</style>