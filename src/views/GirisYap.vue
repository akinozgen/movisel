<template>
  <div class="container">
    <h1 class="page-title">Giriş Yap</h1>

    <form @submit.prevent="login" class="form">
      <div class="form-group">
        <label>E-Posta</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="form-group">
        <label>Parola</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="form-group">
        <button type="submit" v-bind:class="{ loading: inProgress }">
          Giriş Yap
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import AuthStore from "../stores/AuthStore";
import SupaBase from "../stores/SupaBase";
import router from "../router";

export default {
  name: "GirisYap",
  data() {
    return {
      email: '',
      password: '',
      inProgress: false
    }
  },
  methods: {
    async login() {
      this.inProgress = true;
      if (AuthStore.state.isLoggedIn) return window.location = '/';

      const { error, user } = await SupaBase.state.supabase.auth.signIn({
        email: this.email,
        password: this.password
      });


      if (error) {
        this.inProgress = false;
        return alert(error.message);
      }

      AuthStore.commit('login', user);

      this.inProgress = false;
      this.email = '';
      this.password = '';
      await router.push('/');
    }
  }
}
</script>

<style scoped>

</style>