<template>
  <div class="container">
    <h1 class="page-title">Kayıt Ol</h1>

    <form @submit.prevent="register" class="form">
      <div class="form-group">
        <label>E-Posta</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="form-group">
        <label>Parola</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="form-group">
        <button type="submit" v-bind:class="{ loading: inProgress }">
          Kayıt Ol
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
  name: "KayitOl",
  data() {
    return {
      email: '',
      password: '',
      inProgress: false,
      AuthStore,
      SupaBase
    }
  },
  methods: {
    async register() {
      this.inProgress = true;
      if (AuthStore.state.isLoggedIn) return window.location = '/';

      const { error } = await SupaBase.state.supabase.auth.signUp({
        email: this.email,
        password: this.password
      });

      if (error) {
        this.inProgress = false;
        return alert(error.message);
      }

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