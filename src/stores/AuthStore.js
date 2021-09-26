import { createStore } from "vuex";
import SupaBase from "@/stores/SupaBase";

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
            if (!Array.isArray(favsData)) {
                console.log(favsError);
                return;
            }

            state.userFavs = favsData;
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
                console.log(error);
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
                console.log(error);
                return;
            }
            // remove fav from userfavs
            state.userFavs = state.userFavs.filter(f => !(f.item_id === id && f.type === type));
        }
    }
});