                
<template>
  <div class="site-wrapper">
    <site-header link="panel">
      <template v-slot:title>
        فروشگاه
      </template>
    </site-header>
    <site-top-navigation></site-top-navigation>
    <site-section title="فروشگاه های من">
      <template v-slot:icon>
        <i class="mdi mdi-storefront"></i>
      </template>
    </site-section>

    <div class="body-wrapper">
      <div class="body-inner py-3 px-2">
        
        <div class="d-flex pb-5">
          <div></div>
          <div><router-link :to="{name:'new_shop'}" class="px-btn size-md px-btn-info">ایجاد فروشگاه جدید +</router-link></div>
        </div>

        <template v-if="loading">
          <v-skeleton-loader
            v-for="(item , key) in 12" :key="key"
            type="card"
            :style="{marginBlock : '.75rem'}"
          ></v-skeleton-loader>
        </template>
        <template v-else>
          <div v-for="(item , key) in list" :key="key" class="mini-product-wrapper">
            <div class="picture">
              <img v-if="item.banner" :src="ImageUrl + item.banner">
            </div>
            <div class="details">
              <div class="name">{{ item.name }}</div>
              <div class="store-name"><i class="mdi mdi-archive-check-outline"></i>کد فروشگاه : {{ item.id }}</div>
            </div>
            <div class="actions">
              <div v-if="parseInt(item.status) == 0">
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="my-1" v-bind="attrs" v-on="on" icon dark small color="warning">
                      <v-icon dark>
                        mdi-timer-cog-outline
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>این فروشگاه در انتظار تایید است</span>
                </v-tooltip>
                
              </div>
              <div>
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="my-1" :to="{name:'edit_shop' , params:{id:item.uuid}}" v-bind="attrs" v-on="on" fab dark x-small color="primary">
                      <v-icon dark>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>ویرایش فروشگاه</span>
                </v-tooltip>
                
              </div>
              <div>
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="my-1" v-bind="attrs" v-on="on" :to="{name:'my_shop' , params:{id:item.uuid}}" dark x-small color="success">
                      محصولات
                    </v-btn>
                  </template>
                  <span>محصولات فروشگاه</span>
                </v-tooltip>
                
              </div>

            </div>
          </div>
        </template>

      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'my_shops',
  data : () => ({
    errors:{},
    list:[],
    loading:true,
  }),
  methods: {
    getStores(){
      const api_token = this.getToken();
      this.$axios.get(`store/list`,
      {
        headers: {
          'api_token':api_token
        }
      })
      .then(res => {
        const data = res.data.data;
        this.list = data
        this.loading = false
      })
      .catch(err => {
        this.$router.replace({name:'panel'})
      });
    }
  },
  created() {
    this.checkAuth();
    window.scrollTo(0 , 0);
    this.getStores()
  },
  mounted() {
  }
}
</script>