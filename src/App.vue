<template>
  <Header v-bind:branding="appName" />
  <router-view/>
</template>

<script>
import Header from "./components/Header";

export default {
  name: 'Moviwen',
  data() {
    return {
      appName: 'Moviwen'
    }
  },
  components: {
    Header
  }
};
</script>

<style>
body {
  font-family: 'Alegreya Sans', sans-serif;
  background-color: #27213f;
  color: white;
}
.center {
  text-align: center;
}

.container {
  width: 80%;
  margin: 0 auto;
}

.page-title {
  margin-top: 2em;
  margin-bottom: 1em;
  color: white;
  text-align: center;
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.form-group {
  display: flex;
  align-items: start;
  flex-direction: column;
  margin: 1em 0;
}

.form-group label {
  color: white;
  font-size: 1.5em;
  font-weight: 300;
  margin-bottom: 0.85em;
}

.form-group input {
  width: 20em;
  padding: 1em;
  border-radius: 10px;
  border: 0;
}

.form-group button {
  width: 18.5rem;
  border-radius: 10px;
  font-size: 1.1em;
  height: 3rem;
  background-color: #8a73e7;
  border: 0;
  color: white;
  cursor: pointer;
}

.form-group button.loading {
  opacity: 0.5;
  user-select: none;
  cursor: unset;
  pointer-events: none;
}

.container .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
