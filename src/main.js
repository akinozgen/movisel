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
    faUsers,
    faUserPlus,
    faUserMinus,
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faImdb, faGithub } from '@fortawesome/free-brands-svg-icons';
import TMDBStore from "@/stores/TMDBStore";
import AuthStore from "@/stores/AuthStore";
import './index.css';

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
    faUsers,
    faUserPlus,
    faUserMinus,
    faGithub,
    faCheck
);

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');

TMDBStore.commit('authenticate');
AuthStore.commit('tryLoginWithToken');