<template>
  <div data-theme="dark"> 
    <Header v-bind:branding="appName" />
    <router-view />
    <Footer />
    <ListsModal />
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ListsModal from "@/components/ListsModal.vue";

const appName = 'Movisel';
</script>
