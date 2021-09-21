<template>
  <nav class="navbar">
    <div class="logo navbaritem">
      <a href="" v-text="branding"></a>
    </div>
    <div class="search navbaritem">
      <input type="text" placeholder="Arama">
    </div>
    <div class="menu navbaritem">
      <ul class="nav" v-if="AuthStore.state.isLoggedIn">
        <li><router-link to="/">Anasayfa</router-link></li>
        <li><router-link to="/listelerim">Listelerim</router-link></li>
        <li><router-link to="/favorilerim">Favorilerim</router-link></li>
        <li><router-link to="/cikis"><font-awesome-icon icon="sign-out-alt" /></router-link></li>
      </ul>
      <ul class="nav" v-else>
        <li><router-link to="/">Anasayfa</router-link></li>
        <li><router-link to="/kayit-ol">Kayıt Ol</router-link></li>
        <li><router-link to="/giris-yap"><font-awesome-icon icon="sign-in-alt" /></router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import AuthStore from "../stores/AuthStore";

export default {
  name: "Header",
  data() {
    return { AuthStore };
  },
  props: {
    branding: {
      type: String,
      required: true
    }
  }
}
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
    color: #8a73e7;
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
    background-color: #745fc9;
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
    background-color: #8a73e7;
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search input {
    background-color: rgba(255, 255, 255, 0.55);
    padding: 12px 20px;
    min-width: 300px;
    border-radius: 100px;
    border: 0;
    box-shadow: inset
      2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
      100px 100px 80px rgba(0, 0, 0, 0.07)
    ;
    transition: background-color .3s ease;
    text-align: center;
  }

  .search input:focus {
    background-color: white;
  }
</style>