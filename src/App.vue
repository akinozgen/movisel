<template>
  <Header v-bind:branding="appName" />
  <router-view/>
  <Footer />
</template>

<script setup>
import Header from "./components/Header";
import Footer from "./components/Footer.vue";
import './app.css';

const appName = 'Movisel';
</script>