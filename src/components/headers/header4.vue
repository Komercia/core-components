<template>
  <div class="main-header">
    <ko-order1/>
    <div class="main-top-menu">
      <div class="icons-left">

        <el-popover placement="bottom-end" width="280" trigger="hover" v-if="userData.id">
          <div class="container-data-user">
            <div class="img-user" slot="reference">
              <img :src="`https://api.komercia.co/users/${userData.foto}`" alt="">
            </div>
            <div class="data-user">
              <p class="name-user">{{userData.nombre}}</p>
              <p class="email-user">{{userData.email}}</p>
              <el-button class="btn-logout" type="info" @click="logout" plain>Salir</el-button>
            </div>
          </div>
          <div class="prueba" slot="reference">
            <img class="img-usuario" :src="`https://api.komercia.co/users/${userData.foto}`" alt="">
          </div>
        </el-popover>

        <el-popover placement="bottom-end" width="280" trigger="hover" v-else>
          <ul>
            <li class="pop-item">
              <a class="pop-item-link" :href="`https://login.komercia.co/?from=store&path=${$route.path}&params={'tienda':${storeData.id_tienda},logo:${storeData.logo}}`">Iniciar Sesión</a>
            </li>
            <li class="pop-item">
              <a class="pop-item-link" :href="`https://login.komercia.co/registrar-cliente/?from=store&path=${$route.path}`">Registrar</a>
            </li>
          </ul>
          <i class="icon-user-circle" slot="reference"></i>
        </el-popover>

        <i @click="openOrder" class="icon-shopping-basket">
          <em class="num-products">{{ productsCart }}</em>
        </i>
      </div>
      <!-- *********************** Buscador **************************** -->
      <!-- <div class="icons-right">
        <i @click="getShowIcon" v-if="showIcon" class="icon-close"></i>
        <i @click="getShowIcon" v-if="!showIcon" class="icon-search"></i>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
          <el-input v-if="showIcon" class="search-top" placeholder="Buscar" suffix-icon="el-icon-search" v-model="input2">
          </el-input>
        </transition>
      </div> -->
    </div>
    <div class="line"></div>
    <div class="container">
      <router-link to="/" class="container-logo">
        <img :src="`${$urlHttp}/logos/${info.logo}`" alt="logo">
      </router-link>
      <nav class="header-navigation">
        <ul class="navigation-list">
          <li v-for='(item, index) in routes' :key='index' class="navigation-item">
            <router-link :to="item.route" class="navigation-link">{{item.name}}</router-link>
          </li>
        </ul>
      </nav>
      <div class="icons">

        <!-- *********************************Iconos del buscador ******************************** -->
        <!-- <i @click="getShowIcon" v-if="showIcon" class="icon-close"></i>
        <i @click="getShowIcon" v-if="!showIcon" class="icon-search"></i> -->

        <el-popover placement="bottom-end" width="300" trigger="hover" v-if="userData.id">
          <div class="container-data-user">
            <div class="img-user" slot="reference">
              <img :src="`https://api.komercia.co/users/${userData.foto}`" alt="">
            </div>
            <div class="data-user">
              <p class="name-user">{{userData.nombre}}</p>
              <p class="email-user">{{userData.email}}</p>
              <el-button class="btn-logout" type="info" @click="logout" plain>Salir</el-button>
            </div>
          </div>
          <div class="prueba" slot="reference">
            <img class="img-usuario" :src="`https://api.komercia.co/users/${userData.foto}`" alt="">
          </div>
        </el-popover>

        <el-popover placement="bottom-end" width="250" trigger="hover" v-else>
          <ul>
            <li class="pop-item">
              <a class="pop-item-link" :href="urlLogin">Iniciar Sesión</a>
            </li>
            <li class="pop-item">
              <a class="pop-item-link" :href="urlSignup">Registrar</a>
            </li>
          </ul>
          <i class="icon-user-circle" slot="reference"></i>
        </el-popover>
        <i @click="openOrder" class="icon-shopping-basket">
          <em class="num-products">{{ productsCart }}</em>
        </i>
        <!-- *****************************Input Buscador ********************************** -->
        <!-- <transition name="custom-classes-transition" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
          <el-input v-if="showIcon" class="search" placeholder="Buscar" suffix-icon="el-icon-search" v-model="input2">
          </el-input>
        </transition> -->
      </div>
      <i @click="toggleMenu" class="icon-menu"></i>
    </div>
    <transition name="slide-fade">
      <nav v-show="show" class="main-menu">
        <ul class="main-menu-list">
          <li @click="toggleMenu" class="main-menu-item item-close">
            <i class="icon-close"></i>
          </li>
          <li v-for='(item, index) in routes' :key='index' class="main-menu-item">
            <a @click="redirectTo(item.route)" class="main-menu-link">{{item.name}}</a>
          </li>
        </ul>
      </nav>
    </transition>
  </div>
</template>

<script>
import koOrder1 from '../_order/order1.vue'
export default {
  name: 'koHeader4',
  components: { koOrder1 },
  data() {
    return {
      showIcon: false,
      visible2: false,
      show: false,
      windowsWidth: 0,
      routes: [
        {
          name: 'Inicio',
          route: '/'
        },
        {
          name: 'Productos',
          route: '/productos'
        },
        {
          name: 'Carrito',
          route: '/pedido'
        },
        {
          name: 'Contacto',
          route: '/contacto'
        }
      ]
    }
  },
  computed: {
    storeData() {
      return this.$store.state.tienda
    },
    userData() {
      return this.$store.state.userData
    },
    info() {
      return this.$store.state.tienda
    },
    style() {
      return this.$store.state.styleData
    },
    productsCart() {
      return this.$store.state.productsCart.length
    },
    urlLogin () {
      const params = JSON.stringify({tienda: this.storeData.id_tienda, logo: this.storeData.logo})
      return `http://login.komercia.co?from=${this.storeData.subdominio}&path=${this.$route.path}&params=${params}`
    },
    urlSignup () {
      const params = JSON.stringify({tienda: this.storeData.id_tienda, logo: this.storeData.logo})
      return `https://login.komercia.co/registrar-cliente/?from=${this.storeData.subdominio}&path=${this.$route.path}&params=${params}`
    }
  },
  methods: {
    redirectTo(route) {
      this.$router.push(route)
      this.hideMenu()
    },
    hideMenu() {
      this.show = false
    },
    getShowIcon() {
      this.showIcon = !this.showIcon
    },
    logout() {
      this.$store.commit('LOGOUT')
    },
    openOrder() {
      this.$store.state.openOrder = true
    },
    toggleMenu() {
      this.show = !this.show
    }
  }
}
</script>

<style scoped>
@import 'https://unpkg.com/komercia-fuentes@1.0.0/styles.css';

.container {
  max-width: 1600px;
  width: 100%;
  height: 70px;
  margin: 30px auto 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background_color);
}
.navigation-list {
  display: flex;
  max-width: auto;
}
.icons {
  display: flex;
  align-items: center;
  font-size: 18px;
  position: relative;
  margin-right: 20px;
}
.icon-close {
  font-size: 14px;
  box-sizing: border-box;
  padding: 4px;
  vertical-align: middle;
}
.icons i {
  padding-right: 20px;
  cursor: pointer;
}
.icons i:hover {
  color: #f49a86;
}
.navigation-item {
  padding-right: 20px;
}
.navigation-link {
  font-size: 16px;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-decoration: none;
  font-weight: 400;
}
.container-logo {
  height: 100%;
  max-width: 150px;
  box-sizing: border-box;
  margin-right: 10px;
  margin-left: 10px;
}
.container-logo > img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.line {
  width: 100%;
  height: 1px;
  background: rgb(209, 209, 209);
}
.search {
  width: 180px;
  padding: 0;
  position: absolute;
  left: -132%;
  margin-top: 5px;
}
.main-top-menu {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  display: none;
}
.icons-left > i {
  padding-right: 25px;
  font-size: 18px;
  cursor: pointer;
}
.icons-right > i {
  font-size: 18px;
  cursor: pointer;
}
.icon-menu {
  display: none;
}
.search-top {
  display: none;
}
.icon-shopping-basket {
  position: relative;
}
.num-products {
  font-size: 12px;
  position: absolute;
  bottom: 0;
  right: 10px;
  color: #f49a86;
}
.pop-item-link {
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}
.pop-item {
  margin: 20px;
}
.prueba {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  padding-right: 20px;
}
.img-usuario {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 0;
}
.container-data-user {
  display: grid;
  grid-auto-flow: column;
  box-sizing: border-box;
  padding: 10px 10px 10px 5px;
}
.img-user {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  align-self: center;
}
.img-user img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.name-user {
  font-weight: 600;
}
.btn-logout {
  margin-top: 10px;
}
.data-user {
  display: grid;
}
.main-menu > .top-menu {
  display: none;
}
button.el-button.btn-logout.el-button--info.is-plain {
  border-radius: 0 !important;
}
.el-button--info.is-plain:hover {
  background: #333;
  border-color: #333;
  color: #fff;
}
@media (max-width: 990px) {
  .main-top-menu {
    display: flex;
  }
  .main-top-menu i {
    padding-right: 20px;
  }
  .main-top-menu i:hover {
    color: #f49a86;
  }
  .header-navigation {
    display: none;
  }
  .icons {
    display: none;
  }
  .container {
    height: 50px;
    margin: 15px auto;
  }
  .line-main-menu {
    display: none;
  }
  .icon-menu {
    display: initial;
    font-size: 18px;
    padding-right: 20px;
    cursor: pointer;
  }
  .icons-right .icon-close {
    font-size: 12px;
  }
  .search-top {
    width: 180px;
    display: block;
    position: absolute;
    right: 19px;
    top: 50px;
  }
  .main-top-menu .num-products {
    right: 15px;
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
  .item-close {
    justify-self: flex-end;
  }
  .img-user {
    width: 70px;
    height: 70px;
  }
}
</style>
