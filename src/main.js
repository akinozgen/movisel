import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faSignOutAlt,
    faSignInAlt,
    faStar,
    faStarHalfAlt,
    faPlusSquare,
    faCaretLeft,
    faCaretRight,
    faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import TMDBStore from "@/stores/TMDBStore";

library.add(
    faSignOutAlt,
    faSignInAlt,
    faStar,
    faStarHalfAlt,
    faPlusSquare,
    faCaretLeft,
    faCaretRight,
    faExternalLinkAlt,
    faImdb
);

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');

TMDBStore.commit('authenticate');