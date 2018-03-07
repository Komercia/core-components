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
        <a href="#" ><i class="icon-top-menu icon-shopping-cart"></i></a>
        <a @click="toggleMenu" ><i class="icon-top-menu icon-bars icon-menu-show"></i></a>
      </div>
    </div>
    <transition name="slide-fade">
      <nav v-show="show" class="main-menu" :style="style.backgroundMain">
        <div class="top-menu">
          <a @click="toggleMenu" class="icon-top-menu icon-top-menu-close"><i class="icon-cancel icon-menu" aria-hidden="true"></i></a>
        </div>
        <ul class="main-menu-list">
          <li v-for='(item, index) in routes' :key='index' class="main-menu-item"><a class="main-menu-link" href="#">{{item.name}}</a></li>
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
          name: 'Catalogo',
          route: '/catalogo',
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
    const $body = document.body;
    const hammertime = new Hammer($body);
    hammertime.on('swipeleft', this.hideMenu);
    hammertime.on('swiperight', this.showMenu);
  },
};
</script>

<style>

</style>
