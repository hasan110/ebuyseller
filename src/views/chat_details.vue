
<template>
  <div class="site-wrapper">
    <site-header style="position:fixed;top:0" link="chats">
      <template v-slot:title>
        پیام های چت
      </template>
    </site-header>

    <div class="body-wrapper">
      <div class="body-inner py-3 px-2">
        
        <div ref="chatContainer" class="chat-messages-wrapper">
          <template v-if="chat.id">
            <div v-for="msg in chat.messages" :key="msg.id">

              <div v-if="msg.sender == 'user'" class="left-msg">
                <div class="msg-text">
                  <pre>{{msg.text}}</pre>
                </div>
              </div>
              <div v-else class="right-msg">
                <div class="msg-text">
                  <pre>{{msg.text}}</pre>
                </div>
              </div>
              
            </div>
          </template>
        </div>  
      </div>
    </div>

    <div class="chat-input-wrapper">
    <form @submit.prevent="sendChatMessage" class="chat-input-inner">
      <div class="chat-input">
        <input placeholder="چیزی بنویسید..." type="text" v-model="form.message">
      </div>
      <div class="submit-input" :class="[!form.message ? 'disable' : '']">
        <button type="submit"><i class="mdi mdi-send"></i></button>
      </div>
    </form>
    </div>

  </div>
</template>
<script>
export default {
  name: 'chatDetails',
  data : () => ({
    errors:{},
    chat:{},
    form:{},
    chat_id:null,
    loading:true,
    sending:false,
  }),
  methods: {
    getChatDetails(){
      const token = this.getToken()
      this.$axios.get(`getSellerChatDetails/${this.chat_id}`,
      {
        headers: {
          'x-api-key':token
        }
      })
      .then(res => {
        const d = res.data
        this.chat = d.data;
        this.loading = false
        const container = this.$refs.chatContainer;
        container.scrollTop = container.scrollHeight;
      })
      .catch(err => {
        this.$router.replace({name:'chats'});
      });
    },
    sendChatMessage(){
      if(this.sending || !this.form.message)
      {
        return;
      }
      this.sending = true
      const token = this.getToken()
      this.form.chat_id = this.chat.id
      this.$axios.post(`sendSellerChatMessage`, this.form ,
      {
        headers: {
          'x-api-key':token
        }
      })
      .then(res => {
        this.form = {}
        this.sending = false
        this.getChatDetails()
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
        this.sending = false
      });
    },
  },
  updated() {
    const container = this.$refs.chatContainer;
    container.scrollTop = container.scrollHeight;
  },
  created() {
    this.checkAuth();
    window.scrollTo(0 , 0);
  },
  mounted() {
    if(this.$route.params.id !== ''){
      this.chat_id = this.$route.params.id;
      this.getChatDetails()
    }else{
      this.$router.replace({name:'chats'});
    }
  }
}
</script>