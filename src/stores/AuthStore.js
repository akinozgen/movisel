import {createStore} from "vuex";
import SupaBase from "./SupaBase";
import TMDBStore from "./TMDBStore";
import {dbDelete, dbInsert, dbSelect, dbUpdate, getIndexOf} from "../helpers/authDataHelpers";
import {castMovieToCover} from "../helpers/movieDataHelpers";

const apiEndpoint = 'https://api.themoviedb.org/3';

export default createStore({
    state: {
        userData: null,
        isLoggedIn: false,
        userFavs: [],
        userLists: [],
        userFollows: [],
        userFollwed: []
    },
    mutations: {
        async login(state, _userData) {
            if (typeof _userData !== 'object') return;

            state.userData = _userData;
            state.isLoggedIn = true;

            let userId = state.userData.id;
            let { data: favsData, error: favsError } = await dbSelect({
                table: 'favs',
                match: { 'user_id': userId },
                orderCol: 'created_at',
                asc: false
            });

            if (!favsError) {
                state.userFavs = favsData;
            }

            let {data: listData, error: listError} = await dbSelect({
                table: 'lists',
                match: { 'user_id': userId }
            });

            if (!listError) {
                // i like you Promise.all
                state.userLists = await Promise.all(listData.map(async (list) => {
                    const { data: listData, error: listError } = await dbSelect({
                        table: 'list_items',
                        match: { 'list_id': list.id }
                    });
                    if (listError) return list;

                    list.movies = await Promise.all(listData.map(async (item) => {
                        const movRes = await fetch(`${apiEndpoint}/${item.type}/${item.item_id}?api_key=${TMDBStore.state.apiKey}&language=tr-TR`)
                            .then((res) => res.json());

                        return castMovieToCover({
                            movieData: movRes,
                            type: item.type
                        })
                    }));

                    return list;
                }));
            }

            let { data: followData, error: followError } = await dbSelect({
                table: 'follows',
                or: `followed.eq.${state.userData.id},following.eq.${state.userData.id}`
            });

            if (!followError) {
                let follows = [];
                let followed = [];
                followData.forEach(f => {
                    if (f.followed === state.userData.id) {
                        return follows.push(f.following);
                    }
                    followed.push(f.followed);
                });

                state.userFollows = follows;
                state.userFollwed = followed;
            }
        },

        logOut(state) {
            state.userData = null;
            state.isLoggedIn = false;
        },

        async addToFavs(state, {id, type}) {
            if (!state.isLoggedIn) return;

            // Check if row exists
            let { data: checkData, error: checkError } = await dbSelect({
                table: 'favs',
                match: { 'item_id': id, 'type': type, 'user_id': state.userData.id }
            });
            // Finish if row exists
            if (checkError || checkData.length > 0) return;

            // Insert new row
            let {data, error} = await dbInsert({
                table: 'favs',
                data: {
                    item_id: id,
                    type: type,
                    user_id: state.userData.id
                }
            });
            // Finish if something goes wrong
            if (error && !data) {
                return;
            }
            // update local state
            state.userFavs.push({
                item_id: id,
                type: type
            });
        },

        async removeFromFavs(state, {id, type}) {
            if (!state.isLoggedIn) return;

            let {error} = await dbDelete({
                table: 'favs',
                match: {user_id: state.userData.id, item_id: id, type: type}
            });
            if (error) {
                return;
            }
            // remove fav from userfavs
            state.userFavs = state.userFavs.filter(f => !(f.item_id === id && f.type === type));
            TMDBStore.commit('removeFromFavs', {
                id: id,
                type: type
            });
        },

        async tryLoginWithToken(state) {
            if (state.isLoggedIn) return window.location = '/';
            if (!localStorage.getItem('supabase.auth.token')) return;

            const refreshToken = JSON.parse(localStorage.getItem('supabase.auth.token'))
                ?.currentSession
                ?.refresh_token;

            if (!refreshToken) return;

            const {error, user} = await SupaBase.state.supabase.auth.signIn({
                refreshToken
            });

            if (error) {
                return;
            }

            this.commit('login', user);
        },

        async saveListDetails(state, { title, description, id }) {
            const { error: saveError } = await dbUpdate({
                table: 'lists',
                data: { title, description },
                match: { id }
            });
            if (saveError) return;

            let listIndex = state.userLists.indexOf( state.userLists.filter(l => l.id === id)[0] );
            state.userLists[listIndex].title = title;
            state.userLists[listIndex].description = description;
        },

        async deleteList(state, { id }) {
            const { error: deleteError } = await dbDelete({
                table: 'lists',
                match: { id }
            });

            if (deleteError) return;

            state.userLists = state.userLists.filter(l => l.id !== id);
        },

        async addList(state, { title, description }) {
            const { error: insertError, data: insertData } = await dbInsert({
                table: 'lists',
                data: {
                    user_id: state.userData.id,
                    title,
                    description,
                    poster_url: `http://placehold.it/280x400/44396e?text=${title}`
                }
            });

            if (insertError) return;

            let listData = insertData[0];
            listData.movies = [];
            state.userLists.push(listData);
        },

        async makeCoverForList(state, { id, cover }) {
            const { error: updateError } = await dbUpdate({
                table: 'lists',
                data: { poster_url: cover },
                match: { id }
            });
            if (updateError) return;

            let index = getIndexOf({
                array: state.userLists,
                key1: 'id',
                key2: parseInt(id)
            });
            if (!(typeof index === 'number' && index >= 0)) return;

            state.userLists[index].poster_url = cover;
        },

        async removeFromList(state, { id, item_id, type }) {
            const { error: removeError } = await dbDelete({
                table: 'list_items',
                match: { list_id: id, item_id, type }
            });

            if (removeError) return;

            let index = getIndexOf({
                array: state.userLists,
                key1: 'id',
                key2: parseInt(id)
            });
            if (!(typeof index === 'number' && index >= 0)) return;

            state.userLists[index].movies = state.userLists[index].movies.filter((m) => !(
                m.id === item_id && m.item_type === type
            ));
        },

        async addToList(state, { item_id, list_id, item_type, movie_data }) {
            const { error: insertError } = await dbInsert({
                table: 'list_items',
                data: { item_id, list_id, type: item_type, user_id: state.userData.id }
            });
            if (insertError) return;

            let index = getIndexOf({
                array: state.userLists,
                key1: 'id',
                key2: parseInt(list_id)
            });
            if (!(typeof index === 'number' && index >= 0)) return;
            state.userLists[index].movies.push(movie_data);
        }
    }
});