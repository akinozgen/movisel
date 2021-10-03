import { createStore } from "vuex";
import {castMovieToCover, castMovieToDetailsPage, getUserFavMovies} from "../helpers/movieDataHelpers";

const apiEndpoint = 'https://api.themoviedb.org/3';

export default createStore({
    state: {
        showcaseMovies: [],
        apiKey: process.env.VUE_APP_TMDB_API_KEY,
        requestToken: '',
        sessionId: '',
        showcaseMaxPages: 1,
        activePage: 1,
        currentMovieDetail: null,
        movieCredits: [],
        userFavs: [],
        searchResults: [],
        currentMovieSimilars: []
    },
    mutations: {
        async authenticate(state) {
            const localExpiry = localStorage.getItem('token_expiry');
            const localToken = localStorage.getItem('request_token');
            if (parseInt(localExpiry) > Date.now() && localToken) {
                state.requestToken = localToken;
                await this.commit('getSessionId');
                return;
            }

            const tokenRes = await fetch(`${apiEndpoint}/authentication/token/new?api_key=${state.apiKey}`)
                .then(res => res.json());
            if (String(tokenRes?.request_token) === "undefined") return;

            state.requestToken = tokenRes.request_token;
            localStorage.setItem('request_token', state.requestToken);

            // saat farkından 3 saat eklemek istiyor.
            const expiration = Date.parse(tokenRes.expires_at.replace(' UTC', '')) + ((60*60)*3000);
            localStorage.setItem('token_expiry', expiration.toString());
            // session id
            this.commit('getSessionId');
        },
        async getSessionId(state) {
            const localSessionExpiry = localStorage.getItem('session_expiry');
            const localSession = localStorage.getItem('request_session');
            if (parseInt(localSessionExpiry) > Date.now() && localSession) {
                return state.sessionId = localSession;
            }

            const sessionRes = await fetch(`${apiEndpoint}/authentication/session/new?api_key=${state.apiKey}&request_token=${state.requestToken}`, {
                method: 'GET'
            }).then(res => res.json());

            if (String(sessionRes?.session_id) === "undefined") return;

            state.sessionId = sessionRes.session_id;
            localStorage.setItem('session_id', state.sessionId);

            // saat farkından 3 saat eklemek istiyor.
            const expiration = Date.parse(sessionRes.expires_at.replace(' UTC', '')) + ((60*60)*3000);
            localStorage.setItem('session_expiry', expiration.toString());
        },
        async loadShowcaseMovies(state, {page, type}) {
            const popRes = await fetch(`${apiEndpoint}/${type}/popular?api_key=${state.apiKey}&language=tr-TR&page=${page}`)
                .then(res => res.json());
            if (!Array.isArray(popRes?.results)) return;

            state.showcaseMaxPages = parseInt(popRes.total_pages);
            state.showcaseMovies = popRes.results.map(m => castMovieToCover({ movieData: m, type }));
        },
        async getMovieData(state, {id, type}) {
            const movRes = await fetch(`${apiEndpoint}/${type}/${id}?api_key=${state.apiKey}&language=tr-TR&`)
            .then(res => res.json());

            if (String(movRes?.id) !== String(id)) return;
            state.currentMovieDetail = castMovieToDetailsPage({ movieData: movRes, type });

            window.scrollTo({ top: 0, behavior: "smooth" }); // shame :(
        },
        async getMovieCredits(state, { id, type }) {
            const crdRes = await fetch(`${apiEndpoint}/${type}/${id}/credits?api_key=${state.apiKey}&language=tr-TR&`)
            .then(res => res.json());

            if (!Array.isArray(crdRes?.cast)) return;

            state.movieCredits[ id ] = crdRes.cast.filter(c => c?.profile_path != null).map(c => {
                c.profile_path = `https://image.tmdb.org/t/p/h632/${c.profile_path}`;
                return c;
            });
        },
        async getUserFavs(state, { userFavs }) {
            state.userFavs = await getUserFavMovies({
                userFavs,
                apiEndpoint,
                apiKey: state.apiKey
            });
        },
        removeFromFavs(state, { id, type }) {
            state.userFavs = state.userFavs.filter(f => !(f.id === id && f.item_type === type));
        },
        async search(state, { query }) {
            const movRes = await fetch(`${apiEndpoint}/search/movie?query=${query}&api_key=${state.apiKey}&language=tr-TR`)
                .then((res) => res.json());

            const tvRes = await fetch(`${apiEndpoint}/search/tv?query=${query}&api_key=${state.apiKey}&language=tr-TR`)
                .then((res) => res.json());

            movRes.results = movRes.results.map(r => {
                r.item_type = 'movie';
                return r;
            }).splice(0, 5);

            tvRes.results = tvRes.results.map(r => {
                r.item_type = 'tv';
                return r;
            }).splice(0, 5);

            let results = [...movRes?.results, ...tvRes?.results];

            state.searchResults = results
                .map(m => castMovieToCover({
                    movieData: m,
                    type: m.item_type
                }))
                .sort((x, y) => x.popularity > y.popularity ? -1 : 1);
        },
        async getSimilars(state, { id, type }) {
            const res = await fetch(`${apiEndpoint}/${type}/${id}/similar?api_key=${state.apiKey}&language=tr-TR`)
                .then((res) => res.json());
            if (!Array.isArray(res.results)) return;

            let similars = res.results.map((m) => castMovieToCover({
                movieData: m,
                type
            }));

            state.currentMovieSimilars = similars.splice(0, 4);
        }
    }
});