<template>
  <div class="komercia_chat_login">
    <p class="text">Si necesitas ayuda déjanos un mensaje para chatear contigo</p>
    <form class="login_form" v-on:submit.prevent>
      <el-input type="email" placeholder="Correo electrónico" v-model="email" />
      <el-input type="password" placeholder="Contraseña" v-model="password" />
      <el-button type="primary" @click="login" plain>Iniciar sesión</el-button>
    </form>
    <p class="text or">Ó</p>
    <a href="https://login.komercia.co/registrar-cliente"><el-button type="primary">Registrate</el-button></a>
  </div>
</template>

<script>
import axios from 'axios'
import { Button, Input } from 'element-ui'

export default {
  components: { 'ElButton': Button, 'ElInput': Input },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const params = {
        email: this.email,
        password: this.password
      }
      axios
        .post(`${this.$urlHttp}/logueo`, params)
        .then(response => {
          localStorage.setItem('authData', JSON.stringify(response.data))
          document.cookie = `authData = ${
            response.data.accessToken
          }; domain = komercia.co; expires=Thu, 01 Dec 2050 00:00:00 UTC;`
          const config = {
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${response.data.accessToken}`,
              'Access-Control-Allow-Origin': '*'
            }
          }
          axios.get(`${this.$urlHttp}/api/user/data`, config).then(response => {
            this.$store.state.userData = response.data.usuario
          })
        })
        .catch(err => {
          if (err) {
            // se activa la clase o display: none para mostrar el error de contraseña o correo
          }
        })
    }
  }
}
</script>

<style scoped>
  .komercia_chat_login{
    width: 100%;
    height: calc(100% - 70px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .komercia_chat_login .action{
    color: #FFF;
    text-decoration: none;
    padding: 10px 30px;
    margin: 5px 0;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.1);
    border-radius: 10px;
    background-color: var(--color_principal);
    cursor: pointer;
    border-style: none;
    outline: none;
    transition: all .3s;
  }
  .komercia_chat_login .action:hover{
    transform: scale(0.9);
  }
  .komercia_chat_login .text{
    font-size: 0.95em;
    color: #5b5c64;
    margin: 0 20px;
  }
  .login_form{
    display: flex;
    flex-direction: column;
  }
  .login_form .el-input{
    margin-bottom: 10px;
  }
  .komercia_chat_login .text:nth-child(1){
    margin-bottom: 20px;
  }
  .komercia_chat_login .text.or{
    margin: 5px 0;
  }
</style>
