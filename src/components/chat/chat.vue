<template>
  <div id="komerciaChat" v-show="loading">
    <div class="komercia_chat" v-show="openchat">
      <div class="komercia_chat_header" style="background-color: var(--main_color);">
        <template v-if="storeData.logo">
          <img class="komercia_chat_header_logo" :src="`https://api.komercia.co/logos/${storeData.logo}`">
        </template>
        <svg @click="openChat" fill="#FFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </div>
      <template v-if="userData.id">
        <div class="komercia_chat_messages" id="KomerciaMessages">
          <p v-for="(item, index) in messages" :key="index" :class="item.from" style="background-color: var(--main_color);">{{ item.message }}</p>
        </div>
        <div class="komercia_chat_input">
          <input v-model="message" @keydown.enter.prevent="submitMessage" placeholder="Escribir una respuesta">
          <img @click="submitMessage" src="https://js.intercomcdn.com/images/send-button.553b8d28.png">
        </div>
      </template>
      <Login v-else />
    </div>
    <span class="komercia_chat_close" @click="openChat">
      <svg v-if="openchat" fill="#FFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
      <svg v-else fill="#FFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </span>
  </div>
</template>

<script>
import Login from './login'

export default {
  components: { Login },
  name: 'KoChat',
  created() {
    window.onload = () => {
      setTimeout(() => {
        this.loadMessages()
        this.loading = true;
      }, 3000)
    }
  },
  data () {
    return {
      message: '',
      messages: [],
      tienda: 0,
      key: '',
      openchat: false,
      noChat: false,
      loading: false,
    }
  },
  computed: {
    storeData () {
      return this.$store.state.tienda
    },
    userData () {
      return this.$store.state.userData
    }
  },
  methods: {
    loadMessages () {
      const id = this.storeData.id_tienda;
      this.$firebase.database().ref('chats/').orderByChild('store_id').equalTo(id).on('value', snapshot => {
        if (snapshot.val()) {
          const chatsTMP = []
          snapshot.forEach((childSnapshot) => {
            let chatTMP = {}
            chatTMP = Object.assign({key: childSnapshot.key}, childSnapshot.val())
            chatsTMP.push(chatTMP)
          })
          const result = chatsTMP.filter(chat => chat.customer_id === this.userData.id)[0]
          if(result) {
            this.key = result.key
          }
        }
        if (this.key) {
          const chatsMessages = this.$firebase.database().ref(`chats/${this.key}/messages`)
          chatsMessages.on('value', snapshot => {
            this.messages = Object.values(snapshot.val())
          })
        } else {
          this.noChat = true
        }
      })
    },
    openChat () {
      this.openchat = !this.openchat
    },
    submitMessage () {
      if (!this.noChat) {
        this.newMessage();
      } else {
        this.newChat();
      }
      this.message = null
    },
    newMessage() {
      const chat = {
        from: 'customer',
        created: new Date(),
        message: this.message
      }
      this.$firebase.database().ref(`chats/${this.key}/messages`).push(chat)

      let pendingRef = this.$firebase.database().ref(`/chats/${this.key}/pending_messages_store`);
      pendingRef.transaction(function(pending) {
        if (pending != null) {
          return pending + 1;
        } else {
          return 1
        }
      })

      let update = {}
      update[`/chats/${this.key}/pending_messages_customer`] = 0
      update[`/chats/${this.key}/messages_update_last`] = Date.now()
      this.$firebase.database().ref().update(update)
    },
    newChat() {
      const chat = {
        customer: {
          id: this.userData.id,
          name: this.userData.nombre,
          photo: this.userData.foto
        },
        customer_id: this.userData.id,
        messages_update_last: Date.now(),
        pending_messages_store: 1,
        pending_messages_customer: 0,
        messages: {
          '0': {
            from: 'customer',
            created: new Date(),
            message: this.message
          }
        },
        store: {
          id: this.storeData.id_tienda,
          name: this.storeData.nombre,
          photo: this.storeData.logo
        },
        store_id: this.storeData.id_tienda
      }
      this.$firebase.database().ref(`chats/`).push(chat)
      this.noChat = false
    },
    scrollDown () {
      setTimeout(() => {
        const KomerciaMessages = document.getElementById('KomerciaMessages')
        KomerciaMessages.scrollTop = KomerciaMessages.scrollHeight
      }, 100)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*@import '../../static/index.css';*/

  #komerciaChat{
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 0;
    height: 0;
    z-index: 99999999;
  }
  .komercia_chat *{
    padding: 0;
    margin: 0;
  }
  .komercia_chat_close{
    position: fixed;
    right: 10px;
    bottom: 10px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--button_text_color);
    background-color: var(--button_color);
    cursor: pointer;
  }
  .komercia_chat_close i{
    font-size: 30px;
  }
  .komercia_chat{
    position: fixed;
    bottom: 80px;
    right: 10px;
    max-width: 370px;
    width: 100%;
    max-height: 590px;
    height: 100%;
    background-color: #FFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    box-shadow: 0 5px 40px rgba(0,0,0,.16);
    z-index: 3;
  }
  .komercia_chat_header{
    width: 100%;
    height: 70px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #FFF;
    box-shadow: 0 0 6px 0 rgba(0,0,0,0.1);
    box-sizing: border-box;
    z-index: 2;
  }
  .komercia_chat_header_logo{
    max-width: 100px;
    max-height: 50px;
    padding: 0 10px;
  }
  .komercia_chat_header_info{
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  .komercia_chat_header_info svg{
    display: none;
  }
  .komercia_chat_header_info h2{
    font-size: 15px;
    font-weight: normal;
  }
  .komercia_chat_header_info p{
    font-size: 12px;
    font-weight: lighter;
    color: rgba(255, 255, 255, 0.7);
  }
  .komercia_chat_input{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #f4f7f9;
  }
  .komercia_chat_input input{
    width: 80%;
    height: 18px;
    padding: 15px 0;
    resize: none;
    border: none;
    outline: none;
    background-color: #f4f7f9;
    color: #565867;
  }
  .komercia_chat_input img{
  color: #d6dde2;
  cursor: pointer;
  }
  .komercia_chat_input img:hover{
    color: #cbd2d6;
  }
  .komercia_chat_messages{
    width: 100%;
    height: calc(100% - 120px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: auto;
  }
  .komercia_chat_messages .store{
    max-width: 98%;
    background-color: #EEE !important;
    padding: 10px;
    margin: 10px;
  }
  .komercia_chat_messages .customer{
    max-width: 98%;
    padding: 10px;
    color: #FFF;
    align-self: flex-end;
    margin: 10px;
    text-align: right;
  }
  @media(max-width: 500px){
    .komercia_chat{
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      max-width: 100%;
      max-height: 100vh;
    }
    .komercia_chat_header_info svg{
      display: block;
    }
  }
</style>
