<template>
  <Header branding="Moviwen" />
  <router-view/>
</template>

<script>
import Header from "./components/Header";

export default {
  name: 'Moviwen',
  components: {
    Header
  }
};
</script>

<style>
body {
  font-family: 'Alegreya Sans', sans-serif;
  background-color: #27213f;
}
</style>
