
<template>
  <div class="site-wrapper">
    <site-header link="panel">
      <template v-slot:title>
        پیام ها
      </template>
    </site-header>
    <site-top-navigation></site-top-navigation>

    <div class="body-wrapper">
      <div class="body-inner py-3 px-2">
        
        <div class="chat-list-wrapper">
          
          <template v-if="loading">
            <v-skeleton-loader
            v-for="(item , key) in 15" :key="key"
              type="list-item-avatar-two-line"
              class="my-4"
            ></v-skeleton-loader>
          </template>

          <template v-if="chats.length <= 0">
            <div class="no-data-placeholder">
              <div>
                <img :src="StaticImageUrl + 'assets/images/no-search-results-icon-retina.svg'">
              </div>
              داده ای برای نمایش وجود ندارد
            </div>
          </template>

          <router-link v-for="(item , key) in chats" :key="key" class="chat-list-item" :to="{name:'chat_details' , params:{id:item.id}}">
            <div class="icon">
              <img v-if="item.store && item.store.banner" :src="ImageUrl + item.store.banner">
              <img v-else :src="StaticImageUrl + 'assets/images/icons/store.svg'">
            </div>
            <div class="texts">
              <h4 v-if="item.user">{{item.user.fullname}}</h4>
              <h4 v-else>بی نام</h4>
              <div v-if="item.messages && item.messages[0]" class="message">{{item.messages[0].text}}</div>
            </div>
            <div class="unread">
              <div v-if="item.unread_messages" class="unread-bullet">{{item.unread_messages}}</div>
            </div>
          </router-link>

        </div>  

      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'chats',
  data : () => ({
    errors:{},
    chats:[],
    current_page:1,
    last_page:null,
    loading:true
  }),
  methods: {
    getChats(){
      const token = this.getToken()
      this.$axios.get(`getSellerChatList?page=${this.current_page}`,
      {
        headers: {
          'x-api-key':token
        }
      })
      .then(res => {
        this.chats = res.data.data.data;
        this.last_page = res.data.data.last_page
        this.loading = false
      })
      .catch(err => {
        this.loading = false
      });
    }
  },
  created() {
    this.checkAuth();
    window.scrollTo(0 , 0);
  },
  mounted() {
    this.getChats();
  }
}
</script>