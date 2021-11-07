<template>
    <footer class="center">
        <p>
            Copyright © {{ year }} -
            <a href="https://github.com/akinozgen/movisel/blob/master/LICENSE" target="_blank">MIT Licensed</a>
            /
            Created by: 
            <a href="https://github.com/akinozgen" target="_blank">Akın Özgen</a>
        </p>
        <p>
            <a href="https://github.com/akinozgen/movisel" target="_blank">
                <font-awesome-icon :icon="['fab', 'github']" size="2x" />
            </a>
        </p>
    </footer>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from '@vue/reactivity';

const year = ref(new Date().getFullYear());
</script>

<style scoped>
    .center {
        text-align: center;
    }

    footer {
        padding: 0 0 2rem 0;
        font-size: 1.2rem;
    }

    footer a {
        color: aliceblue;
    }
</style>