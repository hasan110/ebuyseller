export default {
    SAVE_SETTING: ({ commit }, payload) => {
        commit('SAVE_SETTING', payload)
    },
    SAVE_SELLER_GLOBAL_DATA: ({ commit }, payload) => {
        commit('SAVE_SELLER_GLOBAL_DATA', payload)
    },
    AUTH_USER: ({ commit }, payload) => {
        commit('AUTH_USER', payload)
    },
    SHOW_LOADING: ({ commit }, payload) => {
        commit('SHOW_LOADING', payload)
    },
}