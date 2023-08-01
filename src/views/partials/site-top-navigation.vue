<template>
  <nav class="site-top-navigation">
    <ul>
      <li :class="[active_nav == 'profile' ? 'active' : '']">
        <router-link :to="{name:'panel'}">
          <span>پروفایل</span>
        </router-link>
      </li>
      <li :class="[active_nav == 'store' ? 'active' : '']">
        <router-link :to="{name:'my_shops'}">
          <span>فروشگاه</span>
        </router-link>
      </li>
      <li :class="[active_nav == 'order' ? 'active' : '']">
        <router-link :to="{name:'new_orders'}">
          <span class="badge-counter" v-if="getCartItemsCount">
            {{getCartItemsCount}}
          </span>
          <span>پیگیری سفارشات</span>
        </router-link>
      </li>
    </ul>
  </nav>

</template>
<script>
export default {
  name: 'site-top-navigation',
  data : () => ({
    active_nav:'home'
  }),
  methods:{
    activator()
    {
      const route = this.$route.name;
      const profile = ['panel' , 'user_details' , 'rules'];
      const store = ['my_shops' , 'new_shop' , 'my_shop' , 'new_product' , 'discount'];
      const order = ['new_orders' , 'order_history' , 'order-details'];

      if(profile.includes(route))
      {
        this.active_nav = 'profile'
      }
      else if(store.includes(route))
      {
        this.active_nav = 'store'
      }
      else if(order.includes(route))
      {
        this.active_nav = 'order'
      }
    }
  },
  watch:{
    $route (to, from){
      this.activator()
    }
  },
  computed: {
    getCartItemsCount(){
        return this.SELLER_GLOBAL_DATA.new_orders_count;
    }
  },
  mounted() {
    this.activator()
  }
}
</script>