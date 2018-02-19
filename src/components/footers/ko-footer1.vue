<template>
  <footer class="footer">
    <div class="footer-container-icons">
      <a v-show="info.red_instagram" :href="info.red_instagram" class="footer-icon"><i class="icon icon-instagrem"></i></a>
      <a v-show="info.red_twitter" :href="info.red_twitter" class="footer-icon"><i class="icon icon-twitter" ></i></a>
      <a v-show="info.red_facebook" :href="info.red_facebook" class="footer-icon"><i class="icon icon-facebook-square" ></i></a>
      <a v-show="info.red_youtube" :href="info.red_youtube" class="footer-icon"><i class="icon icon-youtube"></i></a>
    </div>
    <nav class="container-menu-footer-list">
      <ul class="menu-footer-list">
        <li v-for='(item, index) in routesFooter' :key='index' class="menu-footer"><a class="menu-footer-link" href="#">{{item.name}}</a></li>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      routesFooter: [
        {
          name: 'Contacto',
          route: '/contacto',
        },
        {
          name: 'Politicas',
          route: '/politicas',
        },
        {
          name: 'Catalogo',
          route: '/catalogo',
        },
      ]
    }
  },
  computed: {
    info() {
      return this.$store.state.tienda;
    },
  },

}
</script>

<style>

</style>
