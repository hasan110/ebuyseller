<template>
  <v-app>
    <div v-if="LOADING" class="loading-wrapper">
      <div class="loading-inner">
        <span class="loader"></span>
      </div>
    </div>

    <v-main class="app-wrapper">
      <keep-alive :include="['site-header']">
        <router-view></router-view>
      </keep-alive>
    </v-main>

    <notifications group="foo" />
    
  </v-app>
</template>
<script>
export default {
  name: 'App',
  data: () => ({
    modal_question : false,
  }),
  methods:{
    getSetting () {
      this.$axios.get(`get_settings`)
      .then(res => {        
        this.SAVE_SETTING(res.data.data)
      })
      .catch(err => {
      });
    },
    getSellerGlobalData () {
      this.$axios.get(`get_seller_global_data`)
      .then(res => {        
        this.SAVE_SELLER_GLOBAL_DATA(res.data.data)
      })
      .catch(err => {
      });
    },
    auth(api_token){
      this.loading = true
        this.$axios.post(`getUserData`,{},
        {
          headers: {
            'x-api-key':api_token
          }
        })
        .then(res => {
          const data = res.data.data;
          this.AUTH_USER(data)
        })
        .catch(err => {
            this.AUTH_USER(null)
            this.$cookies.remove('SellerApiToken')
          this.$router.replace({name:'panel'})
        });
    }
  },
  created() {
    const api_token = this.getToken();
    if(api_token){
      this.auth(api_token)
    }
    this.getSetting()
    this.getSellerGlobalData()
  },
  mounted(){
    
  }
};
</script>