<template>
  <div class="season-cover">
    <v-lazy-image :src="seasonData.poster_path" />
    <div class="hover-content">
      <h3>{{ seasonData.name }}</h3>
      <p>{{ seasonData.episode_count }} Bölüm</p>
      <p v-if="seasonData.air_date">Yayın Tarihi: {{ seasonData.air_date }}</p>
      <p class="overview" v-if="seasonData.overview">{{ String(seasonData.overview).substr(0, 75) }}...</p>
    </div>
  </div>
</template>

<script>
import vLazyImage from 'v-lazy-image';

export default {
  name: "SeasonCover",
  components: { vLazyImage },
  data() {
    return { expanded: false };
  },
  props: {
    seasonData: Object
  },
  methods: {
    expand() {
      this.expanded = !this.expanded;
    }
  }
}
</script>

<style scoped>
  .season-cover {
    cursor: pointer;
    flex: 0 0 calc(100% * (1/8) - 0px - 1px);
    position: relative;
    margin: 0 1em 5em 1em;
    border-radius: 10px;
    top: 0;
    left: 0;
    box-shadow:
      0 5.4px 8.5px -16px rgba(0, 0, 0, 0.03),
      0 10.3px 15.6px -16px rgba(0, 0, 0, 0.037),
      0 15.3px 21.8px -16px rgba(0, 0, 0, 0.041),
      0 22.6px 28.9px -16px rgba(0, 0, 0, 0.049),
      0 48px 58px -16px rgba(0, 0, 0, 0.07)
    ;
    transition: all .3s ease-in-out;
  }

  .hover-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, .85);
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: all .2s ease-in-out;
  }

  .season-cover:hover .hover-content {
    opacity: 1;
  }

  .season-cover:last-child {
    margin-right: auto;
  }

  .season-cover .v-lazy-image {
    width: 100%;
    height: auto;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: linear-gradient(to right, #41295a, #2f0743);
    border-radius: 10px;
  }

  .overview {
    text-align: center;
    font-size: 14px;
  }

</style>