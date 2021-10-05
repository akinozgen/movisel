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
    faExternalLinkAlt,
    faCalendar,
    faFilm,
    faTv,
    faEdit,
    faTrash,
    faSave,
    faPlus,
    faTimes,
    faPhotoVideo,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import TMDBStore from "./stores/TMDBStore";
import AuthStore from "./stores/AuthStore";

library.add(
    faSignOutAlt,
    faSignInAlt,
    faStar,
    faStarHalfAlt,
    faPlusSquare,
    faCaretLeft,
    faCaretRight,
    faExternalLinkAlt,
    faImdb,
    faCalendar,
    faStarRegular,
    faFilm,
    faTv,
    faEdit,
    faTrash,
    faSave,
    faPlus,
    faTimes,
    faPhotoVideo,
    faUsers
);

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');

TMDBStore.commit('authenticate');
AuthStore.commit('tryLoginWithToken');