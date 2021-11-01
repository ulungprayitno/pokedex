import { createStore } from "vuex";


const store = createStore({
    state:{
        favorites: []
    },
    getters:{
        totalFavorite(state) {
            return state.favorites.length;
        }
    },
    mutations:{
        SAVE_FAVORITE(state,data) {
            state.favorites.push(data);
        },
        REMOVE_FAVORITE(state, id){
            const newData = state.favorites.filter(item => item.id !== id)
            state.favorites = newData
        }
    },
    actions:{
        saveFavorite({commit}, data) {
            commit('SAVE_FAVORITE',data);
        },
        removeFavorite({commit}, id) {
            commit('REMOVE_FAVORITE',id);
        }
    }
});

export default store;