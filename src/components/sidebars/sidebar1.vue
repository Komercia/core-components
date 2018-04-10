<template>
  <div id="menuLateral" :class="{activeMenu: menuComponent}" v-on:click="removeMenuComponent">
    <div class="menu">
      <div class="menu_top">
        <i id="closeMenuLateral" class="material-icons">close</i>
      </div>
      <nav class="navigation">
        <ul class="navigation_list">
          <li class="navigation__item"><router-link to="/">Inicio</router-link></li>
          <li class="navigation__item"><router-link to="/productos">Productos</router-link></li>
          <li class="navigation__item"><router-link to="/pedido">Carrito</router-link></li>
          <li class="navigation__item"><router-link to="/contacto">Contacto</router-link></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    menuComponent(){
      return this.$store.state.menuComponent;
    }
  },
  methods: {
    removeMenuComponent(e){
      if(e.target.id == "menuLateral" || e.target.id == "closeMenuLateral" || e.target.tagName == "A"){
        this.$store.state.menuComponent = false;
      }
    }
  }
}
</script>

<style scoped>
  #menuLateral{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    display: none;
    background-color: rgba(255,255,255,0.8);
    z-index: 5;
    transition: .3s;
  }
  .menu{
    position: absolute;
    right: 0;
    width: 220px;
    height: 100vh;
    background-color: #EEE;
  }
  .menu_top{
    width: 100%;
    height: 80px;
    display: flex;
    padding-right: 17px;
    align-items: center;
    justify-content: flex-end;
  }
  .navigation{

  }
  .navigation_list{
    list-style: none;
    display: flex;
    flex-direction: column;
  }
  .navigation__item{
    display: flex;
    justify-content: center;
  }
  .navigation__item a{
    color: initial;
    height: 40px;
  }
  @media(max-width: 710px){
    #menuLateral{
      display: block;
      left: initial;
      right: -150%;
    }
    #menuLateral.activeMenu{
      right: 0;
    }
  }
</style>
