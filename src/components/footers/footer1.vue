<template>
  <footer class="footer">
    <div class="footer-container-icons">
      <a v-show="info.red_instagram" :href="info.red_instagram" target="_blank" class="footer-icon"><i class="icon icon-instagrem"></i></a>
      <a v-show="info.red_twitter" :href="info.red_twitter" target="_blank" class="footer-icon"><i class="icon icon-twitter" ></i></a>
      <a v-show="info.red_facebook" :href="info.red_facebook" target="_blank" class="footer-icon"><i class="icon icon-facebook-square" ></i></a>
      <a v-show="info.red_youtube" :href="info.red_youtube" target="_blank" class="footer-icon"><i class="icon icon-youtube"></i></a>
    </div>
    <nav class="container-menu-footer-list">
      <ul class="menu-footer-list">
        <li v-for='(item, index) in routesFooter' v-show="activeRoute(item)" :key='index' class="menu-footer"><router-link class="menu-footer-link" :to="item.route">{{item.name}}</router-link></li>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'koFooter1',
  data() {
    return {
      routesFooter: [
        {
          name: 'Sobre nosotros',
          route: '/nosotros',
        },
        {
          name: 'Politicas de garantia',
          route: '/garantia',
        },
        {
          name: 'Manejo de datos',
          route: '/manejo-de-datos',
        },
      ]
    }
  },
  computed: {
    info() {
      return this.$store.state.tienda;
    },
  },
  methods: {
    activeRoute (item) {
      if (item.name != 'Sobre nosotros') {
        return true
      }
      return !!(this.info.nosotros || this.info.mision || this.info.vision)
    }
  }
}
</script>

<style scoped>
  .footer{
    width: 100%;
    height: 150px;
    flex: none;
    background-color: var(--main_color);
    margin-top: 20px;
  }
  .footer-container-icons {
    display: flex;
    justify-content: center;
    padding: 25px 40px;
  }
  .footer-container-icons .footer-icon {
    color: rgba(254, 254, 254, 0.667);
  }
  .footer-container-icons .footer-icon ~ .footer-icon {
    padding-left: 20px;
  }
  .footer-container-icons .icon {
    font-size: 20px;
  }
  .menu-footer-list {
    max-width: 400px;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .menu-footer-link {
    color: rgba(254, 254, 254, 0.667);
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
  }
  .container-menu-footer-list {
    display: flex;
    justify-content: center;
  }
</style>
