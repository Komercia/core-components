<template>
  <div class="header2">
    <koOrder1 />
    <div class="top-menu">
      <div
        v-if='info.logo'
        class="logo-top-menu"
      >
        <img
          :src="`${url}/logos/${info.logo}`"
          alt="logo"
        >
      </div>
      <ul class="main-menu-list">
        <li
          v-for='(item, index) in routes'
          :key='index'
          class="main-menu-item"
        >
          <router-link
            :to="item.route"
            class="main-menu-link"
          >{{item.name}}</router-link>
        </li>
      </ul>
      <div class="login-cart_top-menu container-icons">
        <div
          class="user"
          v-popover:popover2
          v-if="userData.id"
        >
          <i class="icon-top-menu icon-user"></i>
          <el-popover
            ref="popover2"
            placement="bottom"
            trigger="click"
          >
            <ul class="user_options_list">
              <li class="user_options_item">
                <figure class="user_photo">
                  <img
                    :src="`https://api2.komercia.co/users/${userData.foto}`"
                    :alt="userData.nombre"
                  >
                </figure>
                <div class="">
                  <strong>Hola {{ userData.nombre }}</strong>
                  <p>{{ userData.email }}</p>
                </div>
              </li>
              <li class="user_options_item"><i class="material-icons">assignment</i><a href="https://perfil.komercia.co/compras">Mis Compras</a></li>
              <li
                class="user_options_item"
                @click="logout"
              ><i class="material-icons">exit_to_app</i>Cerrar session</li>
            </ul>
          </el-popover>
        </div>
        <a
          :href="urlLogin"
          v-else
        ><i class="icon-top-menu material-icons">exit_to_app</i></a>
        <a
          class="cart_top-icon"
          @click="openOrder"
        ><i class="icon-top-menu icon-shopping-cart"></i><span>{{ productsCart }}</span></a>
        <a @click="toggleMenu"><i class="icon-top-menu icon-bars icon-menu-show"></i></a>
      </div>
    </div>
    <transition name="slide-fade">
      <nav
        v-show="show"
        class="main-menu"
      >
        <div class="top-menu">
          <a
            @click="toggleMenu"
            class="icon-top-menu icon-top-menu-close"
          ><i
              class="icon-cancel icon-menu"
              aria-hidden="true"
            ></i></a>
        </div>
        <ul class="main-menu-list">
          <li
            v-for='(item, index) in routes'
            :key='index'
            class="main-menu-item"
          ><a
              @click="redirectTo(item.route)"
              class="main-menu-link"
            >{{item.name}}</a></li>
        </ul>
      </nav>
    </transition>
  </div>
</template>

<script>
// import Hammer from 'hammerjs';
import koOrder1 from "../_order/order1.vue";

export default {
  name: "koHeader2",
  components: { koOrder1 },
  data() {
    return {
      show: false,
      windowsWidth: 0,
      routes: [
        {
          name: "Inicio",
          route: "/"
        },
        {
          name: "Productos",
          route: "/productos"
        },
        {
          name: "Carrito",
          route: "/pedido"
        },
        {
          name: "Contacto",
          route: "/contacto"
        }
      ]
    };
  },
  computed: {
    url() {
      return this.$store.state.urlHttp;
    },
    storeData() {
      return this.$store.state.tienda;
    },
    userData() {
      return this.$store.state.userData;
    },
    info() {
      return this.$store.state.tienda;
    },
    productsCart() {
      return this.$store.state.productsCart.length;
    },
    urlLogin() {
      const params = JSON.stringify({
        tienda: this.storeData.id_tienda,
        logo: this.storeData.logo
      });
      return `http://login.komercia.co?from=${this.storeData.subdominio}&path=${this.$route.path}&params=${params}`;
    }
  },
  methods: {
    redirectTo(route) {
      this.$router.push(route);
      this.hideMenu();
    },
    toggleMenu() {
      this.show = !this.show;
    },
    showMenu() {
      this.show = true;
    },
    hideMenu() {
      this.show = false;
    },
    getWindowsWidth() {
      this.windowsWidth = document.documentElement.clientWidth;
      if (this.windowsWidth > 800) {
        this.show = true;
      }
    },
    openOrder() {
      this.$store.state.openOrder = true;
    },
    logout() {
      this.$store.commit("LOGOUT");
    }
  },
};
</script>

<style scoped>
.header2 {
  position: sticky;
  top: 0;
  background-color: var(--background_color);
  z-index: 99;
}
.top-menu {
  height: 100px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main-menu {
  height: 50px;
  background: #04779b;
  display: flex;
  justify-content: center;
}
.main-menu > .top-menu {
  display: none;
}
.main-menu-list {
  height: 100%;
  display: flex;
  align-items: center;
}
.main-menu-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  padding: 0 30px;
}
.main-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.logo-top-menu {
  max-height: 90%;
  max-width: 250px;
  display: flex;
  align-items: center;
}
.icon-top-menu {
  padding: 0 5px;
  color: rgb(206, 206, 206);
  font-size: 20px;
}
.container-icons {
  height: 40px;
  display: flex;
  flex: 1;
}
.cart_top-icon {
  position: relative;
  cursor: pointer;
}
.cart_top-icon span {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: red;
  color: #fff;
}
.social-networks_top-menu {
  padding-left: 20px;
}
.icon-menu-show {
  display: none !important;
}
.login-cart_top-menu {
  justify-content: flex-end;
}
.icon-top-menu-close {
  display: none;
}
.main-menu-link {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fefefe;
}

.user {
  cursor: pointer;
  outline: none;
}
.user_photo {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
  overflow: hidden;
  cursor: pointer;
}
.user_photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.user_options_item {
  display: flex;
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid #dbdbdb;
}
.user_options_item:hover {
  background-color: #eee;
}
.user_options_item * {
  color: #39393b !important;
}
.user_options_item:first-child {
  /*flex-direction: column;*/
  /*justify-content: center;*/
  align-items: center;
  text-align: left;
  cursor: initial;
}
.user_options_item:first-child:hover {
  background-color: #fff;
}
.user_options_item:last-child {
  border-bottom: 0px;
}
.user_options_item i {
  margin-right: 5px;
  font-size: 20px;
}

@media screen and (max-width: 800px) {
  .main-menu-list {
    width: 100%;
    flex-direction: column;
  }
  .main-menu-link {
    color: rgb(206, 206, 206);
    width: 100%;
  }
  .main-menu {
    background: rgba(16, 19, 31, 0.959);
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    top: 0;
    z-index: 100;
  }
  .icon-menu-show {
    padding-left: 20px;
    font-size: 24px;
    z-index: 9999;
    display: block !important;
  }
  .icon-top-menu-close {
    display: flex;
    z-index: 9999;
    margin-right: 20px;
    font-size: 40px;
  }
  .main-menu > .top-menu {
    display: flex;
    justify-content: flex-end;
  }
  .login-cart_top-menu {
    padding-right: 20px;
  }
  .icon-top-menu-close {
    margin-right: 20px;
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(100%);
  }
  .logo-top-menu {
    height: 50px;
  }
}

@media screen and (max-width: 450px) {
  .social-networks_top-menu {
    display: none;
  }
  .logo-top-menu {
    width: 70px;
    height: auto;
    padding-left: 20px;
  }
  .top-menu {
    height: 70px;
  }
  .main-menu {
    z-index: 100;
  }
}

.top-menu {
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 50px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
}
.main-menu {
  display: none;
  background-color: #fff;
}
.main-menu-list li a {
  color: var(--main_color);
}
/*.main-menu-item {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
  }*/
.logo-top-menu {
  max-width: none;
  flex: 1;
}
.logo-top-menu img {
  max-width: 200px;
  width: 100%;
  height: 63px;
  object-fit: contain;
}
.login-cart_top-menu.container-icons {
  align-items: center;
}
@media (max-width: 800px) {
  .top-menu .main-menu-list {
    display: none;
  }
  .login-cart_top-menu {
    padding-right: 0;
  }
  .main-menu {
    display: flex;
  }
}
@media (max-width: 600px) {
  .top-menu {
    padding: 0 30px;
  }
}
@media (max-width: 450px) {
  .logo-top-menu {
    padding-left: 0px;
  }
  .logo-top-menu img {
    object-fit: contain;
  }
}
</style>
