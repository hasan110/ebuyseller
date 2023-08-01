import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import Header from './views/partials/site-header.vue'
import TopNavigation from './views/partials/site-top-navigation.vue'
import SiteSection from './views/partials/site-section.vue'
import Footer from './views/partials/site-footer.vue'
import VueCookies from 'vue-cookies'
import Axios from './axios'
import Auth from "./plugins/auth/auth";
import Helper from "./plugins/helpers/helpers";
import vuetify from "./plugins/vuetify";
import money from 'v-money'
import Notifications from 'vue-notification'
import SsrCarousel from 'vue-ssr-carousel'
import ssrCarouselCss from 'vue-ssr-carousel/index.css'
import "mdi-icons/css/materialdesignicons.min.css";

const vmoneyConfig = {
    decimal: '.',
    thousands: ',',
    prefix: '',
    suffix: '',
    precision: null,
    masked: false
}
Vue.use(money, vmoneyConfig)
Vue.use(VueCookies)
Vue.use(Auth);
Vue.use(Helper);
Vue.use(Notifications)

Vue.component('ssr-carousel', SsrCarousel)
Vue.component('site-header', Header)
Vue.component('site-top-navigation', TopNavigation)
Vue.component('site-section', SiteSection)
Vue.component('site-footer', Footer)

Vue.prototype.$axios = Axios

new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App)
}).$mount('#app')