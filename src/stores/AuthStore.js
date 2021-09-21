import { createStore } from "vuex";

export default createStore({
    state: {
        userData: null,
        isLoggedIn: false
    },
    mutations: {
        login(state, _userData) {
            if (typeof _userData !== 'object') return;

            state.userData = _userData;
            state.isLoggedIn = true;
        },

        logOut(state) {
            state.userData = null;
            state.isLoggedIn = false;
        }
    }
});