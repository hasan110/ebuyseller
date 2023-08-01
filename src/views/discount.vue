<template>
  <div class="site-wrapper">
    <site-header link="panel">
      <template v-slot:title>
        پنل فروشندگان
      </template>
    </site-header>
    <site-top-navigation></site-top-navigation>
    <site-section title="اعمال تخفیف">
      <template v-slot:icon>
        <i class="mdi mdi-sale-outline"></i>
      </template>
    </site-section>

    <div class="body-wrapper">
      <div class="body-inner py-3">
        
        <v-container>
          <div v-for="(item , key) in products" :key="key" class="mini-product-wrapper">
            <div class="picture p-2">
              <img :src="ImageUrl + item.files[0]['path']">
            </div>
            <div class="details py-2">
              <div class="name">{{ item.name }}</div>
              <div class="price">
                {{formatPrice(item.price)}} تومان
              </div>
              <div v-if="item.price_before_off">
                قبل تخفیف:
                {{formatPrice(item.price_before_off)}} تومان
              </div>
              <div>
                <v-text-field
                    type="number"
                    class="ltr"
                    label="قیمت جدید"
                    outlined dense hide-details
                    v-model="item.new_price"
                ></v-text-field>
              </div>
            </div>

            <template v-if="item.discount">
              <div class="discount-label">
                <bdi class="tape">
                  %{{item.discount}} تخفیف
                </bdi>
              </div>
            </template>
          </div>
        </v-container>
        
        <div class="absolute-action-wrapper">
          <div class="absolute-action">
            <button v-if="!loading" class="px-btn size-md px-btn-info block" @click="saveDiscounts()">ثبت</button>
            <button v-else class="px-btn size-md px-btn-info disabled block">ثبت</button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'discount',
  data : () => ({
    errors:{},
    filters:{},
    products:[],
    loading:false,
  }),
  methods: {
    saveDiscounts(){
      this.loading = true
      const token = this.getToken()

      this.$axios.post(`store/discount-products`, {products:this.products},
      {
        headers: {
          'api_token':token
        }
      })
      .then(res => {
        this.$notify({
          group: 'foo',
          type: 'success',
          duration: 5000,
          text: res.data.message
        });
        this.loading = false
        this.errors = {}
        this.getAllProducts()
      })
      .catch(err => {
        const error = err.response.data;
        this.$notify({
          group: 'foo',
          type: 'error',
          duration: 5000,
          text: error.message
        });
        this.loading = false
      });
    },
    getAllProducts(){
      const token = this.getToken()
      this.$axios.post(`store/get-all-products` , this.filters ,
      {
        headers: {
          'api_token':token
        }
      })
      .then(res => {
        this.products = res.data.data
      })
      .catch(err => {
        const error = err.response.data;
        if(error.message){
          this.$notify({
            group: 'foo',
            type: 'error',
            duration: 5000,
            text: error.message
          });
        }else{
          this.errors = error.errors
        }
      });
    }
  },
  created() {
    this.checkAuth();
    window.scrollTo(0 , 0);
    this.getAllProducts();
  },
  mounted() {
  }
}
</script>