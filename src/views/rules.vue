                
<template>
  <div class="site-wrapper">
    <site-header link="panel">
      <template v-slot:title>
        پنل فروشندگان
      </template>
    </site-header>
    <site-top-navigation></site-top-navigation>
    <site-section title="قوانین فروش">
      <template v-slot:icon>
        <i class="mdi mdi-gavel"></i>
      </template>
    </site-section>

    <div class="body-wrapper">
      <div class="body-inner text-center">
        
        <pre class="pre-tag">{{ SETTING.store_panel_rules_text }}</pre>

      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'rules',
  data : () => ({
    errors:{},
    user:{},
    add_credit:{},
    loading:false,
    edit_profile_modal:false,
    add_credit_modal:false,
  }),
  methods: {
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