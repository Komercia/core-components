<template>
  <div>
    <div v-if='info.logo' class="top-menu">
      <div class="social-networks_top-menu container-icons">
      <a v-show="info.red_instagram" :href="info.red_instagram"><i class="icon-top-menu icon-instagrem"></i></a>
      <a v-show="info.red_twitter" :href="info.red_twitter" ><i class="icon-top-menu icon-twitter" ></i></a>
      <a v-show="info.red_facebook" :href="info.red_facebook" ><i class="icon-top-menu icon-facebook-square" ></i></a>
      <a v-show="info.red_youtube" :href="info.red_youtube" ><i class="icon-top-menu icon-youtube"></i></a>
        <!-- <a v-show="info.red_youtube" :href="info.red_youtube" class="icon-top-menu icon-social-networks"><i class="fa fa-youtube-play" aria-hidden="true"></i></a> -->
      </div>
      <img :src="`${$urlHttp}/logos/${info.logo}`" alt="logo" class="logo-top-menu">
      <div class="login-cart_top-menu container-icons">
        <a href="#" ><i class="icon-top-menu icon-user"></i></a>
        <a @click="openOrder"><i class="icon-top-menu icon-shopping-cart"></i></a>
        <a @click="toggleMenu" ><i class="icon-top-menu icon-bars icon-menu-show"></i></a>
      </div>
    </div>
    <transition name="slide-fade">
      <nav v-show="show" class="main-menu">
        <div class="top-menu">
          <a @click="toggleMenu" class="icon-top-menu icon-top-menu-close"><i class="icon-cancel icon-menu" aria-hidden="true"></i></a>
        </div>
        <ul class="main-menu-list">
          <li v-for='(item, index) in routes' :key='index' class="main-menu-item"><router-link class="main-menu-link" :to="item.route">{{item.name}}</router-link></li>
        </ul>
      </nav>
    </transition>
  </div>
</template>

<script>
import Hammer from 'hammerjs';

export default {
  name: 'koHeader1',
  props: {
    logo: {
      type: Object,
      default() {
        return {
          id: 1,
          logo: '163nir1958.png',
        };
      },
    },
  },

  data() {
    return {
      show: false,
      windowsWidth: 0,
      routes: [
        {
          name: 'Inicio',
          route: '/',
        },
        {
          name: 'Productos',
          route: '/productos',
        },
        {
          name: 'Carrito',
          route: '/pedido',
        },
        {
          name: 'Contacto',
          route: '/contacto',
        },
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.show = !this.show;
    },
    openOrder() {
      this.$store.state.openOrder = true;
    },
    showMenu() {
      this.show = false;
    },
    hideMenu() {
      this.show = true;
    },
    getWindowsWidth() {
      this.windowsWidth = document.documentElement.clientWidth;
      if (this.windowsWidth > 800) {
        this.show = true;
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.getWindowsWidth);
    this.getWindowsWidth();
  },
  computed: {
    info() {
      return this.$store.state.tienda;
    },
    style () {
      return this.$store.state.styleData
    }
  },
  created() {
    // const $body = document.body;
    // const hammertime = new Hammer($body);
    // hammertime.on('swipeleft', this.hideMenu);
    // hammertime.on('swiperight', this.showMenu);
  },
};
</script>

<style scoped>
h1 {
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  padding-top: 30px;
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
  background-color: var(--main_color);
  display: flex;
  justify-content: center;
}
.main-menu > .top-menu {
  display: none;
}
.main-menu-list {
  display: flex;
  align-items: center;
}
.main-menu-item {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
}
.main-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.main-menu-item a{
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 30px;
}
.logo-top-menu {
  max-height: 90%;
  max-width: 250px;
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
  color: #fefefe;
}
@media screen and (max-width: 800px) {
  .main-menu-list {
    width: 100%;
    flex-direction: column;
    padding-top: 100px;
  }
  .main-menu-link {
    color:  rgb(206, 206, 206);
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
  .main-menu-item {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0px;
    height: 60px;
    text-align: center;
  }
  .main-menu-item:hover {
    background: rgb(16, 19, 31);
  }
  .icon-menu-show {
    padding-left: 20px;
    font-size: 24px;
    /* padding-bottom: 10px; */
    z-index: 9999;
    display: block !important;
    /* position: absolute; */
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
    /* width: 100%; */
  }
  .login-cart_top-menu {
    padding-right: 20px;
  }
  .icon-top-menu-close {
    margin-right: 20px;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(100%);
  }
  .logo-top-menu {
    height: 50px;
  }
 }

 @media screen and (max-width: 450px) {
  .social-networks_top-menu{
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
</style>
