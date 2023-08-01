                
<template>
  <div class="site-wrapper">
    <site-header link="panel">
      <template v-slot:title>
        پنل فروشندگان
      </template>
    </site-header>
    <site-top-navigation></site-top-navigation>

    <div class="body-wrapper">
      <div class="body-inner">
        
        <div class="px-3">
          <div class="profile-data-wrapper">
            <div class="profile-data">
              <h4 class="pt-4 mb-1">نام و نام خانوادگی:</h4>
              <div class="mb-3">{{USER.fullname}}</div>
              <h5 class="mb-1">شماره تلفن</h5>
              <h5>{{USER.mobile_number}}</h5>
            </div>
            <div class="profile-image-wrapper">
              <img style="width: 70px;height: 70px" :src="StaticImageUrl + 'assets/images/icons/wallet-flat.png'">
              <div style="white-space: nowrap;">
                <span>مبلغ قابل تسویه: </span>
                <bdi> {{formatPrice(USER.income)}} تومان</bdi>
              </div>
            </div>
          </div>
        </div>
        <div class="profile">

          <router-link :to="{name:'user_details'}" class="profile-item">
            <div class="icon">
              <i class="mdi mdi-account-outline"></i>
            </div>
            <div class="content">
              اطلاعات کاربری
            </div>
            <div class="actions">
            </div>
          </router-link>
          <div class="profile-hr"></div>

          <router-link :to="{name:'my_shops'}" class="profile-item">
            <div class="icon">
              <i class="mdi mdi-storefront"></i>
            </div>
            <div class="content">
              اطلاعات فروشگاه
            </div>
            <div class="actions">
            </div>
          </router-link>
          <div class="profile-hr"></div>

          <router-link :to="{name:'bank_account'}" class="profile-item">
            <div class="icon">
              <i class="mdi mdi-wallet-outline"></i>
            </div>
            <div class="content">
              اطلاعات حساب
            </div>
            <div class="actions">
            </div>
          </router-link>
          <div class="profile-hr"></div>

          <router-link :to="{name:'discount'}" class="profile-item">
            <div class="icon">
              <i class="mdi mdi-sale-outline"></i>
            </div>
            <div class="content">
              اعمال تخفیف
            </div>
            <div class="actions">
            </div>
          </router-link>
          <div class="profile-hr"></div>

          <router-link :to="{name:'chats'}" class="profile-item">
            <div class="icon">
              <bdi v-if="parseFloat(SELLER_GLOBAL_DATA.chat_has_unread_msg)" class="badger">{{SELLER_GLOBAL_DATA.chat_has_unread_msg}}</bdi>
              <i class="mdi mdi-chat"></i>
            </div>
            <div class="content">
              گفت و گو ها
            </div>
            <div class="actions">
            </div>
          </router-link>
          <div class="profile-hr"></div>

          <router-link :to="{name:'order_history'}" class="profile-item">
            <div class="icon">
              <i class="mdi mdi-clipboard-list-outline"></i>
            </div>
            <div class="content">
              تاریخچه سفارشات
            </div>
            <div class="actions">
            </div>
          </router-link>
          <div class="profile-hr"></div>

          <router-link :to="{name:'rules'}" class="profile-item">
            <div class="icon">
              <i class="mdi mdi-gavel"></i>
            </div>
            <div class="content">
              قوانین فروش
            </div>
            <div class="actions">
            </div>
          </router-link>
          <div class="profile-hr"></div>

          <div @click="logout_modal = true" class="profile-item">
            <div class="icon">
              <i class="mdi mdi-logout"></i>
            </div>
            <div class="content">
              خروج از حساب
            </div>
            <div class="actions">
            </div>
          </div>
          <div class="profile-hr"></div>
          
        </div>

      </div>
    </div>

    <v-dialog
      v-model="logout_modal"
      persistent
      max-width="450px"
    >
      <v-card>
        <v-card-title>
          <h3>خروج از حساب کاربری</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                می خواهید از حساب خود خارج شوید؟
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="p-3">
          <v-spacer></v-spacer>
          <button class="px-btn size-md px-btn-danger mx-3" @click="logout_modal = false">انصراف</button>
          <button class="px-btn size-md px-btn-primary" @click="logoutUser()">خروج</button>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="edit_profile_modal"
      persistent
      max-width="450px"
    >
      <v-card>
        <v-card-title>
          <h3>ویرایش پروفایل</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field
                  outlined
                  label="نام و نام خانوادگی"
                  required
                  dense
                  v-model="user.fullname"
                ></v-text-field>
                <div v-if="errors.fullname" class="red--text lighten-1">
                  <small>{{errors.fullname[0]}}</small>
                </div>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  outlined
                  label="آدرس"
                  required
                  dense
                  v-model="user.address"
                ></v-textarea>
                <div v-if="errors.address" class="red--text lighten-1">
                  <small>{{errors.address[0]}}</small>
                </div>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="p-3">
          <v-spacer></v-spacer>
          <button class="px-btn size-md px-btn-danger mx-3" @click="edit_profile_modal = false">انصراف</button>
          <button v-if="!loading" class="px-btn size-md px-btn-primary" @click="saveUser()">ثبت</button>
          <button v-else class="px-btn size-md px-btn-primary disabled">ثبت</button>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="add_credit_modal"
      persistent
      max-width="450px"
    >
      <v-card>
        <v-card-title>
          <h3>افزایش اعتبار</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field
                  outlined
                  label="مبلغ"
                  dense
                  v-model="add_credit.amount"
                ></v-text-field>
                <div v-if="errors.amount" class="red--text lighten-1">
                  <small>{{errors.amount[0]}}</small>
                </div>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="p-3">
          <v-spacer></v-spacer>
          <button class="px-btn size-md px-btn-danger mx-3" @click="add_credit_modal = false">انصراف</button>
          <button v-if="!loading" class="px-btn size-md px-btn-primary" @click="addCredit()">ادامه</button>
          <button v-else class="px-btn size-md px-btn-primary disabled">ادامه</button>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
export default {
  name: 'profile',
  data : () => ({
    errors:{},
    user:{},
    add_credit:{},
    loading:false,
    logout_modal:false,
    edit_profile_modal:false,
    add_credit_modal:false,
  }),
  methods: {
    logoutUser(){
      this.$cookies.remove('SellerApiToken')
      this.AUTH_USER({})
      this.$router.replace({name:'login'});
    },
    saveUser(){
      this.loading = true
      const token = this.getToken()
      this.$axios.post(`fast_update_profile`,this.user,
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
        this.getUser(true);
        this.edit_profile_modal = false;
        this.loading = false
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
    addCredit(){
      this.loading = true
      const token = this.getToken()
      this.$axios.post(`add_credit`,this.add_credit,
      {
        headers: {
          'x-api-key':token
        }
      })
      .then(res => {
        location.href = res.data.data
      })
      .catch(err => {
        this.loading = false
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
  },
  mounted() {
  }
}
</script>