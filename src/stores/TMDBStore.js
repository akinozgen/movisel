import { createStore } from "vuex";

const apiEndpoint = 'https://api.themoviedb.org/3';

export default createStore({
    state: {
        showcaseMovies: [],
        apiKey: process.env.VUE_APP_TMDB_API_KEY,
        requestToken: '',
        sessionId: '',
        showcaseMaxPages: 1
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
        async loadShowcaseMovies(state, {page}) {
            const popRes = await fetch(`${apiEndpoint}/movie/popular?api_key=${state.apiKey}&language=tr-TR&page=${page}`)
                .then(res => res.json());
            if (!Array.isArray(popRes?.results)) return;

            state.showcaseMaxPages = parseInt(popRes.total_pages);
            state.showcaseMovies = popRes.results.map(m => ({
                id: m.id,
                title: m.title,
                decimal_rating: m.vote_average,
                release_date: m.release_date,
                poster_url: `https://image.tmdb.org/t/p/original/${m.poster_path}`
            }));
        }
    }
});