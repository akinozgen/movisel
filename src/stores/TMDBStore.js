import { createStore } from "vuex";

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
        userFavs: []
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
            state.showcaseMovies = popRes.results.map(m => ({
                id: m.id,
                title: type === 'movie' ? m.title : m.name,
                decimal_rating: m.vote_average,
                release_date: type === 'movie' ? m.release_date : m.first_air_date,
                poster_url: `https://image.tmdb.org/t/p/w500/${m.poster_path}`,
                item_type: type
            }));
        },
        async getMovieData(state, {id, type}) {
            const movRes = await fetch(`${apiEndpoint}/movie/${id}?api_key=${state.apiKey}&language=tr-TR&`)
            .then(res => res.json());

            if (String(movRes?.id) !== String(id)) return;

            movRes.backdrop_path = `https://image.tmdb.org/t/p/original/${movRes.backdrop_path}`;
            movRes.poster_path = `https://image.tmdb.org/t/p/w780/${movRes.poster_path}`;
            movRes.production_companies = movRes.production_companies.map((c) => {
                if (!c.logo_path) return c;

                c.logo_path = `https://image.tmdb.org/t/p/w185/${c.logo_path}`;
                return c;
            });
            movRes.isFuture = () => {
                return Date.parse(movRes.release_date) > Date.now();
            };
            let eventDate = (new Date(movRes.release_date))
                .toISOString()
                .replace(/ /g, '')
                .replace(/:/g, '')
                .replace(/-/g, '')
                .replace(/\./g, '');

            movRes.eventUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${movRes.title ?? movRes.name} - Vizyon Tarihi&dates=${eventDate}/${eventDate}&details=${movRes.homepage}&sf=true&output=xml`;
            state.currentMovieDetail = movRes;
            movRes.item_type = type;
        },
        async getMovieCredits(state, { id }) {
            const crdRes = await fetch(`${apiEndpoint}/movie/${id}/credits?api_key=${state.apiKey}&language=tr-TR&`)
            .then(res => res.json());

            if (!Array.isArray(crdRes?.cast)) return;

            state.movieCredits[ id ] = crdRes.cast.filter(c => c?.profile_path != null).map(c => {
                c.profile_path = `https://image.tmdb.org/t/p/h632/${c.profile_path}`;
                return c;
            });
        },
        async getUserFavs(state, { userFavs }) {
            let movies = [];
            let tvs = [];

            for (const fav of userFavs) {
                const res = await fetch(`${apiEndpoint}/${fav.type}/${fav.item_id}?api_key=${state.apiKey}&language=tr-TR`)
                    .then((res) => res.json());

                if (String(res?.id) !== String(fav.item_id)) continue;
                let data = {
                    id: res.id,
                    title: fav.type === 'movie' ? res.title : res.name,
                    decimal_rating: res.vote_average,
                    release_date: fav.type === 'movie' ? res.release_date : res.first_air_date,
                    poster_url: `https://image.tmdb.org/t/p/w500/${res.poster_path}`,
                    item_type: fav.type
                };

                if (fav.type === 'movie') {
                    movies.push(data);
                } else {
                    tvs.push(data);
                }
            }

            state.userFavs = [ ...movies, ...tvs ];
        },
        removeFromFavs(state, { id, type }) {
            state.userFavs = state.userFavs.filter(f => !(f.id === id && f.item_type === type));
        }
    }
});