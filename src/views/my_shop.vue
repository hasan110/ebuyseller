                
<template>
  <div class="site-wrapper">
    <site-header link="panel">
      <template v-slot:title>
        فروشگاه
      </template>
    </site-header>
    <site-top-navigation></site-top-navigation>
    <site-section :title="store.name ? store.name : 'فروشگاه'">
      <template v-slot:icon>
        <i class="mdi mdi-storefront"></i>
      </template>
    </site-section>

    <div class="body-wrapper">
      <div class="body-inner py-3 px-2">

        <div class="d-flex pb-5">
          <div></div>
          <div><router-link :to="{name:'new_product' , params:{store_id:store_id}}" class="px-btn size-md px-btn-info">ایجاد محصول جدید +</router-link></div>
        </div>

        <template v-if="loading">
          <v-skeleton-loader
            v-for="(item , key) in 12" :key="key"
            type="card"
            :style="{marginBlock : '.75rem'}"
          ></v-skeleton-loader>
        </template>
        <template v-else>
          <div v-for="(item , key) in store.store_products" :key="key" class="mini-product-wrapper">
            <div class="picture">
              <img :src="ImageUrl + item.files[0]['path']">
            </div>
            <div class="details">
              <div class="name">{{ item.name }}</div>
              <div class="price">
                {{formatPrice(item.price)}} تومان
              </div>
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
                  <span>این محصول در انتظار تایید است</span>
                </v-tooltip>
                
              </div>
              <div>
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="my-1" :to="{name:'edit_product' , params:{id:item.id}}" v-bind="attrs" v-on="on" fab dark x-small color="primary">
                      <v-icon dark>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>ویرایش محصول</span>
                </v-tooltip>
                
              </div>
              <div>
               <v-tooltip right>
                 <template v-slot:activator="{ on, attrs }">
                   <v-btn class="my-1" @click="delete_product_id = item.id , delete_dialog = true" fab dark x-small color="red">
                     <v-icon dark>
                       mdi-delete
                     </v-icon>
                   </v-btn>
                 </template>
                 <span>حذف محصول</span>
               </v-tooltip>
                
              </div>
            </div>
          </div>
        </template>

        <template v-if="!loading && store.store_products !== undefined && store.store_products.length === 0">
          <div class="py-5 text-center">هنوز محصولی ایجاد نشده است.</div>
        </template>


      </div>
    </div>

    <v-dialog
        v-model="delete_dialog"
        persistent
        max-width="450px"
    >
      <v-card>
        <v-card-title>
          <h3>حذف محصول</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                از حذف این محصول اطمینان دارید؟
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="p-3">
          <v-spacer></v-spacer>
           <button class="px-btn size-md px-btn-danger mx-3" @click="delete_dialog = false">انصراف</button>
          <button class="px-btn size-md px-btn-primary" @click="deleteProduct()">حذف</button>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
export default {
  name: 'my_shop',
  data : () => ({
    errors:{},
    store:{},
    store_id:null,
    delete_product_id:null,
    loading:true,
    delete_loading:false,
    delete_dialog:false,
  }),
  methods: {
    getStoreData(){
      const api_token = this.getToken();
      this.$axios.get(`store/data/`+this.store_id,
      {
        headers: {
          'api_token':api_token
        }
      })
      .then(res => {
        const data = res.data.data;
        this.store = data
        this.loading = false
      })
      .catch(err => {
        this.$router.replace({name:'my_shops'})
      });
    },
    deleteProduct(){
      this.delete_loading = true
      const api_token = this.getToken();
      this.$axios.post(`store/delete-product`,{id:this.delete_product_id},
      {
        headers: {
          'api_token':api_token
        }
      })
      .then(res => {
        this.$notify({
          group: 'foo',
          type: 'success',
          duration: 5000,
          text: res.data.message
        });
        this.delete_loading = false
        this.delete_dialog = false
        this.errors = {}
        this.getStoreData()
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
        this.delete_loading = false
      });
    },
  },
  created() {
    this.checkAuth();
    window.scrollTo(0 , 0);

    if(this.$route.params.id !== ''){
      this.store_id = this.$route.params.id;
      this.getStoreData()
    }else{
      this.$router.replace({name:'my_shops'});
    }
  },
  mounted() {
  }
}
</script>