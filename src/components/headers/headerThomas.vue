<template>
  <div
    class="main-header"
    :style="`background:${setting.styleObject.colorHeader}; margin-top:${setting.styleObject.top}px`"
  >
    <ko-order1 />
    <div
      ref="colorResponsive"
      class="container"
    >
      <div
        class="content-header"
        :style="`background-color:${setting.styleObject.colorNav}`"
      >
        <div class="container-nav">
          <div
            class="wrapper"
            v-if="userData.id"
          >
            <div
              @mouseover="popoverUser = true"
              @mouseleave="popoverUser = false"
              class="name"
              :style="`color:${setting.styleObject.colorText}`"
            >
              <p>{{userData.nombre}}</p>
              <i class="el-icon-arrow-down"></i>
            </div>
            <transition name="down">
              <div
                class="popover-user"
                v-if="popoverUser"
                @mouseover="popoverUser = true"
                @mouseleave="popoverUser = false"
              >
                <div class="wrapper-img">
                  <img
                    :src="`https://api2.komercia.co/users/${userData.foto}`"
                    alt=""
                  >
                </div>
                <p>{{userData.email}}</p>
                <p>{{userData.nombre}}</p>
                <el-button
                  class="btn-logout"
                  type="info"
                  @click="logout"
                  plain
                >Salir</el-button>
              </div>
            </transition>
          </div>
          <div
            class="wrapper"
            v-else
          >
            <!-- <div
              @click="mouseOver"
              class="name"
              :style="`color:${setting.styleObject.colorText}`"
            >
              <p>Ingresar</p>
              <i class="el-icon-arrow-down"></i>
            </div> -->
            <i
              class="icon-menu"
              @click="toggleMenu"
            ></i>
            <!-- <transition name="down">
              <div
                class="popover"
                v-if="popover"
              >
                <login
                  v-show="popover"
                  @authenticated="fadeOf"
                />
              </div>
            </transition> -->
          </div>
          <nav class="nav">
            <ul class="main-menu-list">
              <router-link
                tag="li"
                v-for='(item, index) in routes'
                :key='index'
                class="main-menu-item"
                :style="`color:${setting.styleObject.colorText}`"
                :to="item.route"
              >{{item.name}}</router-link>
            </ul>
          </nav>
          <div
            class="content-icon-cart"
            :style="`color:${setting.styleObject.colorText}`"
          >
            <i
              class="icon-user"
              @click="mouseOver"
            ></i>
            <el-badge
              :value="productsCart"
              class="item"
            >
              <i
                class="icon-shopping-cart"
                @click="openOrder"
              ></i>
            </el-badge>

          </div>
        </div>
      </div>
      <div
        class="logo-container"
        :style="`order:${setting.styleObject.order}; width:${setting.styleObject.width}px`"
      >
        <img
          class="logo"
          :src="`https://api2.komercia.co/logos/${info.logo}`"
          :alt="info.nomre"
        >
      </div>
    </div>
    <transition name="fade">
      <div
        class="back"
        v-if="popover"
        @click="mouseOver"
      ></div>
    </transition>
    <transition name="slide-fade">
      <nav
        v-show="show"
        class="main-menu"
      >
        <ul class="main-menu-list">
          <li
            @click="toggleMenu"
            class="main-menu-item item-close"
          >
            <i class="icon-close"></i>
          </li>
          <li
            v-for='(item, index) in routes'
            :key='index'
            class="main-menu-item"
          >
            <a
              @click="redirectTo(item.route)"
              class="main-menu-link"
            >{{item.name}}</a>
          </li>
        </ul>
      </nav>
    </transition>
  </div>
</template>

<script>
import koOrder1 from "../_order/order1.vue";
import login from "../_components/login-header";
export default {
  name: "koHeader5",
  components: { koOrder1, login },
  props: {
    setting: {
      type: Object,
      default: function() {
        return {
          show: false,
          styleObject: {
            order: "3",
            width: "200",
            colorHeader: "#53a8f8",
            colorNav: "#53a8f8",
            colorText: "#6f7072",
            top: "40"
          }
        };
      }
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  data() {
    return {
      show: false,
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
      ],
      popover: false,
      popoverUser: false,
      window: {
        width: 0,
        height: 0
      }
    };
  },
  computed: {
    info() {
      return this.$store.state.tienda;
    },
    userData() {
      return this.$store.state.userData;
    },
    urlLogin() {
      const params = JSON.stringify({
        tienda: this.storeData.id_tienda,
        logo: this.storeData.logo
      });
      return `http://login.komercia.co?from=${this.storeData.subdominio}&path=${this.$route.path}&params=${params}`;
    },
    urlSignup() {
      const params = JSON.stringify({
        tienda: this.storeData.id_tienda,
        logo: this.storeData.logo
      });
      return `https://login.komercia.co/registrar-cliente/?from=${this.storeData.subdominio}&path=${this.$route.path}&params=${params}`;
    },
    productsCart() {
      return this.$store.state.productsCart.length;
    }
  },
  methods: {
    redirectTo(route, index) {
      this.$router.push(route);
      this.windowsWidth = document.documentElement.clientWidth;
      if (this.windowsWidth < 800) {
        this.hideMenu();
      }
    },
    openOrder() {
      this.$store.state.openOrder = true;
    },
    mouseOver() {
      this.popover = !this.popover;
    },
    logout() {
      this.$store.commit("LOGOUT");
    },
    fadeOf() {
      this.popover = false;
    },
    toggleMenu() {
      this.show = !this.show;
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  },
  watch: {
    "window.width"(newValue) {
      if (newValue < 700) {
        this.$refs.colorResponsive.style.backgroundColor = this.setting.styleObject.colorNav;
      } else {
        this.$refs.colorResponsive.style.backgroundColor = "transparent";
      }
    }
  }
};
</script>

<style scoped>
.main-header {
  width: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 40px;
  /* margin-bottom: 40px; */
}
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.content-header {
  width: 100%;
  display: flex;
  order: 2;
}
.container-nav {
  max-width: 1600px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 20px;
}
.logo-container {
  cursor: pointer;
  margin: 10px 0;
}
.logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.name {
  display: flex;
  align-items: center;
  align-items: center;
  text-transform: uppercase;
  color: #6f7072;
  font-size: 15px;
  cursor: pointer;
}
.name > p {
  margin-right: 3px;
  pointer-events: none;
}
.name > p:hover {
  text-decoration: underline;
}
.name > i {
  font-size: 10px;
  font-weight: bold;
  pointer-events: none;
}
.nav {
  flex: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-icon-cart {
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6f7072;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
}
.icon-shopping-cart {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-menu-list {
  display: flex;
  align-items: center;
  align-items: center;
}
.main-menu-item {
  padding: 15px 20px;
  cursor: pointer;
  color: #6f7072;
  text-transform: uppercase;
  font-size: 15px;
  transition: all ease 0.1s;
}
.main-menu-item:hover {
  font-weight: 600;
}
.router-link-exact-active {
  font-weight: 600;
}
.popover {
  background-color: #fff;
  position: absolute;
  top: 50px;
  left: 0;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid #eee;
  box-shadow: 0 0 16px 4px rgba(78, 78, 78, 0.11);
  z-index: 999;
  height: 360px;
  overflow: hidden;
}
.popover-user {
  background-color: #fff;
  position: absolute;
  top: 50px;
  left: 0;
  /* border-radius: 5px; */
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid #eee;
  box-shadow: 0 0 16px 4px rgba(78, 78, 78, 0.11);
  z-index: 999;
  height: 250px;
  overflow: hidden;
}
.wrapper {
  position: relative;
  display: flex;
}
.back {
  background-color: rgba(19, 23, 37, 0.253);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}
.down-enter,
.down-leave-to {
  height: 0;
  padding: 0 15px;
}
.wrapper-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.wrapper-img > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.btn-logout {
  margin-top: 10px;
}
.icon-user {
  display: none;
}
.icon-menu {
  display: none;
}
i {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -khtml-user-select: none !important;
  -ms-user-select: none !important;
}

@media (max-width: 700px) {
  .nav {
    display: none;
  }
  .main-header {
    margin: 0 !important;
  }
  .content-header {
    position: absolute;
    /* z-index: 1; */
  }
  .logo-container {
    z-index: 0;
    max-width: 90px !important;
    max-height: 60px !important;
    width: 100% !important;
    height: 100% !important;
  }
  .icon-user {
    display: initial;
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .name {
    display: none;
  }
  .icon-menu {
    display: initial;
    font-size: 25px;
  }
  .content-icon-cart {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main-menu {
    background: rgb(255, 255, 255);
    width: 320px;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    top: 0;
    z-index: 9999;
    border-right: 1px solid rgb(207, 207, 207);
    left: 0;
  }
  .main-menu-list {
    width: 320px;
    height: auto;
    display: grid;
    padding: 23px 20px;
    box-sizing: border-box;
  }
  .main-menu-item {
    padding: 10px 0;
    height: auto;
    font-size: 16px;
    cursor: pointer;
  }
  .main-menu-link {
    height: 100%;
    color: #000;
    width: 100%;
    font-size: 16px;
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(-100%);
  }
  .item-close {
    justify-self: flex-end;
  }
}
@media (max-width: 480px) {
  .logo-container {
    max-width: 70px !important;
    max-height: 50px !important;
  }
  .name {
    font-size: 12px;
  }
  .content-icon-cart {
    font-size: 22px;
  }
}
</style>
