<template>
  <div class="authenticate">
    <router-link :to="{name:'panel'}" class="p-2 float-left">
      <img class="logo-top" :src="StaticImageUrl + 'assets/images/logo.svg'">
    </router-link>
    <div class="p-2 float-right">
      <router-link :to="{name:'register'}" class="px-btn size-md round primary">
        ثبت نام
      </router-link>
    </div>

    <div class="form-out">
      <div class="form-in text-center">
        <h3>ورود</h3>

        <div class="px-form-group">
          <label>لطفا شماره تلفن خود را وارد کنید</label>
          <input class="px-form-control text-center latin-input-3" v-model="data.mobile_number" placeholder="0 9 - - - - - - - - -" />
          <div v-if="errors.mobile_number" class="px-form-text">
            <small>{{errors.mobile_number[0]}}</small>
          </div>
        </div>
        
        <div class="px-form-group">
          <div class="px-form-append">
            <input class="px-form-control text-center latin-input-3" v-model="data.password" :type="[show_password ? 'text' : 'password']" placeholder="رمز عبور" />
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

        <div class="mb-4">
          <div class="a">حساب کاربری ندارید؟</div>
          <router-link :to="{name:'register'}" class="a">ثبت نام کنید</router-link>
        </div>
      
        <div class="mb-4">
          <button @click="LoginByPassword" class="px-btn size-md block round primary">ورود</button>
        </div>

        <!-- <div class="text-center mb-2">
          رمز عبور خود را فراموش کرده اید؟  <router-link :to="{ name:'LoginByNumber' }" class="ar-link">ورود با کد یکبار مصرف</router-link>
        </div>

        <div class="text-center mb-2">
          <router-link :to="{ name:'LoginByEmail' }" class="ar-link">ورود با ایمیل</router-link>
        </div> -->
      </div>
    </div>

  </div>
</template>

<script>
import {TheMask} from 'vue-the-mask'
export default {
  name: 'LoginByPassword',
  components:{
    TheMask
  },
  data : () => ({
    data:{
      mobile_number:'',
      password:'',
      from:'site',
      type:'login'
    },
    active_tab:'password',
    errorMessage:null,
    show_password:false,
    errors:{}
  }),
  methods:{
    LoginByPassword(){
      this.$axios.post(`seller/login` , this.data)
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
