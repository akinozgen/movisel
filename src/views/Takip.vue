<template>
  <div class="container">
    <div class="row margin-top-5em">
      <div class="half">
        <h1 class="sub-title">
          Takip Edilenler
        </h1>
        <div class="grid">
          <div v-if="following.length > 0">
            <user v-for="(user, index) in following" :user-data="user" :key="index+1" />
          </div>
          <Loading v-else />
        </div>
      </div>
      <div class="half">
        <h1 class="sub-title">
          Takipçilerim
        </h1>
        <div class="grid">
          <div v-if="followers.length > 0">
            <user v-for="(user, index) in followers" :user-data="user" :key="(index+1)*2" />
          </div>
          <Loading v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthStore from "../stores/AuthStore";
import User from "../components/User";
import Loading from "../components/Loading";
import {getUser} from "../helpers/authDataHelpers";

export default {
  name: "Takip",
  components: { User, Loading },
  data() {
    return { AuthStore, following: [], followers: [] };
  },
  methods: {
    async getFollowing() {
      this.following = await Promise.all(
          AuthStore
            .state
            .userFollows
            .map(async (user_id) => await getUser({ user_id }))
            .filter((userData) => typeof userData === 'object')
        );
    },

    async getFollowers() {
      this.followers = await Promise.all(
          AuthStore
            .state
            .userFollwed
            .map(async (user_id) => await getUser({ user_id }))
            .filter((userData) => typeof userData === 'object')
        );
    }
  },
  mounted() {
    this.getFollowing();
    this.getFollowers();
  },
  watch: {
    'AuthStore.state.userData': function () {
      this.getFollowing();
      this.getFollowers();
    }
  }
}
</script>

<style scoped>

</style>