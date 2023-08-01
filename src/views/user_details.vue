                
<template>
  <div class="site-wrapper">
    <site-header link="panel">
      <template v-slot:title>
        اطلاعات کاربری
      </template>
    </site-header>
    <site-top-navigation></site-top-navigation>
    <site-section title="اطلاعات کاربری">
      <template v-slot:icon>
        <i class="mdi mdi-account-outline"></i>
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
                label="نام و نام خانوادگی"
                outlined dense
                v-model="info.fullname"
                :error-messages="errors.fullname"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="5"
            >
              <v-text-field
                label="کد ملی"
                outlined dense
                v-model="info.national_code"
                :error-messages="errors.national_code"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                class="ltr"
                label="شماره تلفن"
                readonly
                outlined dense
                v-model="info.mobile_number"
                :error-messages="errors.mobile_number"
              ></v-text-field>
            </v-col>

          </v-row>
          
          <v-row> 
            <v-col cols="12" md="6" sm="12">
              <v-autocomplete
                v-model="info.province"
                :items="provinces"
                outlined dense
                label="استان"
                :error-messages="errors.province"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="6" sm="12">
              <v-autocomplete
                v-model="info.city"
                :items="cities"
                outlined dense
                label="شهر"
                :error-messages="errors.city"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12">
              <v-textarea
                outlined
                label="آدرس پستی"
                v-model="info.address"
                :error-messages="errors.address"
              ></v-textarea>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                class="ltr"
                label="کد پستی"
                outlined dense
                v-model="info.postal_code"
                :error-messages="errors.postal_code"
              ></v-text-field>
            </v-col>

          </v-row>
        </v-container>
        
        <div class="absolute-action-wrapper">
          <div class="absolute-action">
            <button class="px-btn size-md px-btn-primary block" @click="saveInfo()" :class="[loading ? 'loading' : '']">ذخیره</button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import cities from '../plugins/cities'
import provinces from '../plugins/provinces'
export default {
  name: 'user_details',
  data : () => ({
    errors:{},
    info:{},
    loading:false,
    cities,
    provinces,
  }),
  methods: {
    saveInfo(){
      this.loading = true
      const token = this.getToken()
      this.$axios.post(`seller_update_profile`,this.info,
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
    },
    getUserData(){
      const api_token = this.getToken();
      this.$axios.post(`getUserData`,{},
      {
        headers: {
          'api_token':api_token
        }
      })
      .then(res => {
        const data = res.data.data;
        this.info = data
      })
      .catch(err => {
        this.$router.replace({name:'panel'})
      });
    }
  },
  created() {
    this.checkAuth();
    window.scrollTo(0 , 0);
    this.getUserData()
  },
  mounted() {
  }
}
</script>