<template>
  <nav class="navbar">
    <div class="logo">
      <a href="">Moviwen</a>
    </div>
    <div class="search">
      <input type="text" placeholder="Arama">
    </div>
    <div class="menu">
      <ul class="nav">
        <li>
          <a href="">Listeler</a>
        </li>
        <li>
          <a href="">Favoriler</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
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
    align-items: center;
    justify-content: space-between;
    list-style: none;
  }

  .nav a {
    color: white;
    padding: 12px 20px;
    text-decoration: none;
    border-radius: 100px;
    transition: background-color .3s ease;
  }

  .nav a:hover {
    background-color: #8a73e7;
  }
  .search input {
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
    text-align: center;
  }
</style>