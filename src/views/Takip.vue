<template>
  <div class="container">
    <div class="row margin-top-5em">
      <div class="half">
        <h1 class="sub-title">
          Takip Ettiklerim
        </h1>
        <div class="grid">
          <div v-if="following.length > 0">
            <user v-for="(user, index) in following"
                  :user-data="user"
                  :key="index+1" />
          </div>
        </div>
      </div>
      <div class="half">
        <h1 class="sub-title">
          Takipçilerim
        </h1>
        <div class="grid">
          <div v-if="followers.length > 0">
            <user v-for="(user, index) in followers"
                  :user-data="user"
                  :key="(index+1)*2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthStore from "../stores/AuthStore";
import User from "../components/User";
import { getUser } from "../helpers/authDataHelpers";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const following = ref([]);
const followers = ref([]);

async function getFollowing() {
  following.value = await Promise.all(
      AuthStore
        .state
        .userFollows
        .map(async (user_id) => await getUser({ user_id }))
        .filter((userData) => typeof userData === 'object')
    );
}

async function getFollowers() {
  followers.value = await Promise.all(
      AuthStore
        .state
        .userFollwed
        .map(async (user_id) => await getUser({ user_id }))
        .filter((userData) => typeof userData === 'object')
    );
}

onMounted(async () => {
  await getFollowing();
  await getFollowers();
});
</script>

<style scoped>

</style>