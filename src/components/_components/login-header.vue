<template>
  <div class="komercia_chat_login">

    <!-- <div class="divide">
      <div class="line-horizontal"></div>
      <p>ó</p>
      <div class="line-horizontal"></div>
    </div> -->
    <form
      v-on:submit.prevent
      class="form"
    >

      <!-- <p class="action-signup">Ingresa con email y contraseña</p> -->

      <div class="input-area first">
        <!-- <p class="nameItem">Correo electrónico</p> -->
        <div
          id="emailFocus"
          class="container-inputs"
        >
          <input
            class="input-email"
            type="email"
            name="email"
            v-model="email"
            data-vv-as="correo"
            required
          >
          <label>Correo electronico</label>
        </div>
        <div
          id="passwordFocus"
          class="container-inputs"
        >
          <input
            class="input-password"
            :type="typePassword"
            v-model="password"
            required
          >
          <label>Contraseña</label>
        </div>

      </div>
      <el-alert
        :title="messageInvalid"
        v-show="showInvalid"
        type="error"
        :closable="false"
      >
      </el-alert>
      <div class="container-button">
        <button
          class="btn btn-login btn-fill"
          v-on:click="login"
        >
          <p>Inicia Sesión</p>
        </button>
      </div>
      <!-- <div class="divide">
        <div class="line-horizontal"></div>
        <p>ó</p>
        <div class="line-horizontal"></div>
      </div> -->
      <button
        class="btn btn-facebook"
        v-on:click="getUIDWithFacebook"
      ><i class="fa fa-facebook-square"></i>Ingresar con Facebook</button>
      <div class="forgot">
        <a href="https://login.komercia.co/registrar-cliente">
          <a class="forgot-password">¿Crea una cuenta?</a>
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { Button, Input } from "element-ui";

export default {
  components: { ElButton: Button, ElInput: Input },
  data() {
    return {
      messageInvalid:
        "La dirección de correo electrónico o contraseña no es válida",
      email: "",
      password: "",
      greet: "",
      showInvalid: false,
      typePassword: "password"
    };
  },
  methods: {
    getUIDWithFacebook() {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.$firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.loginFacebook(result.user.providerData[0]);
        })
        .catch(function(error) {});
    },
    loginFacebook(providerData) {
      let params = {};
      params.id = providerData.uid;
      params.name = providerData.displayName;
      params.email = providerData.email;
      params.token = "";
      axios.post(`${this.$urlHttp}/login/facebook`, params).then(response => {
        document.cookie = `authData = ${
          response.data.accessToken
        }; domain = komercia.co; expires=Thu, 01 Dec 2050 00:00:00 UTC;`;
        this.authentication(response.data.accessToken);
      });
    },
    login() {
      const params = {
        grant_type: "password",
        client_id: 2,
        client_secret: "S3kE1jYcd6hFWcu0jIOm3cRFMOnjjmtmtfoYdra1",
        password: this.password,
        username: this.email
      };
      axios
        .post(`https://api2.komercia.co/oauth/token`, params)
        .then(response => {
          document.cookie = `authData = ${
            response.data.access_token
          }; domain = komercia.co; expires=Thu, 01 Dec 2050 00:00:00 UTC;`;
          axios.defaults.headers.common = {
            "content-type": "application/json",
            Authorization: `Bearer ${response.data.access_token}`,
            "Access-Control-Allow-Origin": "*"
          };
          this.authentication(response.data.access_token);
        })
        .catch(err => {
          if (err) {
            this.show();
          }
        });
    },
    authentication(accessToken) {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Access-Control-Allow-Origin": "*"
        }
      };
      axios.get(`${this.$urlHttp}/api/user`, config).then(response => {
        this.$store.state.userData = response.data.data;
        this.$emit("authenticated");
      });
    },
    showPassword() {
      this.typePassword = "text";
      document.querySelector(".input-password").focus();
    },
    hiddenPassword() {
      this.typePassword = "password";
      document.querySelector(".input-password").focus();
    },
    show() {
      this.showInvalid = true;
    }
  }
};
</script>

<style scoped>
.komercia_chat_login {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5px;
  box-sizing: border-box;
}
.input-area {
  position: relative;
  max-width: 320px;
  width: 100%;
}
.nameItem {
  color: #353a4c;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  text-align: left;
  margin-bottom: 5px;
}
.container-inputs {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  width: 100%;
  height: 50px;
  margin: 20px auto;
  border-radius: 3px;
  background: #fff;
}
input,
select {
  border-style: none;
  background-color: transparent;
  outline: none;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  color: #76767b;
  font-size: 14px;
  line-height: 1;
  border-radius: 3px;
  vertical-align: middle;
  padding: 0.6rem 2rem 0.6rem;
  border: 1px solid #dfdfdf;
}
input::-webkit-input-placeholder {
  color: #bfbfbf;
}
select::-webkit-input-placeholder {
  color: #bfbfbf;
}
label {
  color: #999;
  font-size: 14px;
  position: absolute;
  pointer-events: none;
  left: 15px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
input:focus ~ label,
input:valid ~ label {
  top: -20px;
  font-size: 13px;
  color: #5264ae;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}
.is-error {
  border: 2px solid #f56c6c;
}
.btn {
  color: #fff;
  max-width: 320px;
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  /* margin-top: 30px; */
  font-size: 16px;
}
button {
  outline: none;
}
.divide {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 15px;
  max-width: 320px;
  align-items: center;
  justify-content: space-between;
}

.el-alert--error {
  background-color: #fef0f0;
  color: #f56c6c;
  max-width: 320px;
  width: 100%;
}
.text-error {
  color: #f56c6c;
  font-size: 12px;
  text-align: left;
}
.divide p {
  color: #59617b;
  font-size: 15px;
  font-weight: 600;
}
.line-horizontal {
  width: 45%;
  height: 1px;
  border-bottom: 0.3px solid #c0c8e0;
}
.line-horizontal-bottom {
  max-width: 320px;
  width: 100%;
  height: 1px;
  border-bottom: 0.3px solid #c0c8e0;
}
.action-signup {
  margin: 0 0 15px 0;
  color: #59617b;
  font-size: 15px;
  font-weight: 500;
}
.register {
  font-size: 17px;
  font-weight: 500;
}
.register:hover {
  color: #59617b;
}
.action-signup a {
  cursor: pointer;
  color: #008c9d;
}
.FormLogin {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.divide {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 15px;
  max-width: 320px;
  align-items: center;
  justify-content: space-between;
}

.el-alert--error {
  background-color: #fef0f0;
  color: #f56c6c;
  max-width: 320px;
  width: 100%;
}
.text-error {
  color: #f56c6c;
  font-size: 12px;
  text-align: left;
}
.divide p {
  color: #59617b;
  font-size: 15px;
  font-weight: 600;
}
.line-horizontal {
  width: 45%;
  height: 1px;
  border-bottom: 0.3px solid #c0c8e0;
}
.line-horizontal-bottom {
  max-width: 320px;
  width: 100%;
  height: 1px;
  border-bottom: 0.3px solid #c0c8e0;
}
.action-signup {
  margin: 0 0 15px 0;
  color: #59617b;
  font-size: 15px;
  font-weight: 500;
}
.register {
  font-size: 17px;
  font-weight: 500;
}
.register:hover {
  color: #59617b;
}
.action-signup a {
  cursor: pointer;
  color: #008c9d;
}
.forgot {
  display: flex;
}
.forgot-password {
  font-size: 15px;
  margin-top: -50px;
  font-weight: 500;
  color: #008c9d;
  padding-top: 5px;
  align-self: flex-end;
  cursor: pointer;
  text-decoration: none !important;
}
.forgot-password:hover {
  color: #05666d;
  text-decoration: none;
}
.form > a {
  max-width: 320px;
  width: 100%;
  text-align: end;
  text-decoration: none;
}
.form .invalid-data {
  text-align: center;
  color: rgba(241, 75, 89, 0.707);
}
.input-area.first {
  margin-top: 5px;
}
.input-area span {
  position: absolute;
  right: 0;
  color: #59617b;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
}
.input-area i.fa {
  margin-right: 5px;
  font-size: 15px;
}
.focus:after {
  content: "";
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 999;
  height: 2px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  background-position: 0% 0%;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#b294ff),
    color-stop(#57e6e6),
    color-stop(#ff7782),
    color-stop(#57e6e6),
    color-stop(#b294ff),
    to(#57e6e6)
  );
  background: linear-gradient(
    to right,
    #b294ff,
    #57e6e6,
    #ff7782,
    #57e6e6,
    #b294ff,
    #57e6e6
  );
  background-size: 500% auto;
  -webkit-animation: gradient 3s linear infinite;
  animation: gradient 3s linear infinite;
}
.container-button {
  padding-top: 15px;
  max-width: 320px;
  width: 100%;
  /* height: 90px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.title-login {
  font-size: 28px;
  color: #59617b;
  text-align: center;
  font-weight: 600;
}
@-webkit-keyframes bounce {
  0% {
    top: 30px;
    height: 5px;
    border-radius: 60px 60px 20px 20px;
    -webkit-transform: scaleX(2);
    transform: scaleX(2);
  }
  35% {
    height: 15px;
    border-radius: 50%;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
  100% {
    top: 0;
  }
}
@keyframes bounce {
  0% {
    top: 30px;
    height: 5px;
    border-radius: 60px 60px 20px 20px;
    -webkit-transform: scaleX(2);
    transform: scaleX(2);
  }
  35% {
    height: 15px;
    border-radius: 50%;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
  100% {
    top: 0;
  }
}
@media screen and (max-width: 600px) {
  input {
    padding: 0.8rem 2.5rem 0.8rem;
  }
}
.btn-fill {
  position: relative;
  background-color: #fff;
  border: 2px solid #0f9380;
  color: #0f9380;
  font-weight: bold;
  overflow: hidden;
  transition: 0.3s;
}
.btn-fill p {
  position: absolute;
  z-index: 2;
}
.btn-fill:hover {
  color: #fff;
}
.btn-fill::before {
  content: "";
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  height: 50px;
  background-color: #0f9380;
  z-index: 1;
  transition: 0.3s;
}
.btn-fill:hover::before {
  top: 0%;
}
.btn-facebook {
  background-color: #4567ac;
  font-weight: 600;
  margin: 20px 0 5px;
}
.btn-facebook:hover {
  background-color: #254278;
}
.btn-facebook i.fa {
  margin-right: 10px;
  font-size: 18px;
}
</style>
