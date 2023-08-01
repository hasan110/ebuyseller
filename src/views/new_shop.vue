                
<template>
  <div class="site-wrapper">
    <site-header link="my_shops">
      <template v-slot:title>
        فروشگاه
      </template>
    </site-header>
    <site-top-navigation></site-top-navigation>
    <site-section title="ایجاد فروشگاه">
      <template v-slot:icon>
        <i class="mdi mdi-store-edit-outline"></i>
      </template>
    </site-section>

    <div class="body-wrapper">
      <div class="body-inner py-3">
        
        <v-container>
          <v-row>

            <v-col
              cols="12"
              sm="12"
              md="7"
            >
              <v-text-field
                label="نام فروشگاه"
                outlined dense
                v-model="store.name"
                :error-messages="errors.name"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="5"
            >
              <v-text-field
                label="نام فروشنده"
                outlined dense
                v-model="store.owner_name"
                :error-messages="errors.owner_name"
              ></v-text-field>
            </v-col>

<!--            <v-col-->
<!--              cols="12"-->
<!--              sm="12"-->
<!--              md="6"-->
<!--            >-->
<!--              <v-select-->
<!--                outlined dense-->
<!--                item-text="name"-->
<!--                item-value="code"-->
<!--                :items="available_cities"-->
<!--                label="شهر تحت پوشش"-->
<!--                v-model="store.city"-->
<!--                :error-messages="errors.city"-->
<!--              ></v-select>-->
<!--            </v-col>-->
            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-textarea
                outlined
                label="نشانی فروشگاه"
                v-model="store.address"
                :error-messages="errors.address"
              ></v-textarea>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-file-input
                label="تصویر فروشگاه"
                outlined dense clearable
                v-model="store.banner"
                :error-messages="errors.banner"
              ></v-file-input>
            </v-col>

          </v-row>
          
          <v-row>

            <v-col cols="12">
              <v-textarea
                outlined
                label="درباره فروشگاه"
                v-model="store.description"
                :error-messages="errors.description"
              ></v-textarea>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-select
                item-text="text"
                item-value="value"
                :items="shipping_time_items"
                label="مدت زمان تحویل تقریبی"
                outlined dense
                v-model="store.shipping_time"
                :error-messages="errors.shipping_time"
              ></v-select>
            </v-col>

          </v-row>
        </v-container>
        
        <div class="absolute-action-wrapper">
          <div class="absolute-action">
            <button v-if="!loading" class="px-btn size-md px-btn-info block" @click="saveShop()">ثبت</button>
            <button v-else class="px-btn size-md px-btn-info disabled block">ثبت</button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import available_cities from '../plugins/available_cities'
export default {
  name: 'new_shop',
  data : () => ({
    errors:{},
    store:{},
    loading:false,
    available_cities,
    shipping_time_items: [
      { text: 'یک روز کاری', value: 1 },
      { text: 'دو روز کاری', value: 2 },
      { text: 'سه روز کاری', value: 3 },
    ]
  }),
  methods: {
    saveShop(){
      this.loading = true
      const token = this.getToken()

      const form = new FormData;
      for (const [key, value] of Object.entries(this.store)) {
        if(value)
        {
          form.append(key , value);
        }
      }
      
      this.$axios.post(`store/add`,form,
      {
        headers: {
          'x-api-key':token
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
        this.$router.replace({name:'my_shops'})
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
        this.loading = false
      });
    }
  },
  created() {
    this.checkAuth();
    window.scrollTo(0 , 0);
  },
  mounted() {
  }
}
</script>