<template>
  <div class="header">
    <ko-order1 />
    <div class="container-nav">
      <img
        class="logo"
        :src="`https://api2.komercia.co/logos/${info.logo}`"
        :alt="info.nomre"
      >
      <div class="wrapper-nav">
        <nav>
          <ul class="main-menu-list">
            <router-link
              tag="li"
              v-for="(item, index) in routes"
              :key="index"
              :to="item.route"
            >
              {{item.name}}
            </router-link>
          </ul>
        </nav>
        <div
          class="wrapper"
          v-if="userData.id"
        >
          <div
            class="content-user"
            @mouseover="popoverUser = true"
            @mouseleave="popoverUser = false"
          >

          </div>
          <!-- <i
            class="icon-menu"
            @click="toggleMenu"
          ></i> -->

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

        </div>
        <i
          class="icon-shopping-basket"
          @click="openOrder"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import koOrder1 from "../_order/order1.vue";
import login from "../_components/login-header";
export default {
  name: "koHeader6",
  components: { koOrder1, login },
  data() {
    return {
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
      popoverUser: false
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
  background-color: rgb(255, 209, 209);
  display: flex;
  justify-content: space-between;
}
.wrapper-nav {
  display: flex;
  align-items: center;
  position: relative;
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
  font-weight: 600;
  transition: all ease 0.4s;
}
.main-menu-list li:hover {
  color: rgb(218, 103, 57);
}
.logo {
  height: 100%;
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
  height: 250px;
  overflow: hidden;
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
.content-user {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: black;
  margin-left: 15px;
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
}
</style>
