<template>
  <div>
    <div class="top-menu">
      <div class="social-networks_top-menu container-icons">
        <a href="#" class="icon-top-menu icon-social-networks"><i class="fa fa-instagram" aria-hidden="true"></i></a>
        <a href="#" class="icon-top-menu icon-social-networks"><i class="fa fa-twitter" aria-hidden="true"></i></a>
        <a href="#" class="icon-top-menu icon-social-networks"><i class="fa fa-facebook" aria-hidden="true"></i></a>
        <a href="#" class="icon-top-menu icon-social-networks"><i class="fa fa-youtube-play" aria-hidden="true"></i></a>
      </div>
      <img :src="`http://komercia.co/logos/${logo.logo}`" alt="logo" class="logo-top-menu">
      <div class="login-cart_top-menu container-icons">
        <a href="#" class="icon-top-menu"><i class="fa fa-user-circle-o" aria-hidden="true"></i></a>
        <a href="#" class="icon-top-menu"><i class="fa fa-shopping-cart" aria-hidden="true"></i></a>
        <a href="#" class="icon-top-menu"><i class="fa fa-bars icon-menu" aria-hidden="true"></i></a>
      </div>
    </div>
    <nav class="main-menu">
      <ul class="main-menu-list">
        <li v-for='(item, index) in routes' :key='index' class="main-menu-item"><a class="main-menu-link" href="#">{{item.name}}</a></li>
      </ul>
    </nav>
    <!-- CONTENIDO DE PRUEBA -->
    <h1>CONTENIDO DE PRUEBA</h1>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio possimus dolore quibusdam. Laudantium corrupti officia nobis id sapiente eaque. Quisquam consequuntur possimus ratione aspernatur ab ducimus sint consequatur voluptate odio.</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio possimus dolore quibusdam. Laudantium corrupti officia nobis id sapiente eaque. Quisquam consequuntur possimus ratione aspernatur ab ducimus sint consequatur voluptate odio.</p>

  </div>
</template>

<script>
export default {
  name: 'koHeader1',
  props: {
    logo: {
      type: Object,
      default: () => {
        return {
          id: 1,
          logo: '163nir1958.png',
        };
      },
    },
  },
  data() {
    return {
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
};
</script>

<style>
  @import '../../assets/css/main.css'
</style>
