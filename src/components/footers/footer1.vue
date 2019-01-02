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
    <div class="footer_powered_by">
      <img src="http://res.cloudinary.com/komercia-store/image/upload/v1536181546/komercia/icon.png">
      <p>Desarrollado por <a href="https://komercia.co">Komercia</a></p>
    </div>
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
    display: grid;
    flex: none;
    background-color: var(--main_color);
    margin-top: 20px;
  }
  .footer-container-icons {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 10px 40px;
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
    align-items: center;
  }
  .footer_powered_by{
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
  .footer_powered_by img{
    width: 30px;
    opacity: 0.667;
  }
  .footer_powered_by p{
    font-size: 13px;
    color: rgba(254, 254, 254, 0.667);
    font-weight: 600;
    margin-bottom: 10px;
    margin: 0;
  }
  .footer_powered_by p a{
    color: rgba(254, 254, 254, 0.667);
  }
</style>
