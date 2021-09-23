<template>
  <div class="search-bar">
    <input type="text" placeholder="Arama">
  </div>
</template>

<script>
export default {
  name: "SearchBar"
}
</script>

<style scoped>
  .search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search input {
    background-color: rgba(255, 255, 255, 0.55);
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
    transition: background-color .3s ease;
    text-align: center;
  }

  .search input:focus {
    background-color: white;
  }
</style>