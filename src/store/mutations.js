export default {
    SAVE_SETTING: (state, payload) => {
        state.SETTING = payload
    },
    SAVE_SELLER_GLOBAL_DATA: (state, payload) => {
        state.SELLER_GLOBAL_DATA = payload
    },
    AUTH_USER: (state, payload) => {
        state.USER = payload
    },
    SHOW_LOADING: (state, payload) => {
        state.LOADING = payload
    },
}