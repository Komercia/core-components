<template>
  <div class="komercia_chat_header" style="background-color: var(--main_color);">
    <div class="">
      <img v-if="storeData.logo" class="komercia_chat_header_logo" :src="`https://api2.komercia.co/logos/${storeData.logo}`">
      <div class="">
        <!-- <h2>Hola {{ storeData.nombre }}</h2>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Emoji_u1f44b.svg/2000px-Emoji_u1f44b.svg.png" width="40"> -->
      </div>
    </div>
    <svg @click="openChat" fill="#FFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  </div>
</template>

<script>
export default {
  props: ['storeData'],
  methods: {
    openChat() {
      this.$emit('openChat')
    }
  }
}
</script>

<style scoped>
.komercia_chat_header {
  width: 100%;
  height: 70px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  z-index: 2;
  /*background-image: url('../../assets/pattern.png');*/
  background: linear-gradient(135deg, rgb(35, 146, 236), rgb(13, 92, 156));
  background-size: cover;
  transition: 0.3s;
}
.komercia_chat_header_logo {
  max-width: 100px;
  max-height: 50px;
  padding: 0 10px;
}
.komercia_chat_header_info {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.komercia_chat_header svg {
  display: none;
}
.komercia_chat_header h2 {
  display: none;
  font-size: 22px;
  font-weight: 600;
}
.komercia_chat_header_info p {
  font-size: 12px;
  font-weight: lighter;
  color: rgba(255, 255, 255, 0.7);
}

.komercia_chat.new_chat .komercia_chat_header {
  height: 400px;
}
.komercia_chat.new_chat .komercia_chat_header h2 {
  display: grid;
}

@media (max-width: 500px) {
  .komercia_chat_header svg {
    display: block;
  }
}
</style>
