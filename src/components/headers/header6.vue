<template>
  <div class="header">
    <koOrder1 />
    <div
      class="container-nav"
      v-if="setting"
    >
      <router-link
        to="/"
        class="wrapper-logo"
      >
        <img
          class="logo"
          :src="`https://api2.komercia.co/logos/${info.logo}`"
          :alt="info.nomre"
        >
      </router-link>
      <div class="wrapper-nav">
        <transition name="downMenu">
          <nav
            class="nav"
            :class="toggleMenu ? 'ocultar' : ''"
          >
            <transition name="downList">
              <ul
                class="main-menu-list menu-toggle-list"
                :class="toggleMenu ? 'ocultar' : ''"
              >
                <li
                  v-for="(item, index) in setting.data.tabs"
                  :key="index"
                >
                  <router-link
                    :to="`/productos/${item.redirect_to.value}`"
                    v-if="item.redirect_to.type == 1"
                    :style="`color:${color}`"
                    @mouseover.native="handleHover($event, true)"
                    @mouseleave.native="handleHover($event, false)"
                    @click.native="toggleMenuAction"
                  >{{item.name}}</router-link>
                  <router-link
                    :to="`/productos?category=${item.redirect_to.value}`"
                    v-if="item.redirect_to.type == 2"
                    :style="`color:${color}`"
                    @mouseover.native="handleHover($event, true)"
                    @mouseleave.native="handleHover($event, false)"
                    @click.native="toggleMenuAction"
                  >{{item.name}}</router-link>
                  <router-link
                    :to="`/productos?search=${item.redirect_to.value}`"
                    v-if="item.redirect_to.type == 3"
                    :style="`color:${color}`"
                    @mouseover.native="handleHover($event, true)"
                    @mouseleave.native="handleHover($event, false)"
                    @click.native="toggleMenuAction"
                  >{{item.name}}</router-link>
                  <router-link
                    :to="item.redirect_to.value"
                    v-if="item.redirect_to.type == 4"
                    :style="`color:${color}`"
                    @mouseover.native="handleHover($event, true)"
                    @mouseleave.native="handleHover($event, false)"
                    @click.native="toggleMenuAction"
                  >{{item.name}}</router-link>
                  <a
                    :href="item.redirect_to.value"
                    v-else-if="item.redirect_to.type == 5"
                    :style="`color:${color}`"
                    @mouseover="handleHover($event, true)"
                    @mouseleave="handleHover($event, false)"
                    @click="toggleMenuAction"
                  >{{item.name}}</a>
                </li>
              </ul>
            </transition>
          </nav>
        </transition>
        <!-- <div
          class="wrapper"
          v-if="userData.id"
        >
          <div
            class="content-user"
            @mouseover="popoverUser = true"
            @mouseleave="popoverUser = false"
          >
            <img
              v-if="userData.foto"
              :src="`https://api2.komercia.co/users/${userData.foto}`"
              alt
              class="imagen-user"
            >
            <user-icon
              v-else
              class="icon-login"
            />
          </div>
          <transition name="down">
            <div
              class="popover-user"
              v-if="popoverUser"
              @mouseover="popoverUser = true"
              @mouseleave="popoverUser = false"
            >
              <div class="header-popover">
                <div class="wrapper-img">
                  <img
                    v-if="userData.foto"
                    :src="`https://api2.komercia.co/users/${userData.foto}`"
                    class="imagen-user"
                  >
                  <user-icon
                    v-else
                    class="icon-login-big"
                  />
                </div>
                <div class="left">
                  <p>{{userData.nombre}}</p>
                  <p>{{userData.email}}</p>
                </div>
              </div>
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
          class="wrapper-user"
          v-else
        >
          <i
            class="icon-user-circle"
            @click="mouseOver"
          ></i>
          <transition name="down">
            <div
              class="popover"
              v-if="popover"
            >
              <login
                v-show="popover"
                @authenticated="fadeOf"
              />
            </div>
          </transition>
        </div> -->
        <el-badge
          :value="productsCart"
          class="item"
        >
          <i
            class="icon-shopping-basket"
            @click="openOrder"
          ></i>
        </el-badge>
        <div
          class="content-icon-menu"
          @click="toggleMenuAction"
        >
          <i class="icon-menu"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import koOrder1 from "../_order/order1.vue";
import login from "../_components/login-header";
import userIcon from "../../Icons/User";
export default {
  name: "koHeader6",
  components: { koOrder1, login, userIcon },
  props: {
    setting: {
      type: Object,
      default: function() {
        return null;
      }
    }
  },
  data() {
    return {
      popover: false,
      popoverUser: false,
      toggleMenu: false
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
      return `http://login.komercia.co?from=${this.storeData.subdominio}&path=${
        this.$route.path
      }&params=${params}`;
    },
    urlSignup() {
      const params = JSON.stringify({
        tienda: this.storeData.id_tienda,
        logo: this.storeData.logo
      });
      return `https://login.komercia.co/registrar-cliente/?from=${
        this.storeData.subdominio
      }&path=${this.$route.path}&params=${params}`;
    },
    productsCart() {
      return this.$store.state.productsCart.length;
    },
    color() {
      return this.setting.styleObject.colorText;
    },
    productsCart() {
      return this.$store.state.productsCart.length;
    }
  },
  methods: {
    openOrder() {
      this.$store.state.openOrder = true;
    },
    logout() {
      this.$store.commit("LOGOUT");
    },
    fadeOf() {
      this.popover = false;
    },
    mouseOver() {
      this.popover = !this.popover;
    },
    handleHover(event, bool) {
      bool
        ? (event.target.style.color = this.setting.styleObject.colorHover)
        : (event.target.style.color = this.setting.styleObject.colorText);
    },
    toggleMenuAction() {
      if (window && window.innerWidth <= 770) {
        this.toggleMenu = !this.toggleMenu;
      }
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 76px;
}
.container-nav {
  max-width: 1600px;
  box-sizing: border-box;
  padding: 0 15px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.wrapper-nav {
  display: flex;
  align-items: center;
  /* position: relative; */
}
.wrapper-nav i {
  font-size: 24px;
  margin-left: 20px;
  cursor: pointer;
}
.main-menu-list {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.wrapper-user {
  position: relative;
}
.main-menu-list li {
  padding: 10px 15px;
  cursor: pointer;
  color: rgb(48, 48, 48);
  font-weight: 400;
  transition: all ease 0.4s;
  text-decoration: none;
}
.main-menu-list li:hover {
  color: rgb(218, 103, 57);
}
.main-menu-list a {
  color: rgb(48, 48, 48);
}
.wrapper-logo {
  padding: 6px 0;
  box-sizing: border-box;
}

.logo {
  height: 100%;
  width: 100%;
  object-fit: contain;
  display: flex;
  justify-content: flex-start;
  object-position: 0;
}
.popover {
  background-color: #fff;
  position: absolute;
  top: 50px;
  right: 0;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid #eee;
  box-shadow: 0 0 16px 4px rgba(78, 78, 78, 0.11);
  z-index: 999;
  height: 360px;
  overflow: hidden;
  transform: scale(1);
}
.popover-user {
  background-color: #fff;
  position: absolute;
  top: 50px;
  right: 0;
  /* border-radius: 5px; */
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid #eee;
  box-shadow: 0 0 16px 4px rgba(78, 78, 78, 0.11);
  z-index: 999;
  height: 160px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  opacity: 0;
  /* transform: scale(0.5); */
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
  border-radius: 50%;
}
.btn-logout {
  margin-top: 10px;
  width: 100%;
}
.content-user {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  margin-left: 15px;
}
.imagen-user {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.icon-login {
  width: 26px;
  height: 26px;
}
.icon-login-big {
  width: 50px;
  height: 50px;
}
.header-popover {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.left {
  margin-left: 15px;
}
.left > p:nth-child(1) {
  font-size: 16px;
  color: #666;
  font-weight: 400;
  line-height: 1;
}
.left > p:nth-child(2) {
  font-size: 13px;
  color: #888;
  line-height: 1.4;
}
.content-icon-menu {
  display: none;
}
@media (max-width: 770px) {
  .container-nav {
    position: relative;
  }

  .main-menu-list {
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 0;
  }
  .menu-toggle-list {
    opacity: 1;
  }
  .main-menu-list li {
    width: calc(100% - 40px);
    border-bottom: 1px solid rgb(228, 228, 228);
    padding-left: 0;
    padding-bottom: 15px;
  }
  .content-icon-menu {
    display: initial;
  }
  .icon-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #aaa;
    padding: 5px;
    border-radius: 5px;
    color: #fff;
  }
  .nav {
    display: none;
    position: absolute;
    top: 76px;
    left: 0;
    max-height: 900px;
    width: 100%;
    z-index: 99999999999;
    background-color: #fff;
    opacity: 1;
    box-sizing: border-box;
    padding: 40px 20px 40px 40px;
  }
  /* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
} */
  .downMenu-enter-active {
    transition: all 0.6s;
    max-height: 900px;
    z-index: 99999999999;
  }
  .downMenu-leave-active {
    transition: all 0.6s;
    z-index: 1;
    height: 0;
  }
  .downMenu-enter {
    z-index: 1;
    height: 0;
  }
  .ocultar {
    display: initial;
  }
  ul > li:first-child {
    border-top: 1px solid rgb(228, 228, 228);
  }
  /* .downList-enter-active {
    transition: all 0.1s;
    opacity: 1;
  }
  .downList-leave-active {
    transition: all 0.1s;
    opacity: 1;
  }
  .downList-enter {
    opacity: 0;
  } */
}
</style>
