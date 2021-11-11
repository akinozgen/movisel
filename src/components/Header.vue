<template>
  <div class="navbar mx-2 my-2 shadow-lg text-neutral-content bg-neutral rounded-box">
    <div class="px-2 mx-2 navbar-start">
      <span class="text-lg font-bold">
        {{ branding }}
      </span>
    </div>
    <div class="hidden px-2 mx-2 navbar-center lg:flex">
      <div class="flex items-stretch">
        <router-link class="btn btn-ghost btn-sm rounded-btn" to="/">Anasayfa</router-link>
        <div v-if="AuthStore.state.isLoggedIn">
          <router-link class="btn btn-ghost btn-sm rounded-btn" to="/listelerim">Listelerim</router-link>
          <router-link class="btn btn-ghost btn-sm rounded-btn" to="/favorilerim">Favorilerim</router-link>
          <router-link class="btn btn-ghost btn-sm rounded-btn" to="/takip">Arkadaşlarım</router-link>
          <router-link class="btn btn-ghost btn-sm rounded-btn text-error" to="/cikis">Çıkış</router-link>
        </div>
        <div v-else>
          <router-link to="/kayit-ol" class="btn btn-ghost btn-sm rounded-btn">Kayıt Ol</router-link>
          <router-link to="/giris-yap" class="btn btn-ghost btn-sm rounded-btn">Giriş Yap</router-link>
        </div>
      </div>
    </div>
    <div class="navbar-end">
      <button class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import AuthStore from "../stores/AuthStore";
// import router from "../router";

defineProps({
  branding: {
    type: String,
    required: true
  }
});

// function gotoHomePage() {
//   router.push('/');
// }
</script>

<style scoped>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .navbaritem {
    flex: 1;
  }

  .logo a {
    text-decoration: none;
    text-align: center;
    display: inline-block;
    padding: 12px 20px;
    color: #739ce7;
    font-weight: bold;
    font-size: 2em;
  }

  .menu {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu .nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    list-style: none;
  }

  .nav .router-link-active.router-link-exact-active {
    background-color: #739ce7;
  }

  .nav li a {
    color: white;
    padding: 12px 20px;
    text-decoration: none;
    border-radius: 100px;
    transition: background-color .3s ease;
    display: inline-block;
    margin: 0 5px;
  }

  .nav li a:visited {
    color: white;
  }

  .nav a:hover {
    background-color: #739ce7;
  }
</style>