                
<template>
  <div class="site-wrapper">
    <site-header link="my_shops">
      <template v-slot:title>
        پروفایل
      </template>
    </site-header>
    <site-top-navigation></site-top-navigation>
    <site-section title="اطلاعات حساب">
      <template v-slot:icon>
        <i class="mdi mdi-wallet"></i>
      </template>
    </site-section>

    <div class="body-wrapper">
      <div class="body-inner py-3">
        
        <v-container>
          <v-row>

            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <v-text-field
                label="شماره حساب"
                outlined dense
                v-model="bank.card_number"
                :error-messages="errors.card_number"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <v-text-field
                label="شماره شبا"
                outlined dense
                v-model="bank.shaba_number"
                :error-messages="errors.shaba_number"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <v-file-input
                label="تصویر کارت بانکی"
                outlined dense clearable
                v-model="bank.new_card_image"
                :error-messages="errors.new_card_image"
              ></v-file-input>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="12"
              v-if="bank.card_image"
            >
              <img style="height: 100px" :src="ImageUrl + bank.card_image">
            </v-col>

          </v-row>

        </v-container>
        
        <div class="absolute-action-wrapper">
          <div class="absolute-action">
            <button v-if="!loading" class="px-btn size-md px-btn-info block" @click="saveBank()">ثبت</button>
            <button v-else class="px-btn size-md px-btn-info disabled block">ثبت</button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'bank_account',
  data : () => ({
    errors:{},
    bank:{},
    loading:false,
  }),
  methods: {
    getBank(){
      const token = this.getToken()
      this.$axios.get(`get_bank_account`,
      {
        headers: {
          'api_token':token
        }
      })
      .then(res => {
        this.bank = res.data.data
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
    saveBank(){
      this.loading = true
      const token = this.getToken()
      const form = new FormData;
      for (const [key, value] of Object.entries(this.bank)) {
        if(value)
        {
          form.append(key , value);
        }
      }
      this.$axios.post(`edit_bank_account`,form,
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
        this.getBank()
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
    this.getBank()
  }
}
</script>