import panel from '../views/panel.vue'
import login from '../views/auth/login.vue'
import register from '../views/auth/register.vue'
import rules from '../views/rules.vue'
import user_details from '../views/user_details.vue'
import my_shops from '../views/my_shops.vue'
import new_shop from '../views/new_shop.vue'
import edit_shop from '../views/edit_shop.vue'
import my_shop from '../views/my_shop.vue'
import new_product from '../views/new_product.vue'
import edit_product from '../views/edit_product.vue'
import chats from '../views/chats.vue'
import chat_details from '../views/chat_details.vue'

import new_orders from '../views/new_orders.vue'
import order_history from '../views/order_history.vue'
import order_details from '../views/order_details.vue'

import discount from '../views/discount.vue'
import bank_account from '../views/bank_account.vue'

const routes = [

    { path: '/', name: 'panel', component: panel, meta: { authLevel: 3 } },

    { path: '/user-details', name: 'user_details', component: user_details, meta: { authLevel: 3 } },
    { path: '/rules', name: 'rules', component: rules, meta: { authLevel: 3 } },
    { path: '/chats', name: 'chats', component: chats, meta: { authLevel: 3 } },
    { path: '/chat/:id', name: 'chat_details', component: chat_details, meta: { authLevel: 1 } },

    { path: '/my-shops', name: 'my_shops', component: my_shops, meta: { authLevel: 3 } },
    { path: '/new-shop', name: 'new_shop', component: new_shop, meta: { authLevel: 3 } },
    { path: '/edit-shop/:id', name: 'edit_shop', component: edit_shop, meta: { authLevel: 3 } },
    { path: '/my-shop/:id', name: 'my_shop', component: my_shop, meta: { authLevel: 1 } },
    { path: '/new-product/:store_id', name: 'new_product', component: new_product, meta: { authLevel: 1 } },
    { path: '/edit-product/:id', name: 'edit_product', component: edit_product, meta: { authLevel: 1 } },

    { path: '/discount', name: 'discount', component: discount, meta: { authLevel: 3 } },
    { path: '/bank-account', name: 'bank_account', component: bank_account, meta: { authLevel: 3 } },

    { path: '/new-orders', name: 'new_orders', component: new_orders, meta: { authLevel: 3 } },
    { path: '/order_history', name: 'order_history', component: order_history, meta: { authLevel: 1 } },
    { path: '/order-details/:id', name: 'order-details', component: order_details, meta: { authLevel: 1 } },
    // { path: '/store/:id', name: 'store', component: store, meta: { authLevel: 1 } },

    // authentication
    { path: '/login', name: 'login', component: login, meta: { authLevel: 2 } },
    { path: '/register', name: 'register', component: register, meta: { authLevel: 2 } },

]

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes,
})

export default router