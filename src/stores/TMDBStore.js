import { createStore } from "vuex";

const apiEndpoint = 'https://api.themoviedb.org/3';

export default createStore({
    state: {
        showcaseMovies: [],
        apiKey: process.env.VUE_APP_TMDB_API_KEY,
        requestToken: '',
        sessionId: ''
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
            if (String(tokenRes?.request_token).length === 0) return;

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
                method: 'POST'
            }).then(res => res.json());
            if (String(sessionRes?.session_id).length === 0) return;
        },
        loadShowcaseMovies(state) {
            console.log(state)
        }
    }
});