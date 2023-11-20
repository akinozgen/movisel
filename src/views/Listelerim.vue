<template>
  <div class="container">
    <div class="header">
      <h1 class="page-title">
        <small>
          <button class="add-list" @click.prevent="toggleCreateMode">
            <font-awesome-icon
                :icon="createMode ? 'times' : 'plus'"
                :color="createMode ? 'red' : 'white'" />
          </button>
        </small>
        Listelerim
      </h1>
    </div>
    <div class="lists grid">
      <list-cover
          v-if="createMode"
          :list-item="{}"
          :new-list-mode="true"
          :on-cancel="toggleCreateMode"
          :on-save="addList" />
      <list-cover v-for="list in AuthStore.state.userLists" :key="list.id" :list-item="list" />
    </div>
  </div>
</template>

<script setup>
import AuthStore from "@/stores/AuthStore";
import ListCover from "@/components/ListCover.vue";
import router from "@/router";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const createMode = ref(false);

function toggleCreateMode() {
  createMode.value = !createMode.value;
}

function addList(title, description) {
  AuthStore.commit('addList', {
    title,
    description
  });
  createMode.value = false;
}

onMounted(() => {
  if (!AuthStore.state.isLoggedIn) {
    return router.push('/');
  }
});
</script>

<style scoped>
.add-list {
  background-color: transparent;
  border: 4px solid #739ce7;
  color: white;
  margin-right: 1em;
  font-size: 1.2rem;
  text-align: center;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  border-radius: 100px;
}
</style>