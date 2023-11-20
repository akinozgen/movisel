<template>
  <p class="center">Çıkış Yapılıyor</p>
</template>

<script setup>
import AuthStore from "@/stores/AuthStore";
import SupaBase from "@/stores/SupaBase";
import router from "@/router";
import { onMounted } from "@vue/runtime-core";

onMounted(async () => {
  await SupaBase.state.supabase.auth.signOut();
  AuthStore.commit('logOut');
  await router.push('/');
});
</script>

<style scoped>
</style>