<template>
  <div class="list">
    <div class="image">
      <v-lazy-image :src="listItem.poster_url" v-if="!newList" />
      <v-lazy-image src="http://placehold.it/280x400?text=Yeni Liste*" v-else />
    </div>
    <div class="details">

      <div v-if="editMode" class="edit-list">
        <input type="text" placeholder="Liste Başlığı" class="edit-title" v-model="title">
        <input type="text" placeholder="Liste Açıklaması" class="edit-description" v-model="description">
      </div>
      <div v-else>
        <h3 class="list-title">{{ title }}</h3>
        <p class="description">{{ description }}</p>
      </div>

      <div class="actions">
        <a href="" :class="{ 'edit-mode-active': editMode }" @click.prevent="toggleEditMode">
          <span v-if="editMode">
            <font-awesome-icon icon="save" color="blue"/> Kaydet
          </span>
          <span v-else>
            <font-awesome-icon icon="edit" color="orange"/> Düzenle
          </span>
        </a>
        <a href="" @click.prevent="deleteList"><font-awesome-icon icon="trash" color="red" /> Sil</a>
      </div>
    </div>
  </div>
</template>

<script>
import vLazyImage from 'v-lazy-image';
import AuthStore from "../stores/AuthStore";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "ListCover",
  components: { vLazyImage, FontAwesomeIcon },
  data() {
    return {
      editMode: this.newListMode,
      title: this.listItem.title,
      description: this.listItem.description,
      newList: this.newListMode
    }
  },
  props: {
    listItem: Object,
    newListMode: Boolean,
    onCancel: Function,
    onSave: Function
  },
  methods: {
    toggleEditMode() {
      if (this.editMode === true) {
        if (this.newList) {
          this.onSave(this.title, this.description);
        } else {
          this.saveDetails();
        }
      }
      this.editMode = !this.editMode;
    },
    saveDetails() {
      AuthStore.commit('saveListDetails', {
        title: this.title,
        description: this.description,
        id: this.listItem.id
      });
    },
    deleteList() {
      if (this.newList) {
        this.onCancel();
        return ;
      }
      const answer = confirm('Listeyi silmek istiyor musunuz?');
      if (!answer) return;

      AuthStore.commit('deleteList', {
        id: this.listItem.id
      });
    }
  }
}
</script>

<style scoped>
  .list {
    flex: 0 0 calc(100% * (1/5) - 0px - 1px);
    position: relative;
    margin: 0 1em 5em 1em;
    min-height: 26em;
    border-radius: 10px;
    padding-bottom: 1em;
    background-color: #44396e;
    box-shadow:
      0 5.4px 8.5px -16px rgba(0, 0, 0, 0.03),
      0 10.3px 15.6px -16px rgba(0, 0, 0, 0.037),
      0 15.3px 21.8px -16px rgba(0, 0, 0, 0.041),
      0 22.6px 28.9px -16px rgba(0, 0, 0, 0.049),
      0 48px 58px -16px rgba(0, 0, 0, 0.07)
    ;
    transition: all .3s ease-in-out;
  }

  .list .v-lazy-image {
    width: 100%;
    height: auto;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: linear-gradient(to right, #41295a, #2f0743);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .list:last-child {
    margin-right: auto;
  }

  .details {
    text-align: center;
  }

  .description {
    font-size: 0.95rem;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .actions a {
    color: white;
    text-decoration: none;
    display: inline-block;
    border: 3px solid #2f0743;
    padding: 0.75em 1.3em;
    border-radius: 100px;
    transition: all .3s ease;
  }

  .actions a:hover, .actions a.edit-mode-active {
    background-color: #2f0743;
  }

  .actions a svg {
    margin-right: 0.3em;
  }

  .edit-list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .edit-list input {
    margin: 0.5em;
    font-size: 1.2em;
    text-align: center;
    border: 0;
    border-bottom: 2px solid #8a73e7;
    background-color: transparent;
    color: white;
  }
</style>