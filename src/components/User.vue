<template>
  <div class="user-card">
    <div class="row">
      <div class="left">
        <div class="image-container">
          <v-lazy-image :src="userData.profile_picture" />
        </div>
      </div>
      <div class="right">
        <h1>
          <router-link :to="`/kullanici/${userData.username}`">@{{ userData.username }}</router-link>
        </h1>
        <p v-html="userData.bio.autoLink({ target: '_blank' })"></p>
      </div>

      <button class="follow" v-if="isFollowing()" @click="unfollow">
        <font-awesome-icon icon="user-minus" /> Takipten Çık
      </button>
      <button class="follow" v-else @click="follow">
        <font-awesome-icon icon="user-plus" /> Takip Et
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import vLazyImage from 'v-lazy-image';
import {isFollowingUser} from "@/helpers/authDataHelpers";
import 'autolink-js';
import AuthStore from "@/stores/AuthStore";

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
});

function follow() {}

function unfollow() {
  AuthStore.commit('unfollow', {
    user_id: props.userData.user_id
  });
}

function isFollowing() {
  return isFollowingUser({ user_id: props.userData.user_id });
}
</script>

<style scoped>
.user-card {
  flex: 1;
  background: #739ce7;
  margin: 0 1rem 1rem 0;
  border-radius: 1rem;
  padding: 0.8rem 1.5rem;
}

.user-card .row {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.image-container {
  width: 7rem;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 20em;
  box-shadow:
    0.3px 0.3px 1.6px -35px rgba(0, 0, 0, 0.031),
    3.3px 2.9px 4.4px -35px rgba(0, 0, 0, 0.045),
    11.2px 10px 10.6px -35px rgba(0, 0, 0, 0.059),
    37px 33px 35px -35px rgba(0, 0, 0, 0.09)
  ;
  border: 5px solid #072243;
}

.image-container .v-lazy-image {
  width: 100%;
}

.left {
  position: relative;
}

.follow {
  right: calc(50% - 3rem);
  padding: 1.2rem;
  border-radius: 4rem;
  background: #739ce7;
  color: white;
  border: 0;
  box-shadow:
    0.3px 0.3px 1.6px -35px #739ce7,
    3.3px 2.9px 4.4px -35px #739ce7,
    11.2px 10px 10.6px -35px #739ce7,
    37px 33px 35px -35px #739ce7
  ;
  cursor: pointer;
  transition: all .3s ease;
  width: 14rem;
  align-self: center;
}

.follow:hover {
  background: #072243;
  box-shadow:
    0.3px 0.3px 1.6px -35px rgba(0, 0, 0, 0.031),
    3.3px 2.9px 4.4px -35px rgba(0, 0, 0, 0.045),
    11.2px 10px 10.6px -35px rgba(0, 0, 0, 0.059),
    37px 33px 35px -35px rgba(0, 0, 0, 0.09)
  ;
}

.right {
  padding-left: 2rem;
}

.right h1 {
  margin: 0;
}

.right h1 a {
  color: white;
  text-decoration: none;
}
</style>