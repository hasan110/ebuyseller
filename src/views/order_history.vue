                
<template>
  <div class="site-wrapper">
    <site-header link="my_shops">
      <template v-slot:title>
        سفارشات
      </template>
    </site-header>
    <site-top-navigation></site-top-navigation>
    <site-section title="تاریخچه سفارشات">
      <template v-slot:icon>
        <i class="mdi mdi-receipt-text-check"></i>
      </template>
    </site-section>

    <div class="body-wrapper">
      <div class="body-inner py-3">
        
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>شناسه سفارش</th>
                <th>کد سفارش</th>
                <th>سفارش دهنده</th>
                <th>مبلغ کل</th>
                <th>وضعیت</th>
                <th>جزییات</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in invoices"
                :key="item.id"
              >
                <td>{{ item.id }}</td>
                <td>{{ item.uuid }}</td>
                <td>{{ item.fullname }}</td>
                <td>{{ formatPrice(item.total_amount) }} تومان</td>
                <td>{{ item.status_title }}</td>
                <td>
                  <v-btn :to="{name:'order-details' , params:{id:item.uuid}}" class="my-1" icon dark color="info">
                    <v-icon dark>
                      mdi-information
                    </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        
        <template v-if="!loading && invoices.length === 0">
          <div class="py-5 text-center">تاریخچه سفارشات شما خالی است.</div>
        </template>

      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'order_history',
  data : () => ({
    errors:{},
    invoices:[],
    loading:false,
    invoices: [],
    current_page:1,
    last_page:1,
  }),
  watch:{
    current_page() {
      this.getList();
    }
  },
  methods: {
    getInvoices(reset = false){
      if(reset)
      {
        this.current_page = 1
        this.invoices = []
      }
      this.loading = true
      const token = this.getToken()
      
      this.$axios.post(`store/order`,{status:'history' , page:this.current_page},
      {
        headers: {
          'api_token':token
        }
      })
      .then(res => {
        const data = res.data.data;
        this.invoices = this.invoices.concat(data.data)
        this.last_page = data.last_page;
        this.loading = false
      })
      .catch(err => {
        this.loading = false
      });
    },
    loadMore(){
      if(this.current_page < this.last_page){
        this.current_page++;
      }
    },
  },
  created() {
    this.checkAuth();
    window.scrollTo(0 , 0);
    this.getInvoices()
  },
  mounted() {
  }
}
</script>