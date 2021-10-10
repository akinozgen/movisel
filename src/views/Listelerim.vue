<template>
  <div class="container">
    <div class="header">
      <h1 class="page-title">
        <small>
          <button class="add-list" @click.prevent="this.toggleCreateMode">
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
          :on-cancel="this.toggleCreateMode"
          :on-save="this.addList" />
      <list-cover v-for="list in AuthStore.state.userLists" :key="list.id" :list-item="list" />
    </div>
  </div>
</template>

<script>
import AuthStore from "../stores/AuthStore";
import ListCover from "../components/ListCover";
import router from "../router";

export default {
  name: "Listelerim",
  components: {ListCover},
  data() {
    return { AuthStore, ListCover, createMode: false, newListTitle: '', newListDescription: '' };
  },
  methods: {
    toggleCreateMode() {
      this.createMode = !this.createMode;
    },
    addList(title, description) {
      AuthStore.commit('addList', {
        title,
        description
      });
      this.createMode = false;
    }
  },
  mounted() {
    if (!AuthStore.state.isLoggedIn) {
      return router.push('/');
    }
  }
}
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