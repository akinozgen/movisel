<template>
  <div class="w-3/12 p-10">
    <div class="movie--cover card image-full shadow-sm bg-primary text-accent-content">
      <figure>
        <v-lazy-image class="w-full" :src="movieData?.poster_url" :alt="movieData?.title" />
      </figure>
      <div class="card-body justify-end">
        <h2 class="card-title">
          <button class="btn-circle btn-xs btn bg-black bg-opacity-75 border-0 mr-1" @click.prevent="addToFavs" v-if="!isFav()">
            <font-awesome-icon :icon="['far', 'star']" />
          </button>
          <button class="btn-circle btn-xs btn bg-black bg-opacity-75 border-0 mr-1" @click.prevent="removeFromFavs" v-else>
            <font-awesome-icon :icon="['fas', 'star']" class="fav" />
          </button>
          <span class="cursor-pointer" @click="gotoDetailPage();">
            {{ movieData?.title }}
          </span>
        </h2>
        <div class="bottom">
          <div class="flex align-baseline justify-between mb-2">
            <span>
              <font-awesome-icon icon="calendar" />
              {{ relaseDateFormatted(movieData?.release_date) }}
            </span>
            <span class="font-bold">
              <font-awesome-icon :icon="['fas', 'star']" />
              {{ movieData?.decimal_rating }}
            </span>
          </div>
          <p class="w-full">
            {{ description }}
          </p>
        </div>
        <div class="actions mt-3" v-if="AuthStore.state.isLoggedIn">
          <a href="javascript:void(0)" class="make-cover" @click="makeCover" v-if="props.listItem">
            <font-awesome-icon icon="photo-video" />
            Liste Kapağı Yap
          </a>
          <a href="javascript:void(0)" class="danger-text" @click="removeFromList" v-if="props.listItem">
            <font-awesome-icon icon="times" />
            Listeden Çıkar
          </a>
        
          <a tabindex="1" href="javascript:void(0)" v-else @click="addToList">
            <font-awesome-icon icon="plus-square" />
            Listeye Ekle
          </a>
        </div>
      </div>
    </div>

    <div @click="addToFavs();removeFromFavs();addToList();removeFromList();makeCover();isFav();"></div>
  </div>

  <!-- div class="movie-cover" v-bind:class="{ glowing: isFav() }">
    <div class="front-content">
      <div class="fav-buttons" v-if="AuthStore.state.isLoggedIn">
        <button class="btn-circle btn bg-black bg-opacity-75 border-0 m-2" @click.prevent="addToFavs" v-if="!isFav()">
          <font-awesome-icon :icon="['far', 'star']" />
        </button>
        <button class="btn-circle btn bg-black bg-opacity-75 border-0 m-2" @click.prevent="removeFromFavs" v-else>
          <font-awesome-icon :icon="['fas', 'star']" class="fav" />
        </button>
      </div>
    </div>
    <div class="back-content" @click="gotoDetailPage">
      <v-lazy-image v-bind:src="movieData?.poster_url" />
    </div>
    <h3 class="title" v-text="movieData?.title"></h3>
    <div class="description"  @click="gotoDetailPage">
      <span class="date" v-text="movieData?.release_date"></span>
      <span class="rating"><span v-text="movieData?.decimal_rating"></span>/10</span>
    </div>
    <div class="actions" v-if="AuthStore.state.isLoggedIn">
      <a href="javascript:void(0)" class="make-cover" @click="makeCover" v-if="props.listItem">
        <font-awesome-icon icon="photo-video" />
        Liste Kapağı Yap
      </a>
      <a href="javascript:void(0)" class="danger-text" @click="removeFromList" v-if="props.listItem">
        <font-awesome-icon icon="times" />
        Listeden Çıkar
      </a>

      <a tabindex="1"
         href="javascript:void(0)"
         class="dropdown"
         v-else>
        <font-awesome-icon icon="plus-square" />
        Listeye Ekle
        <ul tabindex="1" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
          <li v-for="list in AuthStore.state.userLists" :key="list.id">
            <a @click="addToList" 
               :data-list="list.id">{{ list.title }}</a>
          </li>
        </ul>
      </a>
    </div>
  </div -->
</template>

<script setup>
  // movieData?.release_date -> releaseDateFormatted
import vLazyImage from 'v-lazy-image';
import AuthStore from "../stores/AuthStore";
import router from "../router";
import { defineProps } from 'vue';

const props = defineProps({
  movieData: Object,
  listItem: {
    type: Boolean,
    default: false
  },
  listId: {
    type: Number,
    default: 0
  }
});

const relaseDateFormatted = (releaseDate) => {
  if (releaseDate) {
    const year = releaseDate.split('-')[0];
    const month = releaseDate.split('-')[1];
    const day = releaseDate.split('-')[2];
    return `${day}.${month}.${year}`;
  }
  return '';
};

const description = String(props.movieData?.short_desc).substring(0, 75) + '...';

function addToFavs() {
  if (!AuthStore.state.isLoggedIn) return false;
  AuthStore.commit('addToFavs', {
    id: props.movieData.id,
    type: props.movieData.item_type
  });
}

function removeFromFavs() {
  if (!AuthStore.state.isLoggedIn) return false;
  AuthStore.commit('removeFromFavs', {
    id: props.movieData.id,
    type: props.movieData.item_type
  });
}

function addToList() {
  let type = props.movieData.item_type;
  let itemId = props.movieData.id;

  AuthStore.commit('openListsModal', {
    type,
    itemId 
  });
}

function removeFromList() {
  AuthStore.commit('removeFromList', {
    id: props.listId,
    item_id: props.movieData.id,
    type: props.movieData.item_type,
  });
}

function makeCover() {
  AuthStore.commit('makeCoverForList', {
    id: props.listId,
    cover: props.movieData.poster_url
  });
}

function isFav() {
  if (!AuthStore.state.isLoggedIn)
    return false;
  let inFavs = AuthStore
      .state
      .userFavs
      .filter(f => f?.item_id === props.movieData.id && f?.type === props.movieData.item_type);

  return inFavs.length > 0;
}

function gotoDetailPage() {
  router.push(`/detay/${props.movieData.item_type}/${props.movieData.id}`);
}
</script>

<style scoped>
  .movie--cover * {
    transition: all .3s ease;
  }

  .movie--cover::before {
    transition: all .3s ease;
    opacity: 0 !important;
  }

  .movie--cover .bottom {
    transform: translateY(300%);
  }

  .movie--cover .card-body {
    transform: translateY(100%);
  }

  .movie--cover:hover .card-body {
    transform: translateY(-10%);
  }

  .movie--cover:hover .bottom {
    transform: none;
  }

  .movie--cover:hover::before {
    opacity: .85 !important;
  }

  button.add-to-fav {
    border: 0;
    padding: 0.5em;
    color: white;
    cursor: pointer;
    background-color: rgba(0, 0, 0, .5);
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    margin: 0.2em;
  }

  .movie-cover {
    cursor: pointer;
    flex: 0 0 calc(100% * (1/5) - 0px - 1px);
    position: relative;
    margin: 0 1em 5em 1em;
    min-height: 26em;
    border-radius: 10px;
    padding-bottom: 1em;
    background-color: #39636e;
    box-shadow:
      0 5.4px 8.5px -16px rgba(0, 0, 0, 0.03),
      0 10.3px 15.6px -16px rgba(0, 0, 0, 0.037),
      0 15.3px 21.8px -16px rgba(0, 0, 0, 0.041),
      0 22.6px 28.9px -16px rgba(0, 0, 0, 0.049),
      0 48px 58px -16px rgba(0, 0, 0, 0.07)
    ;
    transition: all .3s ease-in-out;
  }

  .movie-cover:hover {
    box-shadow:
      5.3px 6.8px 4.7px -11px rgba(0, 0, 0, 0.017),
      10.4px 13.2px 10.8px -11px rgba(0, 0, 0, 0.021),
      15.4px 19.6px 19.4px -11px rgba(0, 0, 0, 0.02),
      20.7px 26.4px 32.3px -11px rgba(0, 0, 0, 0.024),
      27.5px 35.1px 53.2px -11px rgba(0, 0, 0, 0.04),
      39.3px 50.2px 92.9px -11px rgba(0, 0, 0, 0.07),
      76px 97px 201px -11px rgba(0, 0, 0, 0.11)
    ;
  }

  .movie-cover .front-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  .movie-cover .back-content .v-lazy-image {
    width: 100%;
    height: auto;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: linear-gradient(to right, #41295a, #072243);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .movie-cover .date, .movie-cover .rating {
    padding: 0.5em 1em;
  }

  .movie-cover .actions a {
    text-decoration: none;
    width: 100% ;
    display: inline-block;
    margin-bottom: 0.2em;
    text-align: left;
    padding: 0.1em 0.5em;
  }

  .movie-cover .actions {
    flex-wrap: wrap;
  }

  .glowing::after{
    content: '';
    position: absolute;
    left: -2px;
    border-radius: 10px;
    top: -2px;
    background: linear-gradient(45deg, #e8f74d, #ff6600d9, #00ff66, #13ff13, #ad27ad, #bd2681, #6512b9, #ff3300de, #5aabde);
    background-size: 400%;
    width: calc(100% + 5px);
    height: calc(100% + 5px);
    z-index: -2;
    animation: glower 20s linear infinite;
  }

  @keyframes glower {
    0% {
      background-position: 0 0;
    }

    50% {
      background-position: 400% 0;
    }

    100% {
      background-position: 0 0;
    }
  }

</style>