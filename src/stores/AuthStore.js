import { createStore } from "vuex";
import { User } from "../models/User";

export default createStore({
    state: {
        userData: {},
        isLoggedIn: false
    },
    mutations: {
        login(state, { userData }) {
            if (typeof userData !== 'object') return;
            state.userData = new User(userData);
            state.isLoggedIn = true;
        },

        logOut(state) {
            state.userData = null;
            state.isLoggedIn = false;
        }
    }
});