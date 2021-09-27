import { createStore } from "vuex";
import SupaBase from "./SupaBase";
import TMDBStore from "./TMDBStore";

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
            let { data: favsData, error: favsError } = await SupaBase
                .state
                .supabase
                .from('favs')
                .select()
                .eq('user_id', userId)
                .order('created_at', {
                    ascending: false
                });
            if (!favsError) {
                state.userFavs = favsData;
            }

            let { data: listData, error: listError } = await SupaBase
                .state
                .supabase
                .from('lists')
                .select()
                .eq('user_id', userId);

            if (!listError) {
                state.userLists = listData;
            }

            let { data: followData, error: followError } = await SupaBase
                .state
                .supabase
                .from('follows')
                .select()
                .or(`followed.eq.${state.userData.id},following.eq.${state.userData.id}`);
            if (followError) {
                return;
            }

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
        },

        logOut(state) {
            state.userData = null;
            state.isLoggedIn = false;
        },

        async addToFavs(state, { id, type }) {
            if (!state.isLoggedIn) return;

            // Check if row exists
            let { data: checkData, error: checkError } = await SupaBase
                .state
                .supabase
                .from('favs')
                .select()
                .eq('item_id', id)
                .eq('type', type)
                .eq('user_id', state.userData.id);
            // Finish if row exists
            if (checkError || (checkData.length > 0)) return;

            // Insert new row
            let { data, error } = await SupaBase
                .state
                .supabase
                .from('favs')
                .insert([{
                    item_id: id,
                    type: type,
                    user_id: state.userData.id
                }]);
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

        async removeFromFavs(state, { id, type }) {
            if (!state.isLoggedIn) return;

            let { error } = await SupaBase
                .state
                .supabase
                .from('favs')
                .delete()
                .match({ user_id: state.userData.id, item_id: id, type: type });
            if (error) {
                return;
            }
            // remove fav from userfavs
            state.userFavs = state.userFavs.filter(f => !(f.item_id === id && f.type === type));
            TMDBStore.commit('removeFromFavs', {
                id: id,
                type: type
            });
        }
    }
});