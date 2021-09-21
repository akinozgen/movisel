<template>
  <p class="center">Çıkış Yapılıyor</p>
</template>

<script>
import AuthStore from "../stores/AuthStore";
import SupaBase from "../stores/SupaBase";
import router from "../router";

export default {
  name: "Cikis",
  async mounted() {
    await SupaBase.state.supabase.auth.signOut();
    AuthStore.commit('logOut');
    await router.push('/');
  }
}
</script>

<style scoped>
</style>