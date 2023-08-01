                
<template>
  <div class="site-wrapper">
    <site-header link="panel">
      <template v-slot:title>
        جزییات سفارش
      </template>
    </site-header>
    <site-top-navigation></site-top-navigation>
    <!-- <site-section title="جزییات سفارش">
      <template v-slot:icon>
        <i class="mdi mdi-storefront"></i>
      </template>
    </site-section> -->

    <div class="body-wrapper">
      <div class="body-inner py-3 px-2">
        
        <template v-if="loading">
          <v-skeleton-loader
            v-for="(item , key) in 12" :key="key"
            type="card"
            :style="{marginBlock : '.75rem'}"
          ></v-skeleton-loader>
        </template>
        <template v-else>

          <div v-if="parseInt(order_detail.status) === 0" class="text-center pb-5">
            <button class="px-btn size-md success mx-1" @click="confirm_modal = true">تایید سفارش</button>
            <button class="px-btn size-md px-btn-danger mx-1" @click="reject_modal = true">رد سفارش</button>
          </div>

          <div v-if="parseInt(order_detail.status) === 1" class="p-2" >
            <v-alert
              outlined
              type="success"
              text style="font-size:12px"
            >
              این سفارش توسط شما تایید شده و پس از پرداخت توسط مشتری بایستی آن را آماده نمایید. دقت کنید که پس از آماده سازی سفارش وضعیت سفارش را به آماده ارسال تغییر دهید.
            </v-alert>
          </div>

          <div v-if="parseInt(order_detail.status) === 2" class="text-center pb-5">
            <div><button class="px-btn size-md success" @click="send_modal = true">آماده ارسال</button></div>
          </div>

          <div v-if="parseInt(order_detail.status) === 3" class="p-2" >
            <v-alert
              outlined
              type="success"
              text style="font-size:12px"
            >
              سفارش توسط شما آماده ارسال گردیده است. ادمین هماهنگی های لازم برای ارسال سفارش شما را انجام خواهد داد.
            </v-alert>
          </div>

          <div class="p-2">
            <div class="order-detail-box">
              
              <div class="o-row">
                <div class="o-col">وضعیت سفارش</div>
                <div class="o-col">{{ order_detail.status_title }}</div>
              </div>
              <div class="o-row">
                <div class="o-col">کد سفارش</div>
                <div class="o-col">{{ order_detail.id }}</div>
              </div>
              <div class="o-line"></div>
              <div class="o-row">
                <div class="o-col">شناسه سفارش</div>
                <div class="o-col">{{ order_detail.uuid }}</div>
              </div>
              <div class="o-line"></div>
              <div class="o-row">
                <div class="o-col">تحویل گیرنده</div>
                <div class="o-col">{{ order_detail.fullname }}</div>
              </div>
              <div class="o-line"></div>
              <div class="o-row">
                <div class="o-col">استان</div>
                <div class="o-col">{{ order_detail.province }}</div>
              </div>

              <div class="o-row">
                <div class="o-col">شهر</div>
                <div class="o-col">{{ order_detail.city }}</div>
              </div>

              <div class="o-row">
                <div class="o-col">کد پستی</div>
                <div class="o-col">{{ order_detail.postal_code }}</div>
              </div>

              <div class="o-row">
                <div class="o-col">آدرس</div>
                <div class="o-col"><pre>{{ order_detail.address }}</pre></div>
              </div>
              <div class="o-line"></div>
              <div class="o-row">
                <div class="o-col">شماره تماس</div>
                <div class="o-col"><bdi>{{ order_detail.call_number }}</bdi></div>
              </div>
              <div class="o-line"></div>
              <div class="o-row">
                <div class="o-col">هزینه ارسال</div>
                <div class="o-col"><bdi v-if="parseFloat(order_detail.shipping_cost)">{{ formatPrice(order_detail.shipping_cost) }} تومان</bdi><span v-else>رایگان</span></div>
              </div>
              <div class="o-row">
                <div class="o-col">مبلغ فاکتور</div>
                <div class="o-col"><bdi>{{ formatPrice(order_detail.invoice_amount) }} تومان</bdi></div>
              </div>
              <div class="o-row">
                <div class="o-col">مجموع</div>
                <div class="o-col"><bdi>{{ formatPrice(order_detail.total_amount) }} تومان</bdi></div>
              </div>
              <div class="o-line"></div>
              <div class="o-row">
                <div class="o-col">تاریخ</div>
                <div class="o-col"><bdi>{{ order_detail.date }}</bdi></div>
              </div>
              <div class="o-row">
                <div class="o-col">ساعت</div>
                <div class="o-col"><bdi>{{ order_detail.time }}</bdi></div>
              </div>
              <div class="o-line"></div>
              <div class="o-row">
                <div class="o-col">توضیحات</div>
                <div class="o-col"><pre>{{ order_detail.description }}</pre></div>
              </div>
  
              <br><br>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>نام محصول</th>
                      <th>تعداد</th>
                      <th>جمع هزینه</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in order_detail.items"
                      :key="item.id"
                    >
                      <td>{{ item.store_product.name }}</td>
                      <td>{{ item.count }}</td>
                      <td>{{ formatPrice(item.cost) }} تومان</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              
            </div>
          </div>

        </template>

      </div>
    </div>

    <v-dialog
      v-model="confirm_modal"
      persistent
      max-width="450px"
    >
      <v-card>
        <v-card-title>
          <h3>تایید سفارش</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                باتایید سفارش توسط شما مشتری قادر به پرداخت مبلغ سفارش خواهد بود.
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="p-3">
          <v-spacer></v-spacer>
          <button class="px-btn size-md px-btn-danger mx-3" @click="confirm_modal = false">انصراف</button>

          <button v-if="!change_status_loading" class="px-btn size-md success" @click="changeStatus(1)">تایید</button>
          <button v-else class="px-btn size-md success loading disabled">تایید</button>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="reject_modal"
      persistent
      max-width="450px"
    >
      <v-card>
        <v-card-title>
          <h3>رد سفارش</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                از انجام این کار اطمینان دارید؟
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="p-3">
          <v-spacer></v-spacer>
          <button class="px-btn size-md px-btn-danger mx-3" @click="reject_modal = false">بستن</button>

          <button v-if="!change_status_loading" class="px-btn size-md success" @click="changeStatus(5)">رد سفارش</button>
          <button v-else class="px-btn size-md success loading disabled">رد سفارش</button>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="send_modal"
      persistent
      max-width="450px"
    >
      <v-card>
        <v-card-title>
          <h3>آماده ارسال سفارش</h3>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                با تغییر وضعیت سفارش به آماده ارسال عملیات های مربوط به ارسال سفارش از سمت ادمین پیگیری خواهد شد.
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="p-3">
          <v-spacer></v-spacer>
          <button class="px-btn size-md px-btn-danger mx-3" @click="send_modal = false">انصراف</button>

          <button v-if="!change_status_loading" class="px-btn size-md success" @click="changeStatus(3)">تایید</button>
          <button v-else class="px-btn size-md success loading disabled">تایید</button>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
export default {
  name: 'order_details',
  data : () => ({
    errors:{},
    order_id:null,
    order_detail:{},
    loading:true,
    confirm_modal:false,
    send_modal:false,
    complete_modal:false,
    reject_modal:false,
    change_status_loading:false,
  }),
  methods: {
    getOrderDetails(){
      const api_token = this.getToken();
      this.$axios.get(`store/order-details/`+this.order_id,
      {
        headers: {
          'api_token':api_token
        }
      })
      .then(res => {
        const data = res.data.data;
        this.order_detail = data
        this.loading = false
      })
      .catch( () => {
        this.$router.replace({name:'order_history'})
      });
    },
    changeStatus(status){
      this.change_status_loading = true
      const api_token = this.getToken();
      this.$axios.post(`store/change-order-status`,{order_id:this.order_id , status},
      {
        headers: {
          'api_token':api_token
        }
      })
      .then(res => {
        this.getOrderDetails();
        this.$notify({
          group: 'foo',
          type: 'success',
          duration: 5000,
          text: res.data.message
        });
        this.confirm_modal = false
        this.complete_modal = false
        this.send_modal = false
        this.reject_modal = false
        this.change_status_loading = false
      })
      .catch( () => {
        this.change_status_loading = false
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

    if(this.$route.params.id !== ''){
      this.order_id = this.$route.params.id;
      this.getOrderDetails()
    }else{
      this.$router.replace({name:'order_history'});
    }
  },
  mounted() {
  }
}
</script>