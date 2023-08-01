<template>
  <div class="authenticate">
    <div class="p-2 float-left">
      <img class="logo-top" :src="StaticImageUrl + 'assets/images/logo.svg'">
    </div>

    <br>
    <div class="form-out">
      <div class="form-in text-center">
        <h3>ثبت نام</h3>

        <div class="px-form-group">
          <label>لطفا شماره تلفن خود را وارد کنید</label>
          <input  class="px-form-control text-center latin-input-3" v-model="data.mobile_number" placeholder="0 9 - - - - - - - - -" />
          <div v-if="errors.mobile_number" class="px-form-text">
            <small>{{errors.mobile_number[0]}}</small>
          </div>
        </div>
        
        <div class="px-form-group">
          <label>یک رمز عبور مناسب وارد کنید.</label>
          <div class="px-form-append">
            <input  class="px-form-control text-center latin-input-3" v-model="data.password" :type="[show_password ? 'text' : 'password']" placeholder="رمز عبور" />
            <span class="px-form-icon" @click="show_password = !show_password">
              <i v-if="show_password" class="fa fa-eye"></i>
              <i v-else class="fa fa-eye-slash"></i>
            </span>
          </div>
          <div v-if="errors.password" class="px-form-text">
            <small>{{errors.password[0]}}</small>
          </div>
        </div>

        <div v-if="errorMessage" class="px-alert danger round mb-3">
          <small>{{errorMessage}}</small>
        </div>

        <div v-if="step === 1" class="mb-4">
          <label>کد ارسال شده را وارد کنید.</label>
          <div class="px-form-group">
            <input class="px-form-control text-center latin-input-3" v-model="data.code" />
          </div>
          <div v-if="errors.code" class="px-form-text">
            <small>{{errors.code[0]}}</small>
          </div>
        </div>

        <div class="mb-4" v-if="step === 0">
          <span class="mx-1"><input type="checkbox" v-model="accept_rules"></span>
          <span>با </span>
          <span><a class="text-primary" @click="rules_dialog = true">قوانین و مقررات </a></span>
          <span>موافقم</span>
        </div>

        <div class="mb-4" v-if="step === 0">
          <button v-if="!loading" @click="registerByNumber" class="px-btn size-md block round primary">ثبت نام</button>
          <button v-else class="px-btn size-md primary round disabled block">ثبت نام</button>
        </div>
        <div class="mb-4" v-if="step === 1">
          <button v-if="!loading" @click="numberVerify" class="px-btn size-md block round primary">فعالسازی</button>
          <button v-else class="px-btn size-md primary round disabled block">فعالسازی</button>
        </div>

        <div class="mb-4" v-if="step === 0">
          <div class="a">قبلا ثبت نام کرده اید؟</div>
          <router-link :to="{name:'login'}" class="a">ورود</router-link>
        </div>

        <!-- <div class="text-center mb-2">
          رمز عبور خود را فراموش کرده اید؟  <router-link :to="{ name:'LoginByNumber' }" class="px-link">ورود با کد یکبار مصرف</router-link>
        </div>

        <div class="text-center mb-2">
          <router-link :to="{ name:'LoginByEmail' }" class="px-link">ورود با ایمیل</router-link>
        </div> -->
      </div>
    </div>

    <v-dialog
        v-model="rules_dialog"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <h3>قوانین فروش</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <div class="p-3">
                  <pre>{{SETTING.store_panel_rules_text}}</pre>
                </div>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="p-3">
          <v-spacer></v-spacer>
          <button class="px-btn size-md px-btn-primary" @click="rules_dialog = false">خواندم</button>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import {TheMask} from 'vue-the-mask'
export default {
  name: 'register',
  components:{
    TheMask
  },
  data : () => ({
    data:{
      mobile_number:'',
      password:'',
      seller:1,
      from:'site',
      type:'register'
    },
    errorMessage:null,
    rules_dialog:false,
    show_password:false,
    loading:false,
    accept_rules:false,
    step:0,
    errors:{}
  }),
  methods:{
    registerByNumber(){
      if(!this.accept_rules)
      {
        this.$notify({
          group: 'foo',
          type: 'warning',
          duration: 5000,
          text: 'لطفا برای ثبت نام تیک موافقت با قوانین را فعال کنید.'
        });
        return;
      }
      this.loading = true
      this.$axios.post(`registerByNumber` , this.data)
      .then( () => {
        this.step = 1
        this.loading = false
      })
      .catch(err => {
        if(err.response.data.message){
          this.errorMessage = err.response.data.message
          this.errors = {}
        }else if(err.response.data.errors){
          this.errors = err.response.data.errors
          this.errorMessage = null
        }
        this.loading = false
      });
    },
    numberVerify(){
      this.$axios.post(`numberVerify` , this.data)
      .then( res => {
        const data = res.data.data;
        this.$cookies.set("SellerApiToken", data.api_token , 60*60*24*365);
        this.AUTH_USER(data)
        this.$router.replace({name:'panel'});
      })
      .catch(err => {
        if(err.response.data.message){
          this.errorMessage = err.response.data.message
          this.errors = {}
        }else if(err.response.data.errors){
          this.errors = err.response.data.errors
          this.errorMessage = null
        }
      });
    }
  },
  watch:{
    
  },
  mounted() {
    this.checkUnAuthenticated()
  }
}
</script>
