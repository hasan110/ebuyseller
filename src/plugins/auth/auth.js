const Auth = {};

import { mapState, mapActions } from 'vuex'

Auth.install = function(Vue, options) {


    Vue.mixin({
        methods: {
            checkAuth() {
                const ApiToken = this.$cookies.get("SellerApiToken");

                if (!ApiToken) {
                    this.$router.replace({ name: 'login' })
                }
                return true;
            },
            checkUnAuthenticated() {
                const ApiToken = this.$cookies.get("SellerApiToken");
                if (ApiToken) {
                    this.$router.replace({ name: 'home' })
                }
            },
            getToken() {
                const ApiToken = this.$cookies.get("SellerApiToken");

                return ApiToken;
            },
            checkIsAuthenticated() {
                const ApiToken = this.$cookies.get("SellerApiToken");

                if (ApiToken) {
                    return true
                } else {
                    return false
                }
            }
        }
    });



};

export { Auth as default };