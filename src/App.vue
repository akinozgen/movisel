<template>
  <Header v-bind:branding="appName" />
  <router-view/>
</template>

<script>
import Header from "./components/Header";

export default {
  name: 'Movisel',
  data() {
    return {
      appName: 'Movisel'
    }
  },
  components: {
    Header
  }
};
</script>

<style>
body {
  font-family: 'Poppins', sans-serif;
  background-color: #21353f;
  color: white;
  border: 0;
  padding: 0;
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
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

.sub-title {
  text-align: left;
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
  background-color: #739ce7;
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

.danger-text {
  color: red !important;
}

.row {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.half {
  flex: 1;
}

.margin-top-5em {
  margin-top: 5em;
}
</style>
